import { u } from "@cityofzion/neon-core";
import { base64ToAddress, base64ToString } from "../../../utils";

/* Parse properties from rpc. */
export const parseProperties = (stackItem) => {
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
