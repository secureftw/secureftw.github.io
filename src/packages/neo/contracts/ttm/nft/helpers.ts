import { u } from "@cityofzion/neon-core";
import { base64ToAddress, base64ToString } from "../../../utils";
/* Parse properties from rpc. */
export const parseProperties = (stackItem) => {
  const obj = {};
  stackItem.value.map((item) => {
    console.log(item);
    const key = u.base642utf8(item.key.value);
    console.log(key);
    let value;
    switch (key) {
      case "owner":
        value = base64ToAddress(item.value.value);
        break;
      case "attributes":
        value = parseProperties(item.value);
        break;
      default:
        if (item.value.type === "Integer" || item.value.type === "Boolean") {
          value = item.value.value;
        } else {
          value = base64ToString(item.value.value);
        }
    }
    obj[key] = value;
  });
  return obj;
};
