import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { GAS_SCRIPT_HASH } from "../../../consts";
import { SMITH_SCRIPT_HASH } from "./consts";
import { ISmithContractStatus } from "./interfaces";
import { parsePaginate } from "./helpers";
import { wallet as NeonWallet } from "@cityofzion/neon-core";

export class SmithContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = SMITH_SCRIPT_HASH[networkType];
  }

  create = async (
    connectedWallet: IConnectedWallet,
    contractName: string,
    symbol: string,
    decimals: string,
    totalSupply: string,
    author: string,
    description: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: GAS_SCRIPT_HASH,
      args: [
        {
          type: "Address",
          value: connectedWallet.account.address,
        },
        {
          type: "Hash160",
          value: this.contractHash,
        },
        {
          type: "Integer",
          value: "100000000",
        },
        {
          type: "Array",
          value: [
            {
              type: "Hash160",
              value: NeonWallet.getScriptHashFromAddress(
                connectedWallet.account.address
              ),
            },
            {
              type: "String",
              value: contractName,
            },
            {
              type: "String",
              value: author,
            },
            {
              type: "String",
              value: description,
            },
            {
              type: "String",
              value: symbol,
            },
            {
              type: "Integer",
              value: totalSupply,
            },
            {
              type: "Integer",
              value: decimals,
            },
          ],
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  getStatus = async (): Promise<ISmithContractStatus> => {
    const records = {
      operation: "getRecords",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: 1,
        },
      ],
    };

    const scripts = [records];

    const res = await Network.read(this.network, scripts);
    return {
      records: parsePaginate(res.stack[0].value),
    };
  };
  //
  // loadNep17 = async (): Promise<ISmithContractStatus> => {
  //
  // 	// const symbol = {
  // 	// 	operation: "symbol",
  // 	// 	scriptHash: this.contractHash,
  // 	// 	args: [
  // 	// 	],
  // 	// };
  // 	// const decimals = {
  // 	// 	operation: "decimals",
  // 	// 	scriptHash: this.contractHash,
  // 	// 	args: [
  // 	// 	],
  // 	// };
  // 	// const totalSupply = {
  // 	// 	operation: "totalSupply",
  // 	// 	scriptHash: this.contractHash,
  // 	// 	args: [
  // 	// 		{
  // 	// 			type: "Integer",
  // 	// 			value: 1,
  // 	// 		},
  // 	// 	],
  // 	// };
  //
  // 	const scripts = [records];
  //
  // 	const res = await Network.read(this.network, scripts);
  // 	return {
  // 		records: parseSnapshotPaginate(res.stack[0].value),
  // 	};
  // };
}
