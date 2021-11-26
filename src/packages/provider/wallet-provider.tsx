import { ContextOptions, IWalletStates } from "./interfaces";
import React, { createContext, useContext, useState } from "react";
import { IConnectedWallet, IWalletType } from "../neo/wallet/interfaces";
import { LocalStorage } from "../neo/local-storage";
import { sc } from "@cityofzion/neon-core";
import { WalletAPI } from "../neo/wallet";
import toast from "react-hot-toast";

export const WalletContext = createContext({} as IWalletStates);
export const WalletContextProvider = (props: {
  options: ContextOptions;
  children: any;
}) => {
  const [network] = useState(props.options.network);

  const [isWalletModalActive, setWalletModalActive] = useState(false);

  const [connectedWallet, setConnectedWallet] = useState<IConnectedWallet | undefined>(props.options.useLocalStorage ? LocalStorage.getWallet() : undefined);

  const [invokeScript, setInvokeScript] = useState<sc.ContractCallJson | undefined>();

  const [transactions, setTransactions] = useState(props.options.useLocalStorage ? LocalStorage.getTransactions() : []);

  const openWalletModal = () => setWalletModalActive(true);

  const closeWalletModal = () => setWalletModalActive(false);

  const connectWallet = async (walletType: IWalletType) => {
    try {
      const connectedWallet = await new WalletAPI(walletType).init(network);
      setConnectedWallet(connectedWallet);
      if (props.options.useLocalStorage) {
        LocalStorage.setWallet(connectedWallet);
      }
      setWalletModalActive(false);
    } catch (e) {
      console.error(e);
      toast.error(`Failed to connect`);
    }
  };

  const disConnectWallet = () => {
    LocalStorage.removeWallet();
    setConnectedWallet(undefined);
  };

  const doInvoke = (invokeScript: sc.ContractCallJson) => {
    if (isWalletModalActive) setWalletModalActive(false);
    setInvokeScript(invokeScript);
  };

  const closeInvoke = () => setInvokeScript(undefined);

  const contextValue: IWalletStates = {
    useDevWallet: props.options.useDevWallet,
    network,
    invokeScript,
    list: WalletAPI.list,
    connectedWallet,
    isWalletModalActive,
    openWalletModal,
    closeWalletModal,
    connectWallet,
    disConnectWallet,
    doInvoke,
    closeInvoke,
    transactions,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {props.children}
    </WalletContext.Provider>
  );
};
export const useWallet = () => useContext(WalletContext);
