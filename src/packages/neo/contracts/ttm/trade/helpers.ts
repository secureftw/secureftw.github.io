import { ITradeContractSettings } from "./interfaces";
import {
  base64ToAddress,
  base64ToDate,
  base64ToFixed8,
  base64ToHash160,
  base64ToString,
} from "../../../utils";

/**
 * parse trade contract setting
 */
export const parseSettings = (item: any): ITradeContractSettings => {
  console.log(item);
  return {
    paymentContracts: item[0].iterator.map((i) => base64ToHash160(i.value)),
    currentFeePercentage: item[1].value,
    totalGasFee: base64ToFixed8(item[2].value),
    auctions: parseAuctionPaginate(item[3].value),
  };
};

export const parseAuctionPaginate = (stackItem: any) => {
  return {
    totalItems: stackItem[0].value,
    totalPages: stackItem[1].value,
    page: stackItem[2].value,
    items: parseAuctionItem(stackItem[3].value),
  };
};

const parseAuctionItem = (stackItem) => {
  return stackItem.map((item) => {
    return {
      auctionNo: item.value[0].value,
      owner: base64ToAddress(item.value[1].value), // NEO amount
      nftContractHash: base64ToHash160(item.value[2].value), // NEO amount
      tokenId: base64ToString(item.value[3].value),
      paymentTokenHash: base64ToHash160(item.value[4].value),
      startingPrice: item.value[5].value,
      lastBidPrice: item.value[6].value,
      hasExtended: item.value[6].value,
      createdAt: base64ToDate(item.value[6].value),
    };
  });
};
