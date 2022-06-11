export interface IIDOStatus {
	totalSales: number;
	launchAt: number;
	availableBalance: number;
  balances: {
    [key: string]: number;
  };
}
