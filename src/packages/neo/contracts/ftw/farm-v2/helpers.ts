import { StackItemLike } from "@cityofzion/neon-core/lib/sc/StackItem";
import { parseMapValue } from "../../../utils";
import { InvokeResult } from "@cityofzion/neon-core/lib/rpc";
import { IClaimableRewards, ILPTokens } from "./interfaces";

interface B extends Omit<InvokeResult, "stack"> {
  stack: StackItemLike;
}

export const parseStakedLPTokensMap = (m: B): ILPTokens[] => {
  return m.stack[0].value.map((pair) => {
    return parseMapValue(pair);
  });
};

export const parseClaimableMap = (m: B): IClaimableRewards[] => {
  return m.stack[0].value.map((pair) => {
    return parseMapValue(pair);
  });
};
