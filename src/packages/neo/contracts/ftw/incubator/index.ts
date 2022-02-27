import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { base64ToHash160, toDecimal } from "../../../utils";
import { tx, u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { parsePair, parsePoolInfoPaginate, parseSwapPaginate, parseUserStake } from "./helpers";
import { DEFAULT_WITNESS_SCOPE } from "../../../consts";
import { IPairInfo } from "./interfaces";
import { INCUBATOR_SCRIPT_HASH } from "./consts";

export class IncubatorContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = INCUBATOR_SCRIPT_HASH[networkType];
  }

  createPool = async (
    connectedWallet: IConnectedWallet,
    tokenHash: string,
    amount: string,
    description: string,
    website: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "createPool",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Hash160",
          value: tokenHash,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(amount, 8).toString(),
        },
        {
          type: "String",
          value: description,
        },
        {
          type: "String",
          value: website,
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, tokenHash],
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

  remove = async (
    connectedWallet: IConnectedWallet,
    tokenA: string,
    tokenB: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "removeLiquidity",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Hash160",
          value: tokenA,
        },
        {
          type: "Hash160",
          value: tokenB,
        },
      ],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript,
      undefined,
      undefined
    );
  };

  claim = async (
    connectedWallet: IConnectedWallet,
    tokenA: string,
    tokenB: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "claim",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Hash160",
          value: tokenA,
        },
        {
          type: "Hash160",
          value: tokenB,
        },
      ],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript,
      undefined,
      undefined
    );
  };

  swap = async (
    connectedWallet: IConnectedWallet,
    tokenA: string,
    amountA: string,
    tokenB: string,
    amountB: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "swap",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Hash160",
          value: tokenA,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(amountA, 8).toString(),
        },
        {
          type: "Hash160",
          value: tokenB,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(amountB, 8).toString(),
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, tokenA],
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

  getPair = async (
    tokenA: string,
    tokenB: string,
    connectedWallet?: IConnectedWallet
  ): Promise<IPairInfo> => {
    const scripts: any = [];
    const script = {
      scriptHash: this.contractHash,
      operation: "getPair",
      args: [
        { type: "Hash160", value: tokenA },
        { type: "Hash160", value: tokenB },
      ],
    };
    scripts.push(script);
    if (connectedWallet) {
      const script1 = {
        scriptHash: tokenA,
        operation: "balanceOf",
        args: [{ type: "Address", value: connectedWallet.account.address }],
      };
      const script2 = {
        scriptHash: tokenB,
        operation: "balanceOf",
        args: [{ type: "Address", value: connectedWallet.account.address }],
      };
      scripts.push(script1);
      scripts.push(script2);
    }
    const res = await Network.read(this.network, scripts);
    const pair = parsePair(res.stack[0]);
    const obj = {
      reserve: pair,
      pair: {
        [pair.tokenA]: pair.amountA,
        [pair.tokenB]: pair.amountB,
      },
      // [pair.tokenA]: pair.amountA,
      // [pair.tokenB]: pair.amountB,
      balances: {
        [tokenA]: 0,
        [tokenB]: 0,
      },
    };
    if (connectedWallet) {
      obj.balances[tokenA] = toDecimal(res.stack[1].value as string);
      obj.balances[tokenB] = toDecimal(res.stack[2].value as string);
    }
    return obj;
  };

  getPairs = async () => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getPairs",
      args: [],
    };
    try {
      const res = await Network.read(this.network, [script], true);
      // @ts-ignore
      return res.stack[0].iterator.map((item) => {
        const tokenA = base64ToHash160(item.value[0].value as string);
        const tokenB = base64ToHash160(item.value[1].value as string);
        const amountA = item.value[2].value;
        const amountB = item.value[3].value;
        return {
          tokenA,
          tokenB,
          amountA: toDecimal(amountA),
          amountB: toDecimal(amountB),
        };
      });
    } catch (e) {
      return [];
    }
  };

  getEstimate = async (tokenA, tokenB, swapToken, amount) => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getEstimate",
      args: [
        { type: "Hash160", value: tokenA },
        { type: "Hash160", value: tokenB },
        { type: "Hash160", value: swapToken },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(amount, 8).toString(),
        },
      ],
    };
    try {
      const res = await Network.read(this.network, [script], true);
      return toDecimal(res.stack[0].value as string);
    } catch (e) {
      return undefined;
    }
  };

  getUserStake = async (
    connectedWallet: IConnectedWallet,
    tokenA: string,
    tokenB: string
  ) => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getUserStake",
      args: [
        { type: "Address", value: connectedWallet.account.address },
        { type: "Hash160", value: tokenA },
        { type: "Hash160", value: tokenB },
      ],
    };
    const script1 = {
      scriptHash: this.contractHash,
      operation: "getPair",
      args: [
        { type: "Hash160", value: tokenA },
        { type: "Hash160", value: tokenB },
      ],
    };
    try {
      const res = await Network.read(this.network, [script, script1], true);
      return {
        stake: parseUserStake(res.stack[0]),
        pair: parsePair(res.stack[1]),
      };
    } catch (e) {
      return undefined;
    }
  };

  getClaimAble = async (
    connectedWallet: IConnectedWallet,
    tokenA: string,
    tokenB: string
  ) => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getClaimableFee",
      args: [
        { type: "Hash160", value: tokenA },
        { type: "Hash160", value: tokenB },
        { type: "Address", value: connectedWallet.account.address },
      ],
    };
    try {
      const res = await Network.read(this.network, [script], true);
      return parseUserStake(res.stack[0]);
    } catch (e) {
      return undefined;
    }
  };

  pools = async (page: string) => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getPoolInfos",
      args: [{ type: "Integer", value: page }],
    };
    try {
      const res = await Network.read(this.network, [script]);
      return parsePoolInfoPaginate(res.stack[0].value);
    } catch (e) {
      return undefined;
    }
  };
}
