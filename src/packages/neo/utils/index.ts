import { sc, u, wallet } from "@cityofzion/neon-core";
import moment from "moment";
import { IBalance } from "../wallet/interfaces";
import {
  StackItemLike,
  StackItemMap,
} from "@cityofzion/neon-core/lib/sc/StackItem";

export const truncateAddress = (address: string) => {
  return address
    ? `${address.substring(0, 4)}...${address.substr(address.length - 2)}`
    : "";
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

export const base64ToAddress = (str: string): string =>
  wallet.getAddressFromScriptHash(base64ToHash160(str));

export const base64ToHash160 = (str: string): string =>
  u.reverseHex(u.base642hex(str));

export const base64ToString = (str: string): string =>
  u.HexString.fromBase64(str).toAscii().toString();

export const base64ToDate = (str: string): string =>
  moment.unix(parseFloat(str) / 1000).format("lll");

export const toDecimal = (val: string | number): number => {
  try {
    return parseFloat(u.BigInteger.fromNumber(val).toDecimal(8));
  } catch (e) {
    return 0;
  }
};

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

export const parseMapValue = (v: StackItemLike): any => {
  const obj = {};
  const root = v.value as StackItemMap[];
  root.forEach(({ key, value }) => {
    if (value.value) {
      const k = u.base642utf8(key.value as string);
      let val;
      switch (k) {
        case "owner":
          val = base64ToAddress(value.value as string);
          break;
	      case "account":
		      val = base64ToAddress(value.value as string);
		      break;
        case "creator":
          val = base64ToAddress(value.value as string);
          break;
        case "contractHash":
          val = base64ToHash160(value.value as string);
          break;
        case "tokenA":
          val = base64ToHash160(value.value as string);
          break;
        case "tokenB":
          val = base64ToHash160(value.value as string);
          break;
	      case "tokenIn":
		      val = base64ToHash160(value.value as string);
		      break;
	      case "tokenOut":
		      val = base64ToHash160(value.value as string);
		      break;
        case "name":
          val = base64ToString(value.value as string);
          break;
        case "meta":
          val = base64ToString(value.value as string);
          break;
        case "tokenId":
          val = base64ToString(value.value as string);
          break;
        case "tokenASymbol":
          val = base64ToString(value.value as string);
          break;
        case "tokenBSymbol":
          val = base64ToString(value.value as string);
          break;
        case "symbol":
          val = base64ToString(value.value as string);
          break;
        case "symbolA":
          val = base64ToString(value.value as string);
          break;
        case "symbolB":
          val = base64ToString(value.value as string);
          break;
        case "title":
          val = base64ToString(value.value as string);
          break;
        case "description":
          val = base64ToString(value.value as string);
          break;
        case "options":
	        // @ts-ignore
	        val = value.value.map(v => {
						return base64ToString(v.value as string);
          })
          break;
        case "start":
          val = parseFloat(value.value as string);
          break;
        case "end":
          val = parseFloat(value.value as string);
          break;
        case "deposit":
          val = value.value;
          break;
        case "totalItems":
          val = value.value;
          break;
        case "totalPages":
          val = value.value;
          break;
        case "no":
          val = value.value;
          break;
        case "minTokens":
          val = toDecimal(value.value as string);
          break;
        case "amountA":
          val = toDecimal(value.value as string);
          break;
        case "amountB":
          val = toDecimal(value.value as string);
          break;
	      case "amountIn":
		      val = toDecimal(value.value as string);
		      break;
	      case "amountOut":
		      val = toDecimal(value.value as string);
		      break;
        case "totalShare":
          val = toDecimal(value.value as string);
          break;
        case "claimable":
          val = toDecimal(value.value as string);
          break;
        case "dailyReward":
          val = toDecimal(value.value as string);
          break;
        case "amount":
          val = toDecimal(value.value as string);
          break;
        case "lockUntil":
          val =
            value.value === "0" ? "None" : base64ToDate(value.value as string);
          break;
        case "createdAt":
          val = base64ToDate(value.value as string);
          break;
        case "items":
          // @ts-ignore
          val = value.value.map((item) => {
            return parseMapValue(item);
          });
          break;
        default:
          val = value.value;
					break;
      }
      obj[k] = val;
    }
  });
  return obj;
};
