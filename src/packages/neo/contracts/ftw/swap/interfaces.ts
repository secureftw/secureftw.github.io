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
