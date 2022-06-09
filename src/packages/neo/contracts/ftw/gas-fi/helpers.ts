import { IFarmDepositRecord } from "./interfaces";
import { base64ToDate, toDecimal } from "../../../utils";

export const parseDeposit = (
  stackItem: any
): IFarmDepositRecord | undefined => {
  // TODO check if there no deposit
  // if (!stackItem.value) return undefined;
  return {
    position: stackItem[0].value,
    amount: stackItem[1].value,
    lastClaimNo: stackItem[2].value,
    createdAt: stackItem[3].value,
  };
};

export const parseClaimPaginate = (stackItem: any) => {
  return {
    totalItems: stackItem[0].value,
    totalPages: stackItem[1].value,
    page: stackItem[2].value,
    items: parseClaim(stackItem[3].value),
  };
};

export const parseClaim = (stackItem) => {
  return stackItem.map((item) => {
    return {
      no: item.value[0].value,
      from: item.value[1].value,
      end: item.value[2].value,
      GAS: toDecimal(item.value[3].value),
      FTW: toDecimal(item.value[4].value),
      createdAt: base64ToDate(item.value[5].value),
    };
  });
};

export const parseSnapshotPaginate = (stackItem: any) => {
  return {
    totalItems: stackItem[0].value,
    totalPages: stackItem[1].value,
    page: stackItem[2].value,
    items: parseSnapshotItem(stackItem[3].value),
  };
};

const parseSnapshotItem = (stackItem) => {
  return stackItem.map((item) => {
    return {
      no: item.value[0].value,
      totalPositionPool: item.value[1].value, // NEO amount
      totalNeo: item.value[2].value, // NEO amount
      totalGas: toDecimal(item.value[3].value),
      range: toDecimal(item.value[4].value),
      winPosition: item.value[5].value,
      createdAt: toDecimal(item.value[6].value),
    };
  });
};
