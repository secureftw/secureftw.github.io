export interface IPrices {
  [key: string]: number;
}

export interface ISwapHistoryResult {
  items: ISwap[];
  totalItems: number;
  perPage: number;
  totalPages: number;
}

interface ISwap {
  account: string;
  base_id: string;
  base_amount: number;
  quote_id: string;
  quote_amount: number;
  fee: number;
  blockIndex: number;
  vmstate: string;
  time: number;
  txid: string;
}
