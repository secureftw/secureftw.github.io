import {
  base64ToAddress,
  base64ToDate,
  base64ToHash160,
  base64ToString,
} from "../../../utils";
import { u } from "@cityofzion/neon-core";

export const parsePaginate = (stackItem: any) => {
  return {
    totalItems: stackItem[0].value,
    totalPages: stackItem[1].value,
    page: stackItem[2].value,
    items: parseRecord(stackItem[3].value),
  };
};

const parseRecord = (stackItem) => {
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
