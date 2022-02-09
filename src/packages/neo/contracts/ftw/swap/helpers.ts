import { u } from "@cityofzion/neon-core";
import { base64ToHash160, toDecimal } from "../../../utils";

export const getEstimate = (
  amount: string,
  reserveA: number,
  reserveB: number
) => {
  const fixed8TokenAmount = u.BigInteger.fromDecimal(amount, 8).toString();
  // let keys = Object.keys(pairInfo);
  // keys = keys.filter((k) => k !== token);
  // const reservedA = pairInfo[token];
  // const reservedB = pairInfo[keys[0]];
  let estimated = (parseFloat(fixed8TokenAmount) * reserveB) / reserveA;
  estimated = Math.floor(estimated);
  estimated = toDecimal(estimated.toString());
  return estimated;
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

export const parsePair = (stackItem) => {
  return {
    tokenA: base64ToHash160(stackItem.value[0].value as string),
    tokenB: base64ToHash160(stackItem.value[1].value as string),
    amountA: toDecimal(stackItem.value[2].value),
    amountB: toDecimal(stackItem.value[3].value),
    totalShare: toDecimal(stackItem.value[4].value),
  };
};
