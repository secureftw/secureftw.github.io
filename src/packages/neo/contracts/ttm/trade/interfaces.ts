export interface ITradeListItem {
  itemNo: number;
  owner: string;
  nftContractHash: string;
  tokenId: string;
  paymentContractHash: string;
  price: string;
  createdAt: string;
}

export interface ITradeContractSettings {
  paymentContracts: any;
  currentFeePercentage: any;
  totalGasFee: any;
  auctions: any;
}
