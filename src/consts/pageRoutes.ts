import { MAINNET, PRIVATENET, TESTNET } from "../packages/neo/consts";

export const HOME_PATH = "/";
export const MIGRATION_PATH = "/migration";
export const FARM_PATH = "/gas";
export const GALLERY_PATH = "/NFT/gallery";
export const TOURNAMENT_PATH = "/arena";
export const SMITH_PATH = "/smith";
export const SMITH_PATH_NEP11 = "/smith/nep11";
export const COLLECTION_PATH = "/NFT/collection";
export const SWAP_PATH = "/swap";
export const SWAP_PATH_LIQUIDITY = "/swap/liquidity";
export const SWAP_PATH_FARM = "/swap/claim";
export const SWAP_PATH_HISTORY = "/swap/claim/history";
export const FUSION_PATH = "/fusion";

export const MENU = [
  {
    label: "Rune",
    path: GALLERY_PATH,
    network: [PRIVATENET, TESTNET, MAINNET],
  },
  {
    label: "Arena",
    path: TOURNAMENT_PATH,
    network: [PRIVATENET, TESTNET, MAINNET],
  },
  {
    label: "Smith",
    path: SMITH_PATH,
    network: [PRIVATENET, TESTNET, MAINNET],
  },
  {
    label: "Swap",
    path: SWAP_PATH,
    network: [PRIVATENET, TESTNET],
  },
  {
    label: "GAS-FI",
    path: FARM_PATH,
    network: [PRIVATENET, TESTNET],
  },
  {
    label: "Fusion",
    path: FUSION_PATH,
    network: [PRIVATENET],
  },
  {
    label: "Migration",
    path: MIGRATION_PATH,
    network: [PRIVATENET, TESTNET, MAINNET],
  },
];
