export interface ISmithContractStatus {
  records: ISmithRecordPaginate;
}

export interface ISmithRecordPaginate {
  totalItems: string;
  totalPages: string;
  page: string;
  items: ISmithRecord[];
}

export interface ISmithRecord {
  no: string;
  contractOwner: string;
  contractHash: string;
  name: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
  author: string;
  description: string;
  createdAt: string;
}
