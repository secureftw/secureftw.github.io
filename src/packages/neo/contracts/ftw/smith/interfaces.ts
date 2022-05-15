export interface ISmithNEP17RecordPaginate {
  totalItems: number;
  totalPages: number;
  page: number;
  items: ISmithNEP17Record[];
}

export interface ISmithNEP17Record {
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

export interface ISmithNEP17Info {
  owner: string;
  name: string;
  totalSupply: number;
  symbol: string;
  decimals: string;
  author: string;
  description: string;
  website: string;
  logo: string;
}

export interface ISmithNEP11Info {
  owner: string;
  symbol: string;
  totalSupply: string;
}
