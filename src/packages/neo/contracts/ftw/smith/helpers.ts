import {
  base64ToAddress,
  base64ToDate,
  base64ToHash160,
  base64ToString,
  toDecimal,
} from "../../../utils";
import { u } from "@cityofzion/neon-core";
import { InvokeResult } from "@cityofzion/neon-core/lib/rpc";
import {
  ISmithNEP11Info,
  ISmithNEP17Info,
  ISmithNEP17Record,
  ISmithNEP17RecordPaginate,
} from "./interfaces";

export const parseNEP17RecordsPaginate = (
  res: InvokeResult
): ISmithNEP17RecordPaginate => {
  const stack = res.stack[0].value as any;
  return {
    totalItems: parseFloat(stack[0].value),
    totalPages: parseFloat(stack[1].value),
    page: parseFloat(stack[2].value),
    items: parseNEP17Record(stack[3].value),
  };
};

const parseNEP17Record = (stackItem): ISmithNEP17Record[] => {
  return stackItem.map((item) => {
    return {
      no: item.value[0].value,
      contractOwner: base64ToAddress(item.value[1].value),
      contractHash: base64ToHash160(item.value[2].value), // NEO amount
      name: base64ToString(item.value[3].value), // NEO amount
      symbol: base64ToString(item.value[4].value), // NEO amount
      decimals: item.value[5].value, // NEO amount
      totalSupply: item.value[6].value, // NEO amount
      author: base64ToString(item.value[7].value), // NEO amount
      description: base64ToString(item.value[8].value), // NEO amount
      createdAt: base64ToDate(item.value[9].value),
    };
  });
};

export const parseNEP11RecordPaginate = (stackItem: any) => {
  return {
    totalItems: stackItem[0].value,
    totalPages: stackItem[1].value,
    page: stackItem[2].value,
    items: parseNEP11Record(stackItem[3].value),
  };
};

const parseNEP11Record = (stackItem) => {
  return stackItem.map((item) => {
    return {
      no: item.value[0].value,
      contractHash: base64ToHash160(item.value[1].value), // NEO amount
      contractOwner: base64ToAddress(item.value[2].value),
      name: base64ToString(item.value[3].value), // NEO amount
      symbol: base64ToString(item.value[4].value), // NEO amount
      description: base64ToString(item.value[5].value), // NEO amount
      author: base64ToString(item.value[6].value), // NEO amount
      email: base64ToString(item.value[7].value), // NEO amount
      createdAt: base64ToDate(item.value[8].value),
    };
  });
};

export const parseSmithProperties = (stackItem) => {
  const obj = {};
  // return JSON.stringify(res, null, 2);
  stackItem[0].value.map((item) => {
    const key = u.base642utf8(item.key.value);
    let value = "";

    if (key === "owner") {
      value = base64ToAddress(item.value.value);
    } else {
      if (item.value.type === "Integer") {
        value = item.value.value;
      } else {
        value = base64ToString(item.value.value);
      }
    }
    obj[key] = value;
  });
  return obj;
};

export const parseSmithNEP17Info = (res: InvokeResult): ISmithNEP17Info => {
  return {
    owner: base64ToAddress(res.stack[0].value as string),
    name: base64ToString(res.stack[1].value as string),
    totalSupply: toDecimal(res.stack[2].value as string),
    symbol: base64ToString(res.stack[3].value as string),
    decimals: res.stack[4].value as string,
    author: base64ToString(res.stack[5].value as string),
    description: base64ToString(res.stack[6].value as string),
    website: res.stack[7].value
      ? base64ToString(res.stack[7].value as string)
      : "",
    logo: res.stack[8].value
      ? base64ToString(res.stack[8].value as string)
      : "",
  };
};

export const parseSmithNEP11Info = (res: InvokeResult): ISmithNEP11Info => {
  return {
    owner: base64ToAddress(res.stack[0].value as string),
    symbol: base64ToString(res.stack[1].value as string),
    totalSupply: res.stack[2].value as string,
  };
};
