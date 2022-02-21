import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { DEFAULT_WITNESS_SCOPE, GAS_SCRIPT_HASH } from "../../../consts";
import { DEPLOY_FEE, SMITH_SCRIPT_HASH } from "./consts";
import { ISmithContractStatus, ISmithNEP11RecordPaginate } from "./interfaces";
import {
  parseNEP11RecordPaginate,
  parsePaginate,
  parseSmithProperties,
} from "./helpers";
import { u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { IRuneMeta } from "../nft/interfaces";

export class SmithContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = SMITH_SCRIPT_HASH[networkType];
  }

  createNEP17 = async (
    connectedWallet: IConnectedWallet,
    contractName: string,
    symbol: string,
    decimals: string,
    totalSupply: string,
    author: string,
    description: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "transfer",
      scriptHash: GAS_SCRIPT_HASH,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Hash160",
          value: this.contractHash,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(
            DEPLOY_FEE[this.network],
            8
          ).toString(),
        },
        {
          type: "Array",
          value: [
            {
              type: "String",
              value: "nep17",
            },
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
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript
    );
  };

  createNEP11 = async (
    connectedWallet: IConnectedWallet,
    contractName: string,
    symbol: string,
    author: string,
    description: string,
    email: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "transfer",
      scriptHash: GAS_SCRIPT_HASH,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Hash160",
          value: this.contractHash,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(
            DEPLOY_FEE[this.network],
            8
          ).toString(),
        },
        {
          type: "Array",
          value: [
            {
              type: "String",
              value: "nep11",
            },
            {
              type: "Hash160",
              value: NeonWallet.getScriptHashFromAddress(
                connectedWallet.account.address
              ),
            },
            {
              type: "String",
              value: symbol,
            },
            {
              type: "String",
              value: contractName,
            },
            {
              type: "String",
              value: description,
            },
            {
              type: "String",
              value: author,
            },
            {
              type: "String",
              value: email,
            },
          ],
        },
      ],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript
    );
  };

  mintNFT = async (
    connectedWallet: IConnectedWallet,
    contractHash: string,
    name: string,
    description: string,
    image: string,
    json
  ) => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "mintNFT",
      scriptHash: contractHash,
      args: [
        {
          type: "String",
          value: name,
        },
        {
          type: "String",
          value: description,
        },
        {
          type: "String",
          value: image,
        },
        {
          type: "String",
          value: json,
        },
      ],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
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

  getNEP11Records = async (): Promise<ISmithNEP11RecordPaginate> => {
    const records = {
      operation: "getNep11Records",
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
    return parseNEP11RecordPaginate(res.stack[0].value);
  };

  getTokens = async (contract): Promise<string[]> => {
    const script = {
      scriptHash: contract,
      operation: "tokens",
      args: [],
    };
    const res = await Network.read(this.network, [script]);
    // @ts-ignore
    return res.stack[0].iterator.map((item) => {
      return u.HexString.fromBase64(item.value as string).toAscii();
    });
  };

  totalSupply = async (contract): Promise<number> => {
    const script = {
      scriptHash: contract,
      operation: "totalSupply",
      args: [],
    };
    const res = await Network.read(this.network, [script]);
    // @ts-ignore
    return parseFloat(res.stack[0].value);
  };

  getProperties = async (
    contractHash: string,
    tokenId: string
  ): Promise<IRuneMeta> => {
    const script = {
      scriptHash: contractHash,
      operation: "properties",
      args: [
        {
          type: "String",
          value: tokenId,
        },
      ],
    };
    const res = await Network.read(this.network, [script]);
    // @ts-ignore
    return parseSmithProperties(res.stack);
  };
}
