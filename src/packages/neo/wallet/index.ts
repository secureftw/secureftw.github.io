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
    return { provider, account, network, balances: balances[account.address] };
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
    return { provider, account, network, balances: balances[account.address] };
  };

  private Dev = async (defaultNetwork: INetworkType) => {
    const instance = DevWallet;
    const network = await instance.getNetworks(defaultNetwork);
    const provider = await instance.getProvider();
    const account = await instance.getAccount();
    const balances = await instance.getBalance(defaultNetwork);
    return { provider, account, network, balances };
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
    } catch (e) {
      throw e;
    }
  };

  /* Control signing and send transaction. TODO:Need to improve type hardcoding later */
  invoke = async (
    network: INetworkType,
    senderAddress: string,
    invokeScript: any,
    extraSystemFee?: string
  ): Promise<string> => {
    try {
      const wallet = await this.getInstance(this.walletType);
      let res;
      if (this.walletType === DEV) {
        res = await wallet.invoke(network, invokeScript);
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
        res = await wallet.invoke(invokeScript);
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
      console.error(e);
      // TODO: All wallets return different errors and it seems standard is coming we need to improve handling errors.
      throw new Error("Failed to invoke");
    }
  };
}
