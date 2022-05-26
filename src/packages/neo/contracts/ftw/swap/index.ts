import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { SWAP_SCRIPT_HASH } from "./consts";
import { base64ToString, parseMapValue, toDecimal } from "../../../utils";
import { tx, u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { defaultDeadLine } from "./helpers";
import { DEFAULT_WITNESS_SCOPE } from "../../../consts";
import { IPairInfo, IReserve } from "./interfaces";
import { parseProperties } from "../../ttm/nft/helpers";

export class SwapContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = SWAP_SCRIPT_HASH[networkType];
  }

  provide = async (
    connectedWallet: IConnectedWallet,
    tokenA: string,
    amountA: string,
    tokenB: string,
    amountB: string,
    lockUntil: number
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    // const defaultDeadLine = moment().utc().add("10", "minutes").valueOf();
    const invokeScript = {
      operation: "addLiquidity",
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
        {
          type: "Integer",
          value: defaultDeadLine(),
        },
        {
          type: "Integer",
          value: lockUntil,
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, tokenA, tokenB],
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
    tokenId: string
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
          type: "String",
          value: tokenId,
        },
        {
          type: "Integer",
          value: defaultDeadLine(),
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
        {
          type: "Integer",
          value: defaultDeadLine(),
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, tokenA, tokenB],
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

  getReserve = async (
    tokenA: string,
    tokenB: string,
    connectedWallet?: IConnectedWallet
  ): Promise<IPairInfo> => {
    const scripts: any = [];
    const script = {
      scriptHash: this.contractHash,
      operation: "getReserve",
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
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    const pair: any = parseMapValue(res.stack[0] as any);
    const obj = {
      reserve: pair,
      pair: {
        [pair.tokenA]: pair.amountA,
        [pair.tokenB]: pair.amountB,
      },
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

  getPairs = async (): Promise<IReserve[]> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getPairs",
      args: [],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    // @ts-ignore
    return res.stack[0].value.map((item) => parseMapValue(item));
  };

  // Swap estimate
  getSwapEstimate = async (
    tokenA,
    tokenB,
    swapToken,
    amount
  ): Promise<{ estimated: number; fee: number }> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getSwapEstimate",
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
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      return {
        estimated: 0,
        fee: 0,
      };
    } else {
      const { estimated, fee } = parseMapValue(res.stack[0] as any);
      return {
        estimated: toDecimal(estimated),
        fee,
      };
    }
  };

  getLPEstimate = (
    amount: string,
    reserveAAmount: number,
    reserveBAmount: number
  ): string => {
    const fixed8TokenAmount = u.BigInteger.fromDecimal(amount, 8).toString();
    let estimated =
      (parseFloat(fixed8TokenAmount) * reserveBAmount) / reserveAAmount;
    estimated = Math.floor(estimated);
    return u.BigInteger.fromNumber(estimated).toDecimal(8).toString();
    // return ((parseFloat(amount) * reserveBAmount) / reserveAAmount).toString();
  };

  getSwapHistory = async (tokenA: string, tokenB: string, page: string) => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getSwapsPaginate",
      args: [
        { type: "Hash160", value: tokenA },
        { type: "Hash160", value: tokenB },
        { type: "Integer", value: "20" },
        { type: "Integer", value: page },
      ],
    };
    const symbolA = {
      scriptHash: tokenA,
      operation: "symbol",
      args: [],
    };
    const symbolB = {
      scriptHash: tokenB,
      operation: "symbol",
      args: [],
    };
    const res = await Network.read(this.network, [script, symbolA, symbolB]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return {
      ...parseMapValue(res.stack[0] as any),
      [tokenA]: base64ToString(res.stack[1].value as string),
      [tokenB]: base64ToString(res.stack[2].value as string),
    };
  };

  getLPList = async (tokenA: string, tokenB: string): Promise<IReserve[]> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getLPTokensByPair",
      args: [
        { type: "Hash160", value: tokenA },
        { type: "Hash160", value: tokenB },
      ],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    // @ts-ignore
    return res.stack[0].value.map((item) => parseMapValue(item));
  };

  getContractInfo = async (
    contractHash: string
  ): Promise<{ symbol: string; decimals: string }> => {
    const script1 = {
      scriptHash: contractHash,
      operation: "symbol",
      args: [],
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
      symbol: base64ToString(res.stack[0].value as string),
      decimals: res.stack[1].value as string,
    };
  };

  getProperties = async (tokenId: string): Promise<object | null> => {
    const script = {
      scriptHash: this.contractHash,
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
    return parseProperties(res.stack[0]);
  };

  getLPTokens = async (connectedWallet: IConnectedWallet) => {
    const scripts = [
      {
        scriptHash: this.contractHash,
        operation: "getLPTokensByUser",
        args: [{ type: "Address", value: connectedWallet.account.address }],
      },
    ];
    const res = await Network.read(this.network, scripts);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    // @ts-ignore
    return res.stack[0].value.map((item) => parseMapValue(item));
  };
}
