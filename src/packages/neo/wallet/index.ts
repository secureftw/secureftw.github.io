import neo3Dapi from "neo3-dapi";
import { ITransaction, IWalletType } from "./interfaces";
import { DEV, NEO_LINE, O3, WALLET_LIST } from "../consts";
import { DevWallet } from "./dev-wallet";
import { tx, wallet as NeonWallet } from "@cityofzion/neon-core";
import { INetworkType } from "../network";
import { LocalStorage } from "../local-storage";
import moment from "moment";

export class WalletAPI {
  walletType: IWalletType;

  constructor(walletType: IWalletType) {
    this.walletType = walletType;
  }

  static list = WALLET_LIST;

  private O3Wallet = async () => {
    const instance = neo3Dapi;
    const provider = await instance.getProvider();
    const account = await instance.getAccount();
    const network = await instance.getNetworks();
    const balances = await instance.getBalance(
      {
        params: {
          address: account.address,
          contracts: [],
        },
      },
      network.defaultNetwork
    );
    // TODO: Need to some sort of validation for balances in case wallet doesn't have any address?
    return {
      instance,
      provider,
      account,
      network,
      balances: balances[account.address],
    };
  };

  private NeoLine = async () => {
    // @ts-ignore
    const instance = new NEOLineN3.Init();
    // @ts-ignore
    // NEOLineN3 doesn't have getNetworks function
    const instance2 = new NEOLine.Init();
    const network = await instance2.getNetworks();
    const provider = await instance.getProvider();
    const account = await instance.getAccount();
    const balances = await instance.getBalance({
      params: {
        address: account.address,
        contracts: [],
      },
    });
    return {
      instance,
      provider,
      account,
      network,
      balances: balances[account.address],
    };
  };

  private Dev = async (defaultNetwork: INetworkType) => {
    const instance = DevWallet;
    const network = await instance.getNetworks(defaultNetwork);
    const provider = await instance.getProvider();
    const account = await instance.getAccount();
    const balances = await instance.getBalance(defaultNetwork);
    return { instance, provider, account, network, balances };
  };

  /**
   * TODO: Remove dev wallet when 3rd party has privatenet support
   * @param defaultNetwork
   */
  init = async (defaultNetwork: INetworkType): Promise<any> => {
    let wallet;
    try {
      switch (this.walletType) {
        case O3:
          wallet = await this.O3Wallet();
          break;
        case NEO_LINE:
          wallet = await this.NeoLine();
          break;
        case DEV:
          wallet = await this.Dev(defaultNetwork);
          break;
      }
      return {
        key: this.walletType,
        ...wallet,
      };
    } catch (e: any) {
      throw new Error(e.description);
    }
  };

  /* Control signing and send transaction. TODO:Need to improve type hardcoding later */
  invoke = async (
    currentNetwork: INetworkType,
    senderAddress: string,
    invokeScript: any,
    extraSystemFee?: string
  ): Promise<string> => {
    const { instance, network } = await this.init(currentNetwork);
    if (network.defaultNetwork !== currentNetwork) {
      throw new Error(
        "Your wallet's network doesn't match with the app network setting."
      );
    }
    try {
      let res;
      if (this.walletType === DEV) {
        res = await instance.invoke(network, invokeScript);
      } else {
        invokeScript.signers = [
          {
            account: NeonWallet.getScriptHashFromAddress(senderAddress),
            scopes: tx.WitnessScope.CalledByEntry,
          },
        ];
        if (extraSystemFee) {
          invokeScript.extraSystemFee = extraSystemFee;
        }
        res = await instance.invoke(invokeScript);
      }
      const submittedTx: ITransaction = {
        network,
        wallet: this.walletType,
        txid: res.txid,
        contractHash: invokeScript.scriptHash,
        method: invokeScript.operation,
        args: invokeScript.args,
        createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      };
      LocalStorage.addTransaction(submittedTx);
      return res.txid;
    } catch (e: any) {
      throw new Error(e.description);
    }
  };
}
