import neo3Dapi from "neo3-dapi";
import { IBalance, ITransaction, IWalletType } from "./interfaces";
import {
  DEV,
  GAS_SCRIPT_HASH,
  MAINNET,
  NEO_LINE,
  NEON,
  O3,
  ONE_GATE,
  TESTNET,
  WALLET_LIST,
  NEO_SCRIPT_HASH,
} from "../consts";
import { NeoDapi } from "@neongd/neo-dapi";
import { DevWallet } from "./dev-wallet";
import { u, wallet } from "@cityofzion/neon-core";
import { INetworkType, Network } from "../network";
import { LocalStorage } from "../local-storage";
import moment from "moment";
import buffer from "buffer";
import { WcSdk } from "@cityofzion/wallet-connect-sdk-core";
import { dispatchEventNeonWalletDisconnected } from "../../neon/events";

export class WalletAPI {
  walletType: IWalletType;

  constructor(walletType: IWalletType) {
    this.walletType = walletType;
  }

  static list = WALLET_LIST;

  /**
   * TODO: Remove dev wallet when 3rd party has privatenet support
   * @param defaultNetwork
   */
  init = async (defaultNetwork: INetworkType): Promise<any> => {
    let instance;
    try {
      switch (this.walletType) {
        case O3:
          instance = await this.O3Wallet();
          break;
        case NEO_LINE:
          instance = await this.NeoLine();
          break;
        case NEON:
          instance = await this.getWcNeonWalletInstance();
          break;
        case ONE_GATE:
          instance = await this.OneGate();
          break;
        case DEV:
          instance = await this.Dev(defaultNetwork);
          break;
      }
      return {
        key: this.walletType,
        ...instance,
      };
    } catch (e: any) {
      if (this.walletType === ONE_GATE) {
        throw new Error("OneGate wallet only supports in OneGate web browser.");
      } else {
        throw new Error(e.description ? e.description : e.message);
      }
    }
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

  private async getWcNeonWalletInstance(): Promise<WcSdk> {
    // Set window.Buffer to solve ReferenceError: Buffer is not defined
    window.Buffer = buffer.Buffer;

    const instance = new WcSdk();
    await instance.initClient(
      (process.env.NETWORK as INetworkType) === MAINNET ? "error" : "debug",
      "wss://relay.walletconnect.org"
    );

    // Subscribe to Wallet Connect events
    instance.subscribeToEvents({
      onProposal: (uri: string) => {
        // This show Neon Wallet Connect's website, and is more welcoming than QR modal.
        // @ts-ignore
        window.open(`https://neon.coz.io/connect?uri=${uri}`, "_blank").focus();
      },
      onDeleted: () => {
        dispatchEventNeonWalletDisconnected();
      },
    });

    // Load any existing connection, it should be called after the initialization
    await instance.loadSession();

    // Check if user has a session and get its accounts
    if (!instance.session) {
      const acceptChain =
        (process.env.NETWORK as INetworkType) === MAINNET
          ? "neo3:mainnet"
          : "neo3:testnet";
      await instance.connect({
        chains: [acceptChain], // the blockchains your dapp accepts to connect
        methods: [
          // which RPC methods do you plan to call
          "invokeFunction",
          // "testInvoke",
          // "signMessage",
          // "verifyMessage",
          // "getapplicationlog",
        ],
        appMetadata: {
          name: "Forthewin Network", // your application name to be displayed on the wallet
          description: "The hub of NEP-17", // description to be shown on the wallet
          url: "https://forthewin.network/", // url to be linked on the wallet
          icons: ["https://forthewin.network/logo/FTW_512_512.svg"], // icon to be shown on the wallet
        },
      });

      if (instance.session) {
        if (process.env.IS_DEBUG) {
          console.log("NEON: Connected to New Session");
          console.log(instance.session);
        }
      } else {
        console.log("NEON: Cannot connect to Neon Wallet");
      }
    } else if (instance.session) {
      if (process.env.IS_DEBUG) {
        console.log("NEON: Session Loaded");
        console.log(instance.session);
      }
    }

    return instance;
  }

  private WcNeonWallet = async () => {
    const instance = await this.getWcNeonWalletInstance();

    if (instance.session) {
      const provider = {
        name: instance.session.peer.metadata.name, // wallet name (Neon Wallet)
        version: "", // Neon not provide this info
        website: instance.session.peer.metadata.url, // wallet website (https://coz.io/)
        compatibility: [],
        extra: { currency: "USD", theme: "" }, // Neon not provide this info
      };

      const account = {
        address: instance.accountAddress,
        label: "N/A", // Neon not provide this info
      };

      const network = {
        chainId: instance.chainId, // Neon format. e.g. neo3:testnet
        defaultNetwork: process.env.NETWORK, // Standard format. e.g. N3TestNet
        networks: ["MainNet", "TestNet", "N3MainNet", "N3TestNet"],
      };

      const rpcClient = Network.getRPCClient(
        process.env.NETWORK as INetworkType
      );
      const res = await rpcClient.getNep17Balances(account.address as string);
      const balances: IBalance[] = [];
      res.balance.forEach((item) => {
        let symbol = "";
        let amount = "";
        if (item.assethash.includes(GAS_SCRIPT_HASH)) {
          symbol = "GAS";
          amount = u.BigInteger.fromNumber(item.amount).toDecimal(8).toString();
        } else if (item.assethash.includes(NEO_SCRIPT_HASH)) {
          symbol = "NEO";
          amount = item.amount; // NEO is indivisible
        } else {
          // Any non-support tokens will be skipped.
          return;
        }
        balances.push({
          contract: item.assethash,
          amount,
          symbol,
        });
      });

      if (process.env.IS_DEBUG) {
        console.log(provider);
        console.log(account);
        console.log(network);
        console.log(balances);
      }
      return { provider, account, network, balances };
    }
  };

  private Dev = async (defaultNetwork: INetworkType) => {
    const instance = DevWallet;
    const network = await instance.getNetworks(defaultNetwork);
    const provider = await instance.getProvider();
    const account = await instance.getAccount();
    const balances = await instance.getBalance(defaultNetwork);
    return { instance, provider, account, network, balances };
  };

  /* Control signing and send transaction. TODO:Need to improve type hardcoding later */
  invoke = async (
    currentNetwork: INetworkType,
    invokeScript: any,
    extraSystemFee?: string,
    testInvoke?: boolean
  ): Promise<string> => {
    const { instance, network } = await this.init(currentNetwork);
    if (network.defaultNetwork !== currentNetwork) {
      throw new Error(
        "Your wallet's network doesn't match with the app network setting."
      );
    }

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
        createdAt: moment().format("lll"),
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

  invokeMulti = async (
    currentNetwork: INetworkType,
    invokeScript: any
  ): Promise<any> => {
    const { instance, network } = await this.init(currentNetwork);
    if (network.defaultNetwork !== currentNetwork) {
      throw new Error(
        "Your wallet's network doesn't match with the app network setting."
      );
    }
    try {
      const res = await instance.invokeMultiple(invokeScript);
      const submittedTx: ITransaction = {
        network,
        wallet: this.walletType,
        txid: res.txid,
        contractHash: "MultiInvoke",
        method: "MultiInvoke",
        args: invokeScript.invokeArgs,
        createdAt: moment().format("lll"),
      };
      LocalStorage.addTransaction(submittedTx);
      return res.txid;
    } catch (e: any) {
      if (e.description) {
        throw new Error(e.description);
      }
    }
  };
}
