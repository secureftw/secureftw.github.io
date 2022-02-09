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
  gameNo: string;
  tournamentTree: IPlayer[];
  champion: string;
  nonce: string;
  betsOnChampion: string;
  totalBets: string;
  rollover: string;
  fee: string;
  championPrize: string;
  createdAt: string;
  champOwner: string;
}
