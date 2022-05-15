import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { DEFAULT_WITNESS_SCOPE, GAS_SCRIPT_HASH } from "../../../consts";
import { SMITH_SCRIPT_HASH } from "./consts";
import {
  ISmithNEP11Info,
  ISmithNEP11RecordPaginate,
  ISmithNEP17Info,
  ISmithNEP17RecordPaginate,
} from "./interfaces";
import {
  parseNEP11RecordPaginate,
  parseNEP17RecordsPaginate,
  parseSmithNEP11Info,
  parseSmithNEP17Info,
  parseSmithProperties,
} from "./helpers";
import { tx, u, wallet as NeonWallet } from "@cityofzion/neon-core";
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
      operation: "createNEP17",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
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
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, GAS_SCRIPT_HASH],
        },
      ],
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
      operation: "createNEP11",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
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
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, GAS_SCRIPT_HASH],
        },
      ],
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

  updateNEP17 = async (
    connectedWallet: IConnectedWallet,
    contractHash: string,
    logo: string,
    website: string
  ) => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript: any = {
      invokeArgs: [],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };

    if (logo) {
      invokeScript.invokeArgs.push({
        operation: "updateLogo",
        scriptHash: contractHash,
        args: [
          {
            type: "String",
            value: logo,
          },
        ],
      });
    }
    if (website) {
      invokeScript.invokeArgs.push({
        operation: "updateWebsite",
        scriptHash: contractHash,
        args: [
          {
            type: "String",
            value: website,
          },
        ],
      });
    }
    return new wallet.WalletAPI(connectedWallet.key).invokeMulti(
      this.network,
      invokeScript
    );
  };

  getNEP17Records = async (
    page: number
  ): Promise<ISmithNEP17RecordPaginate> => {
    const records = {
      operation: "getRecords",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: page,
        },
      ],
    };
    const res = await Network.read(this.network, [records]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseNEP17RecordsPaginate(res);
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
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseNEP11RecordPaginate(res.stack[0].value);
  };

  getTokens = async (contract): Promise<string[]> => {
    const script = {
      scriptHash: contract,
      operation: "tokens",
      args: [],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
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
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseFloat(res.stack[0].value as string);
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
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseSmithProperties(res.stack) as IRuneMeta;
  };

  getNep17ContractInfo = async (
    contractHash: string
  ): Promise<ISmithNEP17Info> => {
    const owner = {
      operation: "owner",
      scriptHash: contractHash,
      args: [],
    };
    const name = {
      operation: "name",
      scriptHash: contractHash,
      args: [],
    };
    const totalSupply = {
      operation: "totalSupply",
      scriptHash: contractHash,
      args: [],
    };
    const symbol = {
      operation: "symbol",
      scriptHash: contractHash,
      args: [],
    };
    const decimals = {
      operation: "decimals",
      scriptHash: contractHash,
      args: [],
    };
    const author = {
      operation: "author",
      scriptHash: contractHash,
      args: [],
    };
    const description = {
      operation: "description",
      scriptHash: contractHash,
      args: [],
    };
    const website = {
      operation: "website",
      scriptHash: contractHash,
      args: [],
    };
    const logo = {
      operation: "logo",
      scriptHash: contractHash,
      args: [],
    };

    const scripts = [
      owner,
      name,
      totalSupply,
      symbol,
      decimals,
      author,
      description,
      website,
      logo,
    ];
    const res = await Network.read(this.network, scripts);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseSmithNEP17Info(res);
  };

  getNep11ContractInfo = async (
    contractHash: string
  ): Promise<ISmithNEP11Info> => {
    const owner = {
      operation: "owner",
      scriptHash: contractHash,
      args: [],
    };
    const symbol = {
      operation: "symbol",
      scriptHash: contractHash,
      args: [],
    };
    const totalSupply = {
      operation: "totalSupply",
      scriptHash: contractHash,
      args: [],
    };

    const scripts = [owner, symbol, totalSupply];
    const res = await Network.read(this.network, scripts);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseSmithNEP11Info(res);
  };
}
