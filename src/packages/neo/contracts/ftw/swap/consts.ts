import {
  MAINNET,
  PRIVATENET,
  TESTNET,
  TOKEN_CATEGORY_GENERAL,
  TOKEN_CATEGORY_METAVERSE,
  TOKEN_CATEGORY_STARTUPS,
  UNKNOWN_TOKEN_IMAGE,
} from "../../../consts";

import { INetworkType } from "../../../network";
import {
  BNEO_SCRIPT_HASH,
  FRANK_SCRIPT_HASH,
  GAS_SCRIPT_HASH,
  HIST_SCRIPT_HASH,
  HOOD_SCRIPT_HASH,
  LITH_SCRIPT_HASH,
  MAG_SCRIPT_HASH,
  MAXI_SCRIPT_HASH,
  NEP_SCRIPT_HASH,
  NUDES_SCRIPT_HASH,
  TED_SCRIPT_HASH,
  TGAS_SCRIPT_HASH,
  TTM_SCRIPT_HASH,
  USDT_SCRIPT_HASH,
  WATT_SCRIPT_HASH,
} from "../../../consts/nep17-list";
import { TESTNET_TOKEN_LIST } from "./testnet-token-list";
import { MAINNET_TOKEN_LIST } from "./mainnet-token-list";

export const SWAP_FEE = 0.25;

export const DEFAULT_SLIPPAGE = 3;

export const PRICE_IMPACT_LIMIT = 100;

// address: NZaRfXQyyVam8pdpHU5GUZax3iv5mKTT2q
export const SWAP_SCRIPT_HASH = {
  [PRIVATENET]: "",
  [TESTNET]: "997ced5777a3f66485d66828bda3864b8c8bdf95",
  [MAINNET]: "997ced5777a3f66485d66828bda3864b8c8bdf95",
};

export const ASSET_LIST = {
  [TESTNET]: TESTNET_TOKEN_LIST,
  [MAINNET]: MAINNET_TOKEN_LIST,
};

export const SWAP_ASSET_LIST = (network: INetworkType) => {
  const keys = Object.keys(ASSET_LIST[network]);
  return keys.map((key) => {
    return ASSET_LIST[network][key];
  });
};

export const SWAP_ASSET_CATEGORY = [
	TOKEN_CATEGORY_GENERAL,
	TOKEN_CATEGORY_METAVERSE,
	TOKEN_CATEGORY_STARTUPS,
]
