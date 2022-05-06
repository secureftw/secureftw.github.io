import { sc, u, wallet } from "@cityofzion/neon-core";
import moment from "moment";
import { IBalance } from "../wallet/interfaces";

export const truncateAddress = (address: string) => {
  return `${address.substring(0, 4)}...${address.substr(address.length - 2)}`;
};

/**
 * It converts contract call params for dev wallet. Depending on 3rd wallet params.
 * @param param
 */
export const convertContractCallParam = (param: any) => {
  switch (param.type) {
    case "Address":
      return sc.ContractParam.hash160(
        wallet.getScriptHashFromAddress(param.value)
      );
    case "Hash160":
      return sc.ContractParam.hash160(param.value);
    case "String":
      return sc.ContractParam.string(param.value);
    case "Integer":
      return sc.ContractParam.integer(param.value);
    case "Array":
      return sc.ContractParam.array(
        ...param.value.map((i: any) => convertContractCallParam(i))
      );
    case "ByteArray":
      return sc.ContractParam.byteArray(
        u.hex2base64(u.str2hexstring(param.value))
      );
    default:
      throw new Error("No support param");
  }
};

export const base64ToAddress = (str: string) =>
  wallet.getAddressFromScriptHash(base64ToHash160(str));

export const base64ToHash160 = (str: string) => u.reverseHex(u.base642hex(str));

export const base64ToString = (str: string) =>
  u.HexString.fromBase64(str).toAscii().toString();

export const base64ToFixed8 = (str: string) => {
  const no = u.BigInteger.fromNumber(str).toDecimal(8);
  return no;
};

export const toDecimal = (val: string): number => {
  try {
    const amount = parseFloat(
      u.BigInteger.fromNumber(parseFloat(val)).toDecimal(8).toString()
    );
    return amount;
  } catch (e) {
    return 0;
  }
};

// export const toNumber = () => {
//
// }

export const base64ToDate = (str: string) =>
  moment.unix(parseFloat(str) / 1000).format("lll");

export function truncateDecimal(v, p) {
  const s = Math.pow(10, p || 0);
  return Math.trunc(s * v) / s;
}

export const balanceCheck = (
  balances: IBalance[],
  requiredAmount: number
): boolean => {
  let hasBalance = false;
  balances.forEach((bal) => {
    if (bal.symbol === "GAS") {
      if (parseFloat(bal.amount) > requiredAmount) {
        hasBalance = true;
      }
    }
  });
  return hasBalance;
};
