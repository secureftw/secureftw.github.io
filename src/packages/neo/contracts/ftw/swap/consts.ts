import { CONST } from "../../../index";
import { FTW_SCRIPT_HASH, NUDES_SCRIPT_HASH } from "../nep17";
import { GAS_SCRIPT_HASH, MAINNET, PRIVATENET, TESTNET } from "../../../consts";
import { INetworkType } from "../../../network";

export const SWAP_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "aeac82f7830f4083b98089baa51060e621febb10",
  // [CONST.TESTNET]: "26ba77bcc207b9a7549c0ca52fa4e6aa41760153",
  [CONST.TESTNET]: "e59f3df3cfae2af534222b5a522b040e4a2e7204",
  [CONST.MAINNET]: "",
};

// export const SWAP_PAIRS = [
// 	{
//
// 	}
//
// ];

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
    [NUDES_SCRIPT_HASH[TESTNET]]: {
      contractHash: NUDES_SCRIPT_HASH[TESTNET],
      symbol: "NUDES",
      logo: "/symbols/nudes.png",
    },
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
export const ASSETS = (network: INetworkType) => {
  const keys = Object.keys(ASSET_LIST[network]);
  return keys.map((key) => {
    return ASSET_LIST[network][key];
  });
};
