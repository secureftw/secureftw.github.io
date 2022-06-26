import { CONST as NEON_CONST, tx } from "@cityofzion/neon-core";
import { IWalletType } from "../wallet/interfaces";

/* Wallets */
export const O3 = "O3";
export const NEON = "NEON";
export const NEO_LINE = "NEO_LINE";
export const DEV = "DEV";
export const ONE_GATE = "ONE_GATE";
export const WALLET_LIST: {
  label: string;
  key: IWalletType;
}[] = [
  {
    label: "NEO Line",
    key: NEO_LINE,
  },
  {
    label: "Neon wallet",
    key: NEON,
  },
  {
    label: "OneGate",
    key: ONE_GATE,
  },
  {
    label: "O3",
    key: O3,
  },
];

/* Network types */
export const PRIVATENET = "N3PrivateNet";
export const TESTNET = "N3TestNet";
export const MAINNET = "N3MainNet";

/* Network configs */
export const PRIVATE_CONFIG = {
  label: "privateNet",
  url: "http://127.0.0.1:50012",
};

export const TESTNET_CONFIG = {
  label: "N3TestNet",
  // url: "https://testnet1.neo.coz.io:443",
  url: "https://testnet2.neo.coz.io:443",
};

// Using for tx monitor
export const TESTNET_CONFIG_2 = {
  label: "N3TestNet",
  url: "https://testnet1.neo.coz.io:443",
};

export const MAINNET_CONFIG = {
  label: "N3MainNet",
  url: "https://n3seed2.ngd.network:10332",
};

export const MAINNET_CONFIG_2 = {
  label: "N3MainNet",
  url: "https://mainnet1.neo.coz.io:443",
};

/* Contract hashes */
export const GAS_SCRIPT_HASH = NEON_CONST.NATIVE_CONTRACT_HASH.GasToken;
export const NEO_SCRIPT_HASH = NEON_CONST.NATIVE_CONTRACT_HASH.NeoToken;

/* Dev wallet */
export const DEV_WALLET_PRIVATE_KEY =
  "7b5d7fda53932ed9d43eb848dd521455767a4d40b5a994e6f351605e5a4ce26a";

export const DEFAULT_WITNESS_SCOPE = (senderHash: string) => {
  return {
    account: senderHash,
    scopes: tx.WitnessScope.CalledByEntry,
  };
};

export const UNKNOWN_TOKEN_IMAGE = "/symbols/unknown.png";

export const BNEO_SCRIPT_HASH = {
  [PRIVATENET]: "48c40d4666f93408be1bef038b6722404d9a4c2a",
  [TESTNET]: "48c40d4666f93408be1bef038b6722404d9a4c2a",
  [MAINNET]: "48c40d4666f93408be1bef038b6722404d9a4c2a",
};
export const FTW_SCRIPT_HASH = {
  [PRIVATENET]: "c1a56650f12420405c5b7e2634eb3779a0c3e396",
  [TESTNET]: "c1a56650f12420405c5b7e2634eb3779a0c3e396",
  [MAINNET]: "9f8b20c31bb9e45003f2d9f316d2caf1dcd1bf20",
};
export const TTM_SCRIPT_HASH = {
  [PRIVATENET]: "",
  [TESTNET]: "c0283310a5117b9d007941e8a0dc3dae9593f65c",
  [MAINNET]: "c0283310a5117b9d007941e8a0dc3dae9593f65c",
};
export const NUDES_SCRIPT_HASH = {
  [PRIVATENET]: "340720c7107ef5721e44ed2ea8e314cce5c130fa",
  [TESTNET]: "340720c7107ef5721e44ed2ea8e314cce5c130fa",
  [MAINNET]: "340720c7107ef5721e44ed2ea8e314cce5c130fa",
};
export const MAXI_SCRIPT_HASH = {
  [PRIVATENET]: "5afb6804ee3598a58f8a0994b1df99d8be43a313",
  [TESTNET]: "5afb6804ee3598a58f8a0994b1df99d8be43a313",
  [MAINNET]: "5afb6804ee3598a58f8a0994b1df99d8be43a313",
};
export const LRB_SCRIPT_HASH = {
  [PRIVATENET]: "569ab5968f695a13947a2393b3297d520d951243",
  [TESTNET]: "569ab5968f695a13947a2393b3297d520d951243",
  [MAINNET]: "8c07b4c9f5bc170a3922eac4f5bb7ef17b0acc8b",
};
export const FLM_SCRIPT_HASH = {
  [PRIVATENET]: "1415ab3b409a95555b77bc4ab6a7d9d7be0eddbd",
  [TESTNET]: "1415ab3b409a95555b77bc4ab6a7d9d7be0eddbd",
  [MAINNET]: "f0151f528127558851b39c2cd8aa47da7418ab28",
};
export const GM_SCRIPT_HASH = {
  [PRIVATENET]: "047dbe376096643d7a93609388cde7f84ec28c52",
  [TESTNET]: "047dbe376096643d7a93609388cde7f84ec28c52",
  [MAINNET]: "9b049f1283515eef1d3f6ac610e1595ed25ca3e9",
};
export const TED_SCRIPT_HASH = {
  [PRIVATENET]: "50b41a55c1d746eec2b86b8f0405fb49fbb96492",
  [TESTNET]: "50b41a55c1d746eec2b86b8f0405fb49fbb96492",
  [MAINNET]: "50b41a55c1d746eec2b86b8f0405fb49fbb96492",
};
export const N3F_SCRIPT_HASH = {
  [PRIVATENET]: "979b839648d215fe895d559019dedde31fcf45a9",
  [TESTNET]: "979b839648d215fe895d559019dedde31fcf45a9",
  [MAINNET]: "979b839648d215fe895d559019dedde31fcf45a9",
};
export const FRANK_SCRIPT_HASH = {
  [PRIVATENET]: "7e7a84abff782e9f0c60c2fe1cd6b550a32d5cee",
  [TESTNET]: "7e7a84abff782e9f0c60c2fe1cd6b550a32d5cee",
  [MAINNET]: "a06cfd7ae9dd7befb7bf8e5b8c5902c969182de0",
};
