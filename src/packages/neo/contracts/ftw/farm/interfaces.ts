export interface IClaimableRewards {
  tokenA: string;
  tokenB: string;
  tokenASymbol: string;
  tokenBSymbol: string;
  claimable: number;
}

export interface IStakingPairs {
  tokenA: string;
  tokenB: string;
  tokenASymbol: string;
  tokenBSymbol: string;
  currentAPR: number;
}

export interface ILPTokens {
  contractHash: string;
  tokenA: string;
  tokenB: string;
  tokenId: string;
  amount: number;
}
