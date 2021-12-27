import {
  base64ToAddress,
  base64ToString,
} from "../../../utils";
import { IHistory, IHistoryGame, IPlayer } from "./interfaces";

export const parsePlayer = (stackItem): IPlayer => {
  return stackItem.map((item) => {
    return {
      no: item.value[0].value,
      owner: base64ToAddress(item.value[1].value),
      tokenId: base64ToString(item.value[2].value),
      phase: base64ToString(item.value[3].value),
      luck: item.value[4].value,
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
      no: item.value[0].value,
      champion: base64ToString(item.value[1].value), // NEO amount
      tournamentTree: parsePlayer(item.value[2].value), // NEO amount
      nonce: item.value[3].value,
      createdAt: item.value[4].value,
    };
  });
};
