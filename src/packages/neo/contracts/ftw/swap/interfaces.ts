export interface IPairInfo {
  reserve: IReserve;
  pair: Balance;
  balances: Balance;
}

interface Balance {
  [key: string]: number;
}

export interface ILPTokens {
  name: string;
  tokenId: string;
  lockUntil: string;
  amount: number;
}

export interface IReserve {
  tokenA: string;
  tokenB: string;
  amountA: number;
  amountB: number;
  totalShare: number;
  tokenASymbol: string;
  tokenBSymbol: string;
}

export interface ISwap {
  account: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  createdAt: string;
}
