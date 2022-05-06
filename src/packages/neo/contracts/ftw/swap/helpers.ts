import { u } from "@cityofzion/neon-core";
import {
  base64ToAddress,
  base64ToDate,
  base64ToFixed8,
  base64ToHash160,
  base64ToString,
  toDecimal,
} from "../../../utils";
import { IPair } from "./interfaces";
import moment from "moment";
import { StackItemMapLike } from "@cityofzion/neon-core/lib/sc";
import { parseMapValue } from "../staking/helpers";

export const getEstimate = (
  amount: string,
  reserveA: number,
  reserveB: number
): number => {
  const fixed8TokenAmount = u.BigInteger.fromDecimal(amount, 8).toString();
  // let keys = Object.keys(pairInfo);
  // keys = keys.filter((k) => k !== token);
  // const reservedA = pairInfo[token];
  // const reservedB = pairInfo[keys[0]];
  let estimated = (parseFloat(fixed8TokenAmount) * reserveB) / reserveA;
  estimated = Math.floor(estimated);
  return toDecimal(estimated.toString());
};

export const getUserShare = (totalShares, userShare, poolA, poolB) => {
  // totalShares = parseFloat(totalShares);
  // userShare = parseFloat(userShare);
  // poolA = parseFloat(poolA);
  // poolB = parseFloat(poolB);
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

export const parseReserve = (map): IPair => parseMapValue(map);

export const parseSwapPaginate = (stackItem: any) => {
  return {
    totalItems: stackItem[0].value,
    totalPages: stackItem[1].value,
    page: stackItem[2].value,
    items: parseSwap(stackItem[3].value),
  };
};

const parseSwap = (stackItem) => {
  return stackItem.map((item) => {
    return {
      account: base64ToAddress(item.value[0].value),
      tokenIn: base64ToHash160(item.value[1].value),
      tokenOut: base64ToHash160(item.value[2].value), // NEO amount
      tokenInAmount: toDecimal(item.value[3].value), // NEO amount
      tokenOutAmount: toDecimal(item.value[4].value),
    };
  });
};

export const defaultDeadLine = () =>
  moment().utc().add("10", "minutes").valueOf();
