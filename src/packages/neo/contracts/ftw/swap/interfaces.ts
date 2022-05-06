export interface IPairInfo {
  reserve: IPair;
  pair: Balance;
  balances: Balance;
}

interface Balance {
  [key: string]: number;
}

export interface IPair {
  tokenA: string;
  tokenB: string;
  amountA: number;
  amountB: number;
  totalShare: number;
}

export interface ILPTokens {
  name: string;
  tokenId: string;
  lockUntil: string;
  amount: string;
}

export interface IReserve {
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  totalShare: number;
  tokenASymbol: string;
  tokenBSymbol: string;
}
