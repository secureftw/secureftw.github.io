import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { SWAP_SCRIPT_HASH } from "./consts";
import { base64ToString, parseMapValue, toDecimal } from "../../../utils";
import { tx, u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { defaultDeadLine, parseSwapPaginate, parseReserve } from "./helpers";
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
      operation: "getReserveData",
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
    const pair: any = parseReserve(res.stack[0]);
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
  getEstimate = async (tokenA, tokenB, swapToken, amount): Promise<number> => {
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
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      return 0;
    } else {
      return toDecimal(res.stack[0].value as string);
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
      operation: "getSwaps",
      args: [
        { type: "Hash160", value: tokenA },
        { type: "Hash160", value: tokenB },
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
    const paginate = parseSwapPaginate(res.stack[0].value);
    return {
      ...paginate,
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

  getContractHashes = async (tokenA: string, tokenB: string): Promise<any> => {
    const script1 = {
      scriptHash: tokenA,
      operation: "symbol",
      args: [],
    };
    const script2 = {
      scriptHash: tokenA,
      operation: "decimals",
      args: [],
    };
    const script3 = {
      scriptHash: tokenB,
      operation: "symbol",
      args: [],
    };
    const script4 = {
      scriptHash: tokenB,
      operation: "decimals",
      args: [],
    };
    const script5 = {
      scriptHash: this.contractHash,
      operation: "getReserve",
      args: [
        { type: "Hash160", value: tokenA },
        { type: "Hash160", value: tokenB },
      ],
    };
    const res = await Network.read(this.network, [
      script1,
      script2,
      script3,
      script4,
      script5,
    ]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return {
      tokenA: {
        symbol: base64ToString(res.stack[0].value as string),
        decimals: res.stack[1].value,
      },
      tokenB: {
        symbol: base64ToString(res.stack[2].value as string),
        decimals: res.stack[3].value,
      },
      reserve: parseReserve(res.stack[4]),
    };
  };

  getContractSymbol = async (tokenA: string): Promise<any> => {
    const script1 = {
      scriptHash: tokenA,
      operation: "symbol",
      args: [],
    };
    const res = await Network.read(this.network, [script1]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return base64ToString(res.stack[0].value as string);
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
