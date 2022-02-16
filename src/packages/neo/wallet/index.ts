import neo3Dapi from "neo3-dapi";
import { ITransaction, IWalletType } from "./interfaces";
import {
  DEV,
  MAINNET,
  NEO_LINE,
  O3,
  ONE_GATE,
  TESTNET,
  WALLET_LIST,
} from "../consts";
import { NeoDapi } from "@neongd/neo-dapi";
import { DevWallet } from "./dev-wallet";
import { tx, u, wallet, wallet as NeonWallet } from "@cityofzion/neon-core";
import { INetworkType, Network } from "../network";
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

  private OneGate = async () => {
    // @ts-ignore
    const instance = new NeoDapi(window.OneGate);
    const provider = await instance.getProvider();
    const account = await instance.getAccount();
    const network = await instance.getNetworks();
    network.defaultNetwork =
      network.defaultNetwork === "MainNet" ? MAINNET : TESTNET;
    const balances = await instance.getNep17Balances({
      address: account.address,
      assetHashes: [],
    });
    // TODO: Need to some sort of validation for balances in case wallet doesn't have any address?
    return {
      instance,
      provider,
      account,
      network,
      balances,
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
        case ONE_GATE:
          wallet = await this.OneGate();
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
      if (this.walletType === ONE_GATE) {
        throw new Error("OneGate wallet only supports in OneGate web browser.");
      } else {
        throw new Error(e.description ? e.description : e.message);
      }
    }
  };

  /* Control signing and send transaction. TODO:Need to improve type hardcoding later */
  invoke = async (
    currentNetwork: INetworkType,
    senderAddress: string,
    invokeScript: any,
    extraSystemFee?: string,
    testInvoke?: boolean,
    isGlobal?: boolean
  ): Promise<string> => {
    const { instance, network } = await this.init(currentNetwork);
    if (network.defaultNetwork !== currentNetwork) {
      throw new Error(
        "Your wallet's network doesn't match with the app network setting."
      );
    }

    invokeScript.signers = [
      {
        account: NeonWallet.getScriptHashFromAddress(senderAddress),
        scopes: isGlobal
          ? tx.WitnessScope.Global
          : tx.WitnessScope.CalledByEntry,
      },
    ];

    // Do test invoke if required.
    if (testInvoke) {
      const rpcClient = Network.getRPCClient(currentNetwork);
      const transaction = await DevWallet.build(rpcClient, invokeScript);
      const invokeFunctionResponse = await rpcClient.invokeScript(
        transaction.script,
        transaction.signers
      );
      if (invokeFunctionResponse.state === "FAULT") {
        throw new Error(invokeFunctionResponse.exception as string);
      }
    }

    // Hard coding for OG wallet
    if (this.walletType === ONE_GATE) {
      invokeScript.args = invokeScript.args.map((param: any) => {
        if (param.type === "Address") {
          return {
            type: "Hash160",
            value: wallet.getScriptHashFromAddress(param.value),
          };
        } else {
          return param;
        }
      });
      if (extraSystemFee) {
        invokeScript.extraSystemFee = u.BigInteger.fromDecimal(
          extraSystemFee,
          8
        ).toString();
      }
    } else {
      if (extraSystemFee) {
        invokeScript.extraSystemFee = extraSystemFee;
      }
    }

    try {
      const res = await instance.invoke(invokeScript, currentNetwork);
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
      // TODO: Need to improve dev wallet error handling as dapi standard.
      if (e.description) {
        throw new Error(e.description);
      }
      throw e;
    }
  };
}
