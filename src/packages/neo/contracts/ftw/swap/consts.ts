import {
	BNEO_SCRIPT_HASH,
	FLM_SCRIPT_HASH,
	FTW_SCRIPT_HASH,
	GAS_SCRIPT_HASH,
	GM_SCRIPT_HASH,
	MAINNET,
	MAXI_SCRIPT_HASH, N3F_SCRIPT_HASH,
	NUDES_SCRIPT_HASH,
	PRIVATENET, TED_SCRIPT_HASH,
	TESTNET,
	TTM_SCRIPT_HASH,
} from "../../../consts";

import { INetworkType } from "../../../network";
import { NEP_SCRIPT_HASH } from "../nep-token/consts";

export const SWAP_FEE = 0.25;

export const DEFAULT_SLIPPAGE = 3;

export const PRICE_IMPACT_LIMIT = 20;

export const SWAP_SCRIPT_HASH = {
  [PRIVATENET]: "",
  [TESTNET]: "997ced5777a3f66485d66828bda3864b8c8bdf95",
  [MAINNET]: "997ced5777a3f66485d66828bda3864b8c8bdf95",
};

export const ASSET_LIST = {
  [TESTNET]: {
    [BNEO_SCRIPT_HASH[TESTNET]]: {
      contractHash: BNEO_SCRIPT_HASH[TESTNET],
      symbol: "bNEO",
      logo: "/symbols/bneo.jpeg",
      decimals: 8,
    },
    [GAS_SCRIPT_HASH]: {
      contractHash: GAS_SCRIPT_HASH,
      symbol: "GAS",
      logo: "/symbols/gas.svg",
      decimals: 8,
    },
    [FTW_SCRIPT_HASH[TESTNET]]: {
      contractHash: FTW_SCRIPT_HASH[TESTNET],
      symbol: "FTW",
      logo: "/symbols/ftw.svg",
      decimals: 8,
    },
    [NEP_SCRIPT_HASH[TESTNET]]: {
      contractHash: NEP_SCRIPT_HASH[TESTNET],
      symbol: "NEP",
      logo: "/symbols/nep.png",
      decimals: 8,
    },
    "7e7a84abff782e9f0c60c2fe1cd6b550a32d5cee": {
      contractHash: "7e7a84abff782e9f0c60c2fe1cd6b550a32d5cee",
      symbol: "FRANK",
      logo: "/symbols/frank.png",
      decimals: 8,
    },
    [MAXI_SCRIPT_HASH[TESTNET]]: {
      contractHash: MAXI_SCRIPT_HASH[TESTNET],
      symbol: "MAXI",
      logo: "/symbols/maxi.png",
      decimals: 8,
    },
    [NUDES_SCRIPT_HASH[TESTNET]]: {
      contractHash: NUDES_SCRIPT_HASH[TESTNET],
      symbol: "NUDES",
      logo: "/symbols/nudes.png",
      decimals: 8,
    },
    [TTM_SCRIPT_HASH[TESTNET]]: {
      contractHash: TTM_SCRIPT_HASH[TESTNET],
      symbol: "TTM",
      logo: "/symbols/ttm.png",
      decimals: 8,
    },
    "37fc2612dfe80a20b97470e57de60ffe81a8a0c0": {
      contractHash: "37fc2612dfe80a20b97470e57de60ffe81a8a0c0",
      symbol: "NPRZ",
      logo: "/symbols/prezel.png",
      decimals: 8,
    },
    "7fd7b284cef510b017bca4d2e2e656d9a7b570ce": {
      contractHash: "7fd7b284cef510b017bca4d2e2e656d9a7b570ce",
      symbol: "NJC",
      logo: "/symbols/njc.png",
      decimals: 8,
    },
    aeb697166d5cb3376757983b23df1be8292364d0: {
      contractHash: "aeb697166d5cb3376757983b23df1be8292364d0",
      symbol: "FOXES",
      logo: "/symbols/FOXES.png",
      decimals: 8,
    },
    f987b060e05aeb3e58db27c409b82fc2d764e3ff: {
      contractHash: "f987b060e05aeb3e58db27c409b82fc2d764e3ff",
      symbol: "SAFERUST",
      logo: "/symbols/saferust.png",
      decimals: 8,
    },
  },
  [MAINNET]: {
    [NEP_SCRIPT_HASH[MAINNET]]: {
      contractHash: NEP_SCRIPT_HASH[MAINNET],
      symbol: "NEP",
      logo: "/symbols/nep.svg",
      decimals: 8,
    },
    [GAS_SCRIPT_HASH]: {
      contractHash: GAS_SCRIPT_HASH,
      symbol: "GAS",
      logo: "/symbols/gas.svg",
      decimals: 8,
    },
    [BNEO_SCRIPT_HASH[MAINNET]]: {
      contractHash: BNEO_SCRIPT_HASH[MAINNET],
      symbol: "bNEO",
      logo: "/symbols/bneo.jpeg",
      decimals: 8,
    },
    [TTM_SCRIPT_HASH[MAINNET]]: {
      contractHash: TTM_SCRIPT_HASH[MAINNET],
      symbol: "TTM",
      logo: "/symbols/ttm.png",
      decimals: 8,
    },
    [FLM_SCRIPT_HASH[MAINNET]]: {
      contractHash: FLM_SCRIPT_HASH[MAINNET],
      symbol: "FLM",
      logo: "/symbols/flm.svg",
      decimals: 8,
    },
    [NUDES_SCRIPT_HASH[MAINNET]]: {
      contractHash: NUDES_SCRIPT_HASH[MAINNET],
      symbol: "NUDES",
      logo: "/symbols/nudes.png",
      decimals: 8,
    },
    [GM_SCRIPT_HASH[MAINNET]]: {
      contractHash: GM_SCRIPT_HASH[MAINNET],
      symbol: "GM",
      logo: "/symbols/gm.svg",
      decimals: 8,
    },
	  [N3F_SCRIPT_HASH[MAINNET]]: {
      contractHash: [N3F_SCRIPT_HASH[MAINNET]],
      symbol: "N3F",
      logo: "/symbols/n3f.jpg",
      decimals: 8,
    },
    [TED_SCRIPT_HASH[MAINNET]]: {
      contractHash: [TED_SCRIPT_HASH[MAINNET]],
      symbol: "TEDS",
      logo: "/symbols/ted.jpg",
      decimals: 8,
    },
    [MAXI_SCRIPT_HASH[MAINNET]]: {
      contractHash: MAXI_SCRIPT_HASH[MAINNET],
      symbol: "MAXI",
      logo: "/symbols/maxi.png",
      decimals: 8,
    },
  },
};

export const SWAP_ASSET_LIST = (network: INetworkType) => {
  const keys = Object.keys(ASSET_LIST[network]);
  return keys.map((key) => {
    return ASSET_LIST[network][key];
  });
};
