export interface IIDOStatus {
  available: number;
  launchDate: number;
  balances: {
    [key: string]: number;
  };
}
