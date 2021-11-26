import neo3Dapi from "neo3-dapi";
import { IConnectedWallet, ITransaction, IWalletType } from "./interfaces";
import { DEV, NEO_LINE, O3, TOKEN_LIST, WALLET_LIST } from "../consts";
import { DevWallet } from "./dev-wallet";
import { sc, tx, wallet as NeonWallet } from "@cityofzion/neon-core";
import { INetworkType } from "../network";
import { LocalStorage } from "../local-storage";
import moment from "moment";

export class WalletAPI {
  walletType: IWalletType;

  constructor(walletType: IWalletType) {
    this.walletType = walletType;
  }

  static list = WALLET_LIST;

  private getInstance = async (walletType: IWalletType): Promise<any> => {
    let instance: any;
    switch (walletType) {
      case O3:
        instance = neo3Dapi;
        break;
      case NEO_LINE:
        // @ts-ignore
        instance = new NEOLineN3.Init();
        break;
      case DEV:
        instance = DevWallet;
        break;
      default:
        throw new Error("No support wallet!");
    }
    return instance;
  };

  /**
   * TODO: Remove dev wallet when 3rd party has privatenet support
   * @param defaultNetwork
   */
  init = async (defaultNetwork: INetworkType): Promise<IConnectedWallet> => {
    try {
      const wallet = await this.getInstance(this.walletType);
      let network;
      let balances;
      /* Temporary hard coding because of neoline */
      if (this.walletType === NEO_LINE) {
        // @ts-ignore
        const neoline = new NEOLine.Init();
        network = await neoline.getNetworks();
      } else if (this.walletType === DEV) {
        network = await wallet.getNetworks(defaultNetwork);
      }

      const provider = await wallet.getProvider();
      const account = await wallet.getAccount();

      if (this.walletType === DEV) {
        balances = await wallet.getBalance(defaultNetwork);
      } else {
        const res = await wallet.getBalance({
          params: {
            address: account.address,
            contracts: TOKEN_LIST(network.defaultNetwork),
          },
        });
        balances = res[account.address];
        // console.log(res)
      }
      return {
        key: this.walletType,
        provider,
        account,
        network,
        balances,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  testInvoke = () => {};

  /* Control signing and send transaction. TODO:Need to improve type hardcoding later */
  invoke = async (
    network: INetworkType,
    senderAddress: string,
    invokeScript: sc.ContractCallJson
  ): Promise<string> => {
    const wallet = await this.getInstance(this.walletType);
    let res;
    if (this.walletType === DEV) {
      res = await wallet.invoke(network, invokeScript);
    } else {
      // @ts-ignore
      invokeScript.signers = [
        {
          account: NeonWallet.getScriptHashFromAddress(senderAddress),
          scopes: tx.WitnessScope.Global,
        },
      ];
      res = await wallet.invoke(invokeScript);
    }
    const submittedTx: ITransaction = {
      network,
      wallet: this.walletType,
      status: "PENDING",
      txid: res.txid,
      contractHash: invokeScript.scriptHash,
      method: invokeScript.operation,
      args: invokeScript.args,
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    LocalStorage.addTransaction(submittedTx);
    return res.txid;
  };
}
