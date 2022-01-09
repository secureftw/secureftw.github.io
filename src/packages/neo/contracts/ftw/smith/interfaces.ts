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

export interface ISmithNEP11RecordPaginate {
  totalItems: string;
  totalPages: string;
  page: string;
  items: ISmithNEP11Record[];
}

export interface ISmithNEP11Record {
  no: string;
  contractHash: string;
  contractOwner: string;
  name: string;
  symbol: string;
  description: string;
  author: string;
  email: string;
  createdAt: string;
}
