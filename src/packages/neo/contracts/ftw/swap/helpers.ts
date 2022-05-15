import { u } from "@cityofzion/neon-core";
import {
  base64ToAddress,
  base64ToDate,
  base64ToHash160,
  parseMapValue,
  toDecimal,
} from "../../../utils";
import moment from "moment";
import { IReserve, ISwap, ISwapHistory } from "./interfaces";

export const getEstimate = (
  amount: string,
  reserveA: number,
  reserveB: number
): number => {
  const fixed8TokenAmount = u.BigInteger.fromDecimal(amount, 8).toString();
  let estimated = (parseFloat(fixed8TokenAmount) * reserveB) / reserveA;
  estimated = Math.floor(estimated);
  return toDecimal(estimated.toString());
};

export const getUserShare = (totalShares, userShare, poolA, poolB) => {
  return {
    amountA: (poolA * userShare) / totalShares,
    amountB: (poolB * userShare) / totalShares,
  };
};

export const parseUserStake = (stackItem) => {
  return {
    tokenA: base64ToHash160(stackItem.value[0].value as string),
    tokenB: base64ToHash160(stackItem.value[1].value as string),
    amountA: toDecimal(stackItem.value[2].value),
    amountB: toDecimal(stackItem.value[3].value),
  };
};

export const parseReserve = (map): IReserve => parseMapValue(map);

export const parseSwapPaginate = (stackItem: any): ISwapHistory => {
  return {
    totalItems: stackItem[0].value,
    totalPages: stackItem[1].value,
    page: stackItem[2].value,
    items: parseSwap(stackItem[3].value),
  };
};

const parseSwap = (stackItem): ISwap[] => {
  return stackItem.map((item) => {
    return {
      account: base64ToAddress(item.value[0].value),
      tokenIn: base64ToHash160(item.value[1].value),
      tokenOut: base64ToHash160(item.value[2].value), // NEO amount
      amountIn: toDecimal(item.value[3].value), // NEO amount
      amountOut: toDecimal(item.value[4].value),
      createdAt: item.value[5] ? base64ToDate(item.value[5].value) : "",
    };
  });
};

export const defaultDeadLine = () =>
  moment().utc().add("10", "minutes").valueOf();
