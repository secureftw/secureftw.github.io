import {
  base64ToAddress,
  base64ToDate,
  base64ToHash160,
  base64ToString,
} from "../../../utils";

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
