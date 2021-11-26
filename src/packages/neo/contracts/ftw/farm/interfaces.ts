export interface IFarmContractStatus {
  neoBalance: string;
  timeLeft: string;
  interval: string;
  range: string;
  vote: string;
  deposit?: IFarmDepositRecord;
  claims?: IFarmClaimPaginate;
  snapshots: IFarmSnapshotPaginate;
}

export interface IFarmDepositRecord {
  position: string;
  amount: string;
  lastClaimNo: string;
  createdAt: string;
}

export interface IFarmSnapshotPaginate {
  totalItems: string;
  totalPages: string;
  page: string;
  items: IFarmSnapshot[];
}

export interface IFarmSnapshot {
  no: string;
  totalPositionPool: string;
  totalNeo: string;
  totalGas: string;
  rage: string;
  winPosition: string;
  createdAt: string;
}

export interface IFarmClaimPaginate {
  totalItems: string;
  totalPages: string;
  page: string;
  items: IFarmClaim[];
}

export interface IFarmClaim {
  no: string;
  from: string;
  end: string;
  GAS: string;
  FTW: string;
  createdAt: string;
}
