import { CONST } from "../../../index";
import {
  DOGE_SCRIPT_HASH,
  FTW_SCRIPT_HASH,
  MOON_SCRIPT_HASH,
  NUDES_SCRIPT_HASH,
} from "../nep17";
import { GAS_SCRIPT_HASH, MAINNET, PRIVATENET, TESTNET } from "../../../consts";
import { INetworkType } from "../../../network";

export const SWAP_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "aeac82f7830f4083b98089baa51060e621febb10",
  // [CONST.TESTNET]: "428783fccfb6b194f7d33cd421e9f56f48efbde5", // With WMOON
  [CONST.TESTNET]: "46d42416e99b4304f02259794737865af10ad74b",
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
    // [NUDES_SCRIPT_HASH[TESTNET]]: {
    //   contractHash: NUDES_SCRIPT_HASH[TESTNET],
    //   symbol: "NUDES",
    //   logo: "/symbols/nudes.png",
    // },
    // [DOGE_SCRIPT_HASH[TESTNET]]: {
    //   contractHash: DOGE_SCRIPT_HASH[TESTNET],
    //   symbol: "DOGE",
    //   logo: "/symbols/unknown.png",
    // },
    // [MOON_SCRIPT_HASH[TESTNET]]: {
    //   contractHash: MOON_SCRIPT_HASH[TESTNET],
    //   symbol: "WMOON",
    //   logo: "/symbols/unknown.png",
    // },
  },
  [MAINNET]: {
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
