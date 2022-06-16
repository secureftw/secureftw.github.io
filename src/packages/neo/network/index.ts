import { rpc, sc, u } from "@cityofzion/neon-core";
import {
	MAINNET,
	MAINNET_CONFIG,
	PRIVATE_CONFIG,
	PRIVATENET,
	TESTNET,
	TESTNET_CONFIG,
	TESTNET_CONFIG_2,
	MAINNET_CONFIG_2, NEON,
} from "../consts";
import { InvokeResult } from "@cityofzion/neon-core/lib/rpc";
import { ApplicationLogJson } from "@cityofzion/neon-core/lib/rpc/Query";
import { convertContractCallParam } from "../utils";

export type INetworkType = typeof PRIVATENET | typeof MAINNET | typeof TESTNET

export class Network {
  private static readonly READ_LOG_FREQUENCY = 6000;

  static getRPCClient = (networkType: INetworkType) => {
    let config;
    switch (networkType) {
      case PRIVATENET:
        config = PRIVATE_CONFIG;
        break;
      case TESTNET:
        config = TESTNET_CONFIG;
        break;
      case MAINNET:
        config = MAINNET_CONFIG;
        break;
    }
    return new rpc.RPCClient(config.url);
  };

  static getRawTx = async (txid: string, networkType: INetworkType) => {
    let config;
    switch (networkType) {
      case PRIVATENET:
        config = PRIVATE_CONFIG;
        break;
      case TESTNET:
        config = TESTNET_CONFIG_2;
        break;
      case MAINNET:
        config = MAINNET_CONFIG_2;
        break;
    }
    const rpcClient = new rpc.RPCClient(config.url);
    let rawTx: any;
    do {
      try {
        rawTx = await rpcClient.getApplicationLog(txid);
      } catch (e) {
        await Network.sleep(Network.READ_LOG_FREQUENCY);
      }
    } while (!rawTx);

    return rawTx;
  };

  static findNotificationFromTxId = async (
    txId: string,
    scriptHash: string,
    eventName: string,
    networkType: INetworkType
  ) => {
    // Get transaction notifications
    const notifications = await Network.getNotificationsFromTxId(
      txId,
      networkType
    );
    // Return selected one
    return notifications.find(
      (n: any) => n.contract === "0x" + scriptHash && n.eventname === eventName
    );
  };

  static getNotificationsFromTxId = async (
    txId: string,
    network: INetworkType
  ) => {
    // Get rpc client to do calls
    const rpcClient = Network.getRPCClient(network);

    // Cycle until i get app log to extract notifications from
    let appLog: ApplicationLogJson | undefined;
    do {
      try {
        appLog = await rpcClient.getApplicationLog(txId);
      } catch (e) {
        await Network.sleep(Network.READ_LOG_FREQUENCY);
      }
    } while (!appLog);

    // Get notifications from app log and return them
    const notifications = [] as any;
    appLog.executions.forEach((e) => {
      notifications.push(...e.notifications);
    });
    return notifications;
  };

  static read = async (
    network: INetworkType,
    scripts: sc.ContractCallJson[]
    // passFaultCheck?: boolean
  ): Promise<InvokeResult> => {
    const rpcClient = Network.getRPCClient(network);
    const sb = new sc.ScriptBuilder();
    scripts.map((script) => {
      let params: unknown[] = [];
      if (script.args) {
        params = script.args.map((arg) => convertContractCallParam(arg));
      }
      sb.emitAppCall(script.scriptHash, script.operation, params);
    });
    return rpcClient.invokeScript(u.HexString.fromHex(sb.build()));
  };

  static readOnly = async (
    network: INetworkType,
    scripts: sc.ContractCallJson[],
    parser: (res: InvokeResult) => any
  ): Promise<any | undefined> => {
    const rpcClient = Network.getRPCClient(network);
    const sb = new sc.ScriptBuilder();
    scripts.map((script) => {
      let params: unknown[] = [];
      if (script.args) {
        params = script.args.map((arg) => convertContractCallParam(arg));
      }
      sb.emitAppCall(script.scriptHash, script.operation, params);
    });
    const res = await rpcClient.invokeScript(u.HexString.fromHex(sb.build()));
    if (res.state === "FAULT") {
      console.error(res.exception);
      return undefined;
    }
    return parser(res);
  };

  static sleep = (duration: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  };
}
