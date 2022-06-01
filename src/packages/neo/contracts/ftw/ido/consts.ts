import { CONST } from "../../../index";
import {
  GAS_SCRIPT_HASH,
  MAINNET,
  NEO_SCRIPT_HASH,
} from "../../../consts";
import {
  BNEO_SCRIPT_HASH,
  FLM_SCRIPT_HASH,
  GM_SCRIPT_HASH,
  LRB_SCRIPT_HASH,
} from "../nep17/consts";
import { INetworkType } from "../../../network";

export const LAUNCH_AT = 1655229600; // June 14th 6PM UTC (11AM LA)
export const TOTAL_TOKENS_FOR_SALE = 50_000_000;

export const IDO_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "",
  [CONST.TESTNET]: "563dde61ff806b1b7aab7123807ca8982ef5da9c",
  [CONST.MAINNET]: "",
};

export const payments = (network: INetworkType) => [
  {
    contractHash: NEO_SCRIPT_HASH,
    symbol: "NEO",
    logo: "/symbols/neo.svg",
    decimals: 8,
    amount: 1200,
  },
  {
    contractHash: BNEO_SCRIPT_HASH[network],
    symbol: "bNEO",
    logo: "/symbols/bneo.jpeg",
    decimals: 8,
    amount: 1200,
  },
  {
    contractHash: GAS_SCRIPT_HASH,
    symbol: "GAS",
    logo: "/symbols/gas.svg",
    decimals: 8,
    amount: 300,
  },
  {
    contractHash: FLM_SCRIPT_HASH[network],
    symbol: "FLM",
    logo: "/symbols/flm.png",
    decimals: 8,
    amount: 15,
  },
  {
    contractHash: LRB_SCRIPT_HASH[network],
    symbol: "LRB",
    logo: "/symbols/lrb.png",
    decimals: 8,
    amount: 15,
  },
  {
    contractHash: GM_SCRIPT_HASH[network],
    symbol: "GM",
    logo: "/symbols/gm.png",
    decimals: 8,
    amount: 15,
  },
];
