import { CONST } from "../../../index";
import {
  BNEO_SCRIPT_HASH,
  FTW_SCRIPT_HASH,
  MAXI_SCRIPT_HASH,
  NUDES_SCRIPT_HASH,
  TTM_SCRIPT_HASH,
} from "../nep17/consts";
import { GAS_SCRIPT_HASH, MAINNET, PRIVATENET, TESTNET } from "../../../consts";
import { INetworkType } from "../../../network";

export const SWAP_FEE = 0.25;

export const DEFAULT_SLIPPAGE = 3;

export const PRICE_IMPACT_LIMIT = 10;

export const SWAP_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "aeac82f7830f4083b98089baa51060e621febb10",
  // [CONST.TESTNET]: "428783fccfb6b194f7d33cd421e9f56f48efbde5", // With WMOON
  // [CONST.TESTNET]: "9773f6d3faa8d016856bddcb39777bc8d64dec5b",
  [CONST.TESTNET]: "50ae712ccb2760ad3f2ec3edebb25dbacc627fe2", // real
  // [CONST.TESTNET]: "b50b3f0469794c04c0eb73f8b7df8e8b38ce2cd6", // real
  [CONST.MAINNET]: "",
};

export const ASSET_LIST = {
  [PRIVATENET]: {
    [GAS_SCRIPT_HASH]: {
      contractHash: GAS_SCRIPT_HASH,
      symbol: "GAS",
      logo: "/symbols/neo.svg",
    },
    [FTW_SCRIPT_HASH[PRIVATENET]]: {
      contractHash: FTW_SCRIPT_HASH[PRIVATENET],
      symbol: "FTW",
      logo: "/symbols/ftw.svg",
    },
    [NUDES_SCRIPT_HASH[PRIVATENET]]: {
      contractHash: NUDES_SCRIPT_HASH[PRIVATENET],
      symbol: "NUDES",
      logo: "/symbols/nudes.png",
    },
  },
  [TESTNET]: {
    [BNEO_SCRIPT_HASH[TESTNET]]: {
      contractHash: BNEO_SCRIPT_HASH[TESTNET],
      symbol: "bNEO",
      logo: "/symbols/bneo.jpeg",
    },
    [GAS_SCRIPT_HASH]: {
      contractHash: GAS_SCRIPT_HASH,
      symbol: "GAS",
      logo: "/symbols/neo.svg",
    },
    [FTW_SCRIPT_HASH[TESTNET]]: {
      contractHash: FTW_SCRIPT_HASH[TESTNET],
      symbol: "FTW",
      logo: "/symbols/ftw.svg",
    },
    "7e7a84abff782e9f0c60c2fe1cd6b550a32d5cee": {
      contractHash: "7e7a84abff782e9f0c60c2fe1cd6b550a32d5cee",
      symbol: "FRANK",
      logo: "/symbols/frank.png",
    },
    [MAXI_SCRIPT_HASH[TESTNET]]: {
      contractHash: MAXI_SCRIPT_HASH[TESTNET],
      symbol: "MAXI",
      logo: "/symbols/maxi.png",
    },
    [NUDES_SCRIPT_HASH[TESTNET]]: {
      contractHash: NUDES_SCRIPT_HASH[TESTNET],
      symbol: "NUDES",
      logo: "/symbols/nudes.png",
    },
    [TTM_SCRIPT_HASH[TESTNET]]: {
      contractHash: TTM_SCRIPT_HASH[TESTNET],
      symbol: "TTM",
      logo: "/symbols/ttm.png",
    },
    "37fc2612dfe80a20b97470e57de60ffe81a8a0c0": {
      contractHash: "37fc2612dfe80a20b97470e57de60ffe81a8a0c0",
      symbol: "NPRZ",
      logo: "/symbols/prezel.png",
    },
    "7fd7b284cef510b017bca4d2e2e656d9a7b570ce": {
      contractHash: "7fd7b284cef510b017bca4d2e2e656d9a7b570ce",
      symbol: "NJC",
      logo: "/symbols/njc.png",
    },
    aeb697166d5cb3376757983b23df1be8292364d0: {
      contractHash: "aeb697166d5cb3376757983b23df1be8292364d0",
      symbol: "FOXES",
      logo: "/symbols/FOXES.png",
    },
    f987b060e05aeb3e58db27c409b82fc2d764e3ff: {
      contractHash: "f987b060e05aeb3e58db27c409b82fc2d764e3ff",
      symbol: "SAFERUST",
      logo: "/symbols/saferust.png",
    },
  },
  [MAINNET]: {
    [BNEO_SCRIPT_HASH[MAINNET]]: {
      contractHash: BNEO_SCRIPT_HASH[MAINNET],
      symbol: "bNEO",
      logo: "/symbols/bneo.jpeg",
    },
    [GAS_SCRIPT_HASH]: {
      contractHash: GAS_SCRIPT_HASH,
      symbol: "GAS",
      logo: "/symbols/neo.svg",
    },
    [FTW_SCRIPT_HASH[MAINNET]]: {
      contractHash: FTW_SCRIPT_HASH[MAINNET],
      symbol: "FTW",
      logo: "/symbols/ftw.svg",
    },
    [NUDES_SCRIPT_HASH[MAINNET]]: {
      contractHash: NUDES_SCRIPT_HASH[MAINNET],
      symbol: "NUDES",
      logo: "/symbols/nudes.png",
    },
    [TTM_SCRIPT_HASH[MAINNET]]: {
      contractHash: TTM_SCRIPT_HASH[MAINNET],
      symbol: "TTM",
      logo: "/symbols/ttm.png",
    },
    "461c3689e56a1d0c72ffeac3584af481d7642e7f": {
      contractHash: "461c3689e56a1d0c72ffeac3584af481d7642e7f",
      symbol: "MNGA",
      logo: "/symbols/mnga.png",
    },
    "50b41a55c1d746eec2b86b8f0405fb49fbb96492": {
      contractHash: "50b41a55c1d746eec2b86b8f0405fb49fbb96492",
      symbol: "TEDS",
      logo: "/symbols/ted.jpg",
    },
    [MAXI_SCRIPT_HASH[MAINNET]]: {
      contractHash: MAXI_SCRIPT_HASH[MAINNET],
      symbol: "MAXI",
      logo: "/symbols/maxi.png",
    },
  },
};

export const PAIR_LIST = {
  [PRIVATENET]: [
    {
      label: "FTW - NUDES",
      value: {
        tokenA: FTW_SCRIPT_HASH[PRIVATENET],
        tokenB: NUDES_SCRIPT_HASH[PRIVATENET],
      },
    },
  ],
  [TESTNET]: [
    {
      label: "FTW - NUDES",
      value: {
        tokenA: FTW_SCRIPT_HASH[TESTNET],
        tokenB: NUDES_SCRIPT_HASH[TESTNET],
      },
    },
  ],
  [MAINNET]: [],
};

export const ASSETS = (network: INetworkType) => {
  const keys = Object.keys(ASSET_LIST[network]);
  return keys.map((key) => {
    return ASSET_LIST[network][key];
  });
};
