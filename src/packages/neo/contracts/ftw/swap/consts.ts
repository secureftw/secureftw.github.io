import { CONST } from "../../../index";
import {
	BNEO_SCRIPT_HASH, FLM_SCRIPT_HASH,
	FTW_SCRIPT_HASH, GM_SCRIPT_HASH, LRB_SCRIPT_HASH,
	MAXI_SCRIPT_HASH, NEP_SCRIPT_HASH,
	NUDES_SCRIPT_HASH,
	TTM_SCRIPT_HASH,
} from "../nep17/consts";
import {GAS_SCRIPT_HASH, MAINNET, PRIVATENET, TESTNET} from "../../../consts";
import { INetworkType } from "../../../network";

export const SWAP_FEE = 0.25;

export const DEFAULT_SLIPPAGE = 0.6;

export const PRICE_IMPACT_LIMIT = 10;

export const SWAP_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "aeac82f7830f4083b98089baa51060e621febb10",
  [CONST.TESTNET]: "73255207d4d254aa46a06ebfa952f9b65914d05c", // real
  // [CONST.TESTNET]: "50ae712ccb2760ad3f2ec3edebb25dbacc627fe2", // -1
  [CONST.MAINNET]: "",
};

export const ASSET_LIST = {
  [PRIVATENET]: {
    [GAS_SCRIPT_HASH]: {
      contractHash: GAS_SCRIPT_HASH,
      symbol: "GAS",
      logo: "/symbols/neo.svg",
	    decimals: 8
    }
  },
  [TESTNET]: {
    [BNEO_SCRIPT_HASH[TESTNET]]: {
      contractHash: BNEO_SCRIPT_HASH[TESTNET],
      symbol: "bNEO",
      logo: "/symbols/bneo.jpeg",
	    decimals: 8
    },
    [GAS_SCRIPT_HASH]: {
      contractHash: GAS_SCRIPT_HASH,
      symbol: "GAS",
      logo: "/symbols/gas.svg",
	    decimals: 8
    },
    // [FTW_SCRIPT_HASH[TESTNET]]: {
    //   contractHash: FTW_SCRIPT_HASH[TESTNET],
    //   symbol: "FTW",
    //   logo: "/symbols/ftw.svg",
	  //   decimals: 8
    // },
	  [NEP_SCRIPT_HASH[TESTNET]]: {
		  contractHash: NEP_SCRIPT_HASH[TESTNET],
		  symbol: "NEP",
		  logo: "/symbols/nep.png",
		  decimals: 8
	  },
    "7e7a84abff782e9f0c60c2fe1cd6b550a32d5cee": {
      contractHash: "7e7a84abff782e9f0c60c2fe1cd6b550a32d5cee",
      symbol: "FRANK",
      logo: "/symbols/frank.png",
	    decimals: 8
    },
    [MAXI_SCRIPT_HASH[TESTNET]]: {
      contractHash: MAXI_SCRIPT_HASH[TESTNET],
      symbol: "MAXI",
      logo: "/symbols/maxi.png",
	    decimals: 8
    },
    [NUDES_SCRIPT_HASH[TESTNET]]: {
      contractHash: NUDES_SCRIPT_HASH[TESTNET],
      symbol: "NUDES",
      logo: "/symbols/nudes.png",
	    decimals: 8
    },
    [TTM_SCRIPT_HASH[TESTNET]]: {
      contractHash: TTM_SCRIPT_HASH[TESTNET],
      symbol: "TTM",
      logo: "/symbols/ttm.png",
	    decimals: 8
    },
    "37fc2612dfe80a20b97470e57de60ffe81a8a0c0": {
      contractHash: "37fc2612dfe80a20b97470e57de60ffe81a8a0c0",
      symbol: "NPRZ",
      logo: "/symbols/prezel.png",
	    decimals: 8
    },
    "7fd7b284cef510b017bca4d2e2e656d9a7b570ce": {
      contractHash: "7fd7b284cef510b017bca4d2e2e656d9a7b570ce",
      symbol: "NJC",
      logo: "/symbols/njc.png",
	    decimals: 8
    },
    aeb697166d5cb3376757983b23df1be8292364d0: {
      contractHash: "aeb697166d5cb3376757983b23df1be8292364d0",
      symbol: "FOXES",
      logo: "/symbols/FOXES.png",
	    decimals: 8
    },
    f987b060e05aeb3e58db27c409b82fc2d764e3ff: {
      contractHash: "f987b060e05aeb3e58db27c409b82fc2d764e3ff",
      symbol: "SAFERUST",
      logo: "/symbols/saferust.png",
	    decimals: 8
    },
  },
  [MAINNET]: {
    [BNEO_SCRIPT_HASH[MAINNET]]: {
      contractHash: BNEO_SCRIPT_HASH[MAINNET],
      symbol: "bNEO",
      logo: "/symbols/bneo.jpeg",
	    decimals: 8
    },
    [GAS_SCRIPT_HASH]: {
      contractHash: GAS_SCRIPT_HASH,
      symbol: "GAS",
      logo: "/symbols/gas.svg",
	    decimals: 8
    },
	  [GM_SCRIPT_HASH[MAINNET]]: {
		  contractHash: GM_SCRIPT_HASH[MAINNET],
		  symbol: "GM",
		  logo: "/symbols/gm.png",
		  decimals: 8
	  },
	  [LRB_SCRIPT_HASH[MAINNET]]: {
		  contractHash: LRB_SCRIPT_HASH[MAINNET],
		  symbol: "LRB",
		  logo: "/symbols/lrb.png",
		  decimals: 8
	  },
	  [FLM_SCRIPT_HASH[MAINNET]]: {
		  contractHash: FLM_SCRIPT_HASH[MAINNET],
		  symbol: "FLM",
		  logo: "/symbols/flm.png",
		  decimals: 8
	  },
	  [NEP_SCRIPT_HASH[MAINNET]]: {
		  contractHash: NEP_SCRIPT_HASH[MAINNET],
		  symbol: "NEP",
		  logo: "/symbols/nep.png",
		  decimals: 8
	  },
    // [FTW_SCRIPT_HASH[MAINNET]]: {
    //   contractHash: FTW_SCRIPT_HASH[MAINNET],
    //   symbol: "FTW",
    //   logo: "/symbols/ftw.svg",
	  //   decimals: 8
    // },
    [NUDES_SCRIPT_HASH[MAINNET]]: {
      contractHash: NUDES_SCRIPT_HASH[MAINNET],
      symbol: "NUDES",
      logo: "/symbols/nudes.png",
	    decimals: 8
    },
    [TTM_SCRIPT_HASH[MAINNET]]: {
      contractHash: TTM_SCRIPT_HASH[MAINNET],
      symbol: "TTM",
      logo: "/symbols/ttm.png",
	    decimals: 8
    },
    "50b41a55c1d746eec2b86b8f0405fb49fbb96492": {
      contractHash: "50b41a55c1d746eec2b86b8f0405fb49fbb96492",
      symbol: "TEDS",
      logo: "/symbols/ted.jpg",
	    decimals: 8
    },
    [MAXI_SCRIPT_HASH[MAINNET]]: {
      contractHash: MAXI_SCRIPT_HASH[MAINNET],
      symbol: "MAXI",
      logo: "/symbols/maxi.png",
	    decimals: 8
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
