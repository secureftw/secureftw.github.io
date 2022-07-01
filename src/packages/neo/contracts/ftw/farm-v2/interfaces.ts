export interface IClaimableRewards {
  tokenA: string;
  tokenB: string;
  tokenASymbol: string;
  tokenBSymbol: string;
  claimable: number;
}

export interface IPool {
  tokenA: string;
  tokenB: string;
  tokenASymbol: string;
  tokenBSymbol: string;
	lastRewardedBlock: string;
	accumulatedRewardsPerShare: string;
	tokensStaked: string;
	nepTokensPerBlock: string;

}

export interface ILPTokens {
  contractHash: string;
  tokenA: string;
  tokenB: string;
  tokenId: string;
  amount: number;
}
