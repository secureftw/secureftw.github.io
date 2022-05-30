import { INetworkType, Network } from "../../../network";

import { IConnectedWallet } from "../../../wallet/interfaces";
import { tx, u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { wallet } from "../../../index";
import { DAO_SCRIPT_HASH } from "./consts";
import { base64ToString, parseMapValue, toDecimal } from "../../../utils";
import { parseChannelsPaginate } from "./helpers";
import { IChannel } from "./interfaces";

export class DaoContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = DAO_SCRIPT_HASH[networkType];
  }

  createChannel = async (
    connectedWallet: IConnectedWallet,
    contractHash: string,
    minTokens: string,
    metadata: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "createChannel",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: contractHash,
        },
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(minTokens, 8).toString(),
        },
        {
          type: "String",
          value: metadata,
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, contractHash],
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript,
      undefined,
      undefined
    );
  };

  createProposal = async (
    connectedWallet: IConnectedWallet,
    contractHash: string,
    title: string,
    description: string,
    options: string[],
    start: number,
    end: number
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );

    const optionsToInvokeParams = options.map((op) => {
      return {
        type: "String",
        value: op,
      };
    });
    const invokeScript = {
      operation: "createProposal",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: contractHash,
        },
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "String",
          value: title,
        },
        {
          type: "String",
          value: description,
        },
        {
          type: "Array",
          value: optionsToInvokeParams,
        },
        {
          type: "Integer",
          value: start,
        },
        {
          type: "Integer",
          value: end,
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, contractHash],
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript,
      undefined,
      undefined
    );
  };

  vote = async (
    connectedWallet: IConnectedWallet,
    contractHash: string,
    proposalNo: string,
    optionIndex: string,
    voteAmount: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "vote",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: contractHash,
        },
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Integer",
          value: proposalNo,
        },
        {
          type: "Integer",
          value: optionIndex,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(voteAmount, 8).toString(),
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, contractHash],
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript,
      undefined,
      undefined
    );
  };

  getChannels = async (perPage: string, page: string) => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getChannels",
      args: [
        { type: "Integer", value: perPage },
        { type: "Integer", value: page },
      ],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseChannelsPaginate(res.stack[0]);
  };

  getChannel = async (contractHash: string): Promise<IChannel> => {
    const script1 = {
      scriptHash: this.contractHash,
      operation: "getChannel",
      args: [{ type: "Hash160", value: contractHash }],
    };
    const script2 = {
      scriptHash: contractHash,
      operation: "decimals",
      args: [],
    };
    const res = await Network.read(this.network, [script1, script2]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return {
      ...parseMapValue(res.stack[0] as any),
      decimals: parseFloat(res.stack[1].value as string),
    };
  };

  getProposals = async (
    contractHash: string,
    perPage: string,
    page: string
  ) => {
    const script1 = {
      scriptHash: this.contractHash,
      operation: "getProposals",
      args: [
        { type: "Hash160", value: contractHash },
        { type: "Integer", value: perPage },
        { type: "Integer", value: page },
      ],
    };
    const script2 = {
      scriptHash: this.contractHash,
      operation: "getChannel",
      args: [{ type: "Hash160", value: contractHash }],
    };
    const res = await Network.read(this.network, [script1, script2]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return {
      proposals: parseMapValue(res.stack[0] as any),
      channel: parseMapValue(res.stack[1] as any),
    };
  };

  getProposal = async (
    contractHash: string,
    proposalNo: string,
    connectedWallet
  ) => {
    const script1 = {
      scriptHash: this.contractHash,
      operation: "getProposal",
      args: [
        { type: "Hash160", value: contractHash },
        { type: "Integer", value: proposalNo },
      ],
    };
    const script2 = {
      scriptHash: this.contractHash,
      operation: "getChannel",
      args: [{ type: "Hash160", value: contractHash }],
    };
    const script3 = {
      scriptHash: contractHash,
      operation: "decimals",
      args: [],
    };

    const scripts = [script1, script2, script3];

    if (connectedWallet) {
      const senderHash = NeonWallet.getScriptHashFromAddress(
        connectedWallet.account.address
      );
      scripts.push({
        scriptHash: contractHash,
        operation: "balanceOf",
        args: [{ type: "Hash160", value: senderHash }],
      });
    }

    const res = await Network.read(this.network, scripts);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return {
      proposal: parseMapValue(res.stack[0] as any),
      channel: parseMapValue(res.stack[1] as any),
      decimals: parseFloat(res.stack[2].value as any),
      balance: connectedWallet ? toDecimal(res.stack[3].value as any) : 0,
    };
  };

  getVotes = async (
    contractHash: string,
    proposalNo: string,
    perPage: string,
    page: string
  ) => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getVotes",
      args: [
        { type: "Hash160", value: contractHash },
        { type: "Integer", value: proposalNo },
        { type: "Integer", value: perPage },
        { type: "Integer", value: page },
      ],
    };

    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseMapValue(res.stack[0] as any);
  };

  hasPermission = async (
    connectedWallet: IConnectedWallet,
    contractHash: string
  ): Promise<{ hasPermission: boolean; symbol: string }> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const script1 = {
      scriptHash: this.contractHash,
      operation: "hasPermission",
      args: [
        { type: "Hash160", value: contractHash },
        { type: "Hash160", value: senderHash },
      ],
    };
    const script2 = {
      scriptHash: contractHash,
      operation: "symbol",
      args: [],
    };

    const res = await Network.read(this.network, [script1, script2]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return {
      hasPermission: res.stack[0].value as boolean,
      symbol: base64ToString(res.stack[1].value as string),
    };
  };
  static getMetadata = (str) => {
    try {
      return JSON.parse(str);
    } catch (e: any) {
      return {};
    }
  };
}
