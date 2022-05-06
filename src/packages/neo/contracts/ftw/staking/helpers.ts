import { u } from "@cityofzion/neon-core";
import {
  StackItemLike,
  StackItemMap,
} from "@cityofzion/neon-core/lib/sc/StackItem";
import {
  base64ToAddress,
  base64ToDate,
  base64ToHash160,
  base64ToString,
  toDecimal,
} from "../../../utils";
import { InvokeResult } from "@cityofzion/neon-core/lib/rpc";
import { IClaimableRewards, ILPTokens, IStakingPairs } from "./interfaces";

interface B extends Omit<InvokeResult, "stack"> {
  stack: StackItemLike;
}

export const parsePairsMap = (m: B): IStakingPairs[] => {
  return m.stack[0].value.map((pair) => {
    return parseMapValue(pair);
  });
};

export const parseStakedLPTokensMap = (m: B): ILPTokens[] => {
  return m.stack[0].value.map((pair) => {
    return parseMapValue(pair);
  });
};

export const parseClaimableMap = (m: B): IClaimableRewards[] => {
  return m.stack[0].value.map((pair) => {
    return parseMapValue(pair);
  });

  // const root = m.stack[0].value[0]; // Map of map
  // const pool = base64ToString(root.key.value);
  // const values = parseMapValue(root.value);
  // return {
  //   pool,
  //   ...values,
  // };
};

export const parseMapValue = (v: StackItemLike): any => {
  const obj = {};
  const root = v.value as StackItemMap[];
  root.map(({ key, value }) => {
    const k = u.base642utf8(key.value as string);
    let val;
    switch (k) {
      case "contractHash":
        val = base64ToHash160(value.value as string);
        break;
      case "tokenA":
        val = base64ToHash160(value.value as string);
        break;
      case "tokenB":
        val = base64ToHash160(value.value as string);
        break;
      case "amountA":
        val = toDecimal(value.value as string);
        break;
      case "amountB":
        val = toDecimal(value.value as string);
        break;
      case "totalShare":
        val = value.value;
        break;
      case "tokenASymbol":
        val = base64ToString(value.value as string);
        break;
      case "tokenBSymbol":
        val = base64ToString(value.value as string);
        break;
      case "claimable":
        val = toDecimal(value.value as string);
        break;
      case "dailyReward":
        val = toDecimal(value.value as string);
        break;
      case "tokenId":
        val = base64ToString(value.value as string);
        break;
      case "amount":
        val = toDecimal(value.value as string);
        break;
      case "owner":
        val = base64ToAddress(value.value as string);
        break;
      case "lockUntil":
        val =
          value.value === "0" ? "None" : base64ToDate(value.value as string);
        break;
      case "name":
        val = base64ToString(value.value as string);
        break;
    }
    obj[k] = val;
  });
  return obj;
};
