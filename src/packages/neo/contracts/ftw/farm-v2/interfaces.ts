export interface IClaimableRewards {
  tokenA: string;
  tokenB: string;
  tokenASymbol: string;
  tokenBSymbol: string;
	bonusToHarvest: number
	bonusTokenHash: string
	rewardsToHarvest: number
	share: number
	tokensStaked: number
	nepTokensPerSecond: number;
	bonusTokensPerSecond: number;
}

export interface IPool {
  tokenA: string;
  tokenB: string;
  tokenASymbol: string;
  tokenBSymbol: string;
	lastRewardedAt: string;
	tokensStaked: number;
	nepTokensPerSecond: number;
	bonusToken: string;
	bonusTokenSymbol: string;
	bonusTokenDecimals: number;
	bonusTokensPerSecond: number;
}

export interface ILPTokens {
  contractHash: string;
  tokenA: string;
  tokenB: string;
  tokenId: string;
  amount: number;
}
