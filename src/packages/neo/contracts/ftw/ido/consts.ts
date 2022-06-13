import { CONST } from "../../../index";
import {
  BNEO_SCRIPT_HASH,
  FLM_SCRIPT_HASH,
  GAS_SCRIPT_HASH,
  NEO_SCRIPT_HASH,
} from "../../../consts";
import { INetworkType } from "../../../network";

export const LAUNCH_AT = 1655229600000; // June 14th 6PM UTC (11AM LA)
export const TOTAL_TOKENS_FOR_SALE = 50_000_000;

export const IDO_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "",
  [CONST.TESTNET]: "0e0ffaacc089914ef3f97ad9e831da20d63c6027",
  [CONST.MAINNET]: "",
};

export const payments = (network: INetworkType) => [
  {
    contractHash: NEO_SCRIPT_HASH,
    symbol: "NEO",
    logo: "/symbols/neo.svg",
    decimals: 0,
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
    logo: "/symbols/flm.svg",
    decimals: 8,
    amount: 12,
  },
  // {
  //   contractHash: LRB_SCRIPT_HASH[network],
  //   symbol: "LRB",
  //   logo: "/symbols/lrb.svg",
  //   decimals: 8,
  //   amount: 25,
  // },
  // {
  //   contractHash: GM_SCRIPT_HASH[network],
  //   symbol: "GM",
  //   logo: "/symbols/gm.svg",
  //   decimals: 8,
  //   amount: 5,
  // },
];
