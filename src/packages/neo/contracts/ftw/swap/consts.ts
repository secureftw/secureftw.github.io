import {
	BNEO_SCRIPT_HASH,
	FLM_SCRIPT_HASH,
	FRANK_SCRIPT_HASH,
	FTW_SCRIPT_HASH,
	GAS_SCRIPT_HASH,
	GM_SCRIPT_HASH,
	HOOD_SCRIPT_HASH,
	MAINNET,
	MAXI_SCRIPT_HASH,
	N3F_SCRIPT_HASH,
	NUDES_SCRIPT_HASH,
	PRIVATENET,
	TED_SCRIPT_HASH,
	TESTNET,
	TTM_SCRIPT_HASH,
	UNKNOWN_TOKEN_IMAGE, USDT_SCRIPT_HASH,
} from "../../../consts";

import { INetworkType } from "../../../network";
import { NEP_SCRIPT_HASH } from "../nep-token/consts";

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
  [TESTNET]: {
    [BNEO_SCRIPT_HASH]: {
      contractHash: BNEO_SCRIPT_HASH,
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
	  [NEP_SCRIPT_HASH]: {
      contractHash: NEP_SCRIPT_HASH,
      symbol: "NEP",
      logo: "/symbols/nep.png",
      decimals: 8,
    },
    [HOOD_SCRIPT_HASH[TESTNET]]: {
      contractHash: HOOD_SCRIPT_HASH[TESTNET],
      symbol: "HOOD",
      logo: UNKNOWN_TOKEN_IMAGE,
      decimals: 8,
    },
  },
  [MAINNET]: {
    [NEP_SCRIPT_HASH]: {
      contractHash: NEP_SCRIPT_HASH,
      symbol: "NEP",
      logo: "/symbols/nep.png",
      decimals: 8,
    },
    [GAS_SCRIPT_HASH]: {
      contractHash: GAS_SCRIPT_HASH,
      symbol: "GAS",
      logo: "/symbols/gas.svg",
      decimals: 8,
    },
    [BNEO_SCRIPT_HASH]: {
      contractHash: BNEO_SCRIPT_HASH,
      symbol: "bNEO",
      logo: "/symbols/bneo.jpeg",
      decimals: 8,
    },
	  [USDT_SCRIPT_HASH]: {
		  contractHash: USDT_SCRIPT_HASH,
		  symbol: "fUSDT",
		  logo: "/symbols/usdt.png",
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
    [FRANK_SCRIPT_HASH[MAINNET]]: {
      contractHash: FRANK_SCRIPT_HASH[MAINNET],
      symbol: "frank",
      logo: "/symbols/frank.png",
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
