import { sc } from "@cityofzion/neon-core";

export interface INotification {
  contract: string,
  eventName: string,
  state: sc.StackItem
}
//
// {
//   "contract": "0xb5b5a5f63447a9130e6b78ffe8d9ce126d97d862",
//   "eventname": "Sale",
//   "state": {
//   "type": "Array",
//     "value": [
//     {
//       "type": "ByteString",
//       "value": "V0ZVc+uMDSkrLubcsYu95TzCKLY="
//     },
//     {
//       "type": "ByteString",
//       "value": "Q3J5cHRvbmF1dA=="
//     },
//     {
//       "type": "Integer",
//       "value": "6"
//     }
//   ]
// }
// }
