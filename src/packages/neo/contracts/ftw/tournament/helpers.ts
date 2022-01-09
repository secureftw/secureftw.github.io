import {
  base64ToAddress,
  base64ToHash160,
  base64ToString,
  toDecimal,
} from "../../../utils";
import { IHistory, IHistoryGame, IPlayer } from "./interfaces";

export const parsePlayer = (stackItem): IPlayer => {
  return stackItem.map((item) => {
    return {
      // no: item.value[0].value,
      owner: base64ToAddress(item.value[0].value),
      tokenHash: base64ToHash160(item.value[1].value),
      tokenId: base64ToString(item.value[2].value),
      phase: base64ToString(item.value[3].value),
      luck: item.value[4].value,
      createdAt: item.value[5].value,
    };
  });
};

export const parseHistory = (stackItem: any): IHistory => {
  return {
    totalItems: stackItem[0].value,
    totalPages: stackItem[1].value,
    currentPage: stackItem[2].value,
    items: parseGame(stackItem[3].value),
  };
};

const parseGame = (stackItem): IHistoryGame[] => {
  return stackItem.map((item) => {
    return {
      gameNo: item.value[0].value,
      tournamentTree: parsePlayer(item.value[1].value),
      champion: base64ToString(item.value[2].value), // NEO amount
      nonce: item.value[3].value,
      betsOnChampion: item.value[4].value,
      totalBets: item.value[5].value,
      rollover: item.value[6].value,
      fee: item.value[7].value,
      championPrize: item.value[8].value,
      createdAt: item.value[9].value,
    };
  });
};

export const calculateClaimableAmount = (
  history: IHistoryGame,
  betAmount: number
): number => {
  let totalAmount =
    parseFloat(history.totalBets) -
    parseFloat(history.fee) -
    parseFloat(history.championPrize);
  totalAmount = totalAmount + parseFloat(history.rollover);
  const ownershipPercentage =
    (((betAmount * 1000) / parseFloat(history.betsOnChampion)) * 1000) / 100;
  const myClaimAble = (totalAmount * ownershipPercentage) / (100 * 100);
  return toDecimal(myClaimAble.toString());
};
