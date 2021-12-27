export interface IPlayer {
  playerNo: string;
  owner: string;
  tokenId: string;
  phase: string;
  luck: string;
}

export interface IHistory {
  totalItems: string;
  totalPages: string;
  currentPage: string;
  items: IHistoryGame[];
}

export interface IHistoryGame {
  no: string;
  champion: string;
  nonce: string;
  tournamentTree: IPlayer[];
  createdAt: string;
}
