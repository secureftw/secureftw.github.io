import { CONST } from "../../../index";
import { GAS_SCRIPT_HASH, MAINNET, NEO_SCRIPT_HASH } from "../../../consts";
import {
  BNEO_SCRIPT_HASH,
  FLM_SCRIPT_HASH,
  GM_SCRIPT_HASH,
  LRB_SCRIPT_HASH,
} from "../nep17/consts";
import { ASSET_LIST } from "../swap/consts";
import {INetworkType} from "../../../network";

export const LAUNCH_AT = 1655229600; // June 14th 6PM UTC (11AM LA)
export const TOTAL_TOKENS_FOR_SALE = 50_000_000;

export const IDO_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "",
  [CONST.TESTNET]: "563dde61ff806b1b7aab7123807ca8982ef5da9c",
  [CONST.MAINNET]: "",
};

export const payments = (network: INetworkType) => [
  {
    ...ASSET_LIST[network][NEO_SCRIPT_HASH],
    amount: 1200,
  },
  {
    ...ASSET_LIST[network][BNEO_SCRIPT_HASH[network]],
    amount: 1200,
  },
  {
    ...ASSET_LIST[network][GAS_SCRIPT_HASH],
    amount: 300,
  },
  {
    ...ASSET_LIST[network][FLM_SCRIPT_HASH[network]],
    amount: 15,
  },
  {
    ...ASSET_LIST[network][GM_SCRIPT_HASH[network]],
    amount: 15,
  },
  {
    ...ASSET_LIST[network][LRB_SCRIPT_HASH[network]],
    amount: 15,
  },
];
