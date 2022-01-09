import { MAINNET, PRIVATENET, TESTNET } from "../packages/neo/consts";

export const HOME_PATH = "/";
export const FARM_PATH = "/gas";
export const GALLERY_PATH = "/NFT/gallery";
export const TOURNAMENT_PATH = "/arena";
export const SMITH_PATH = "/smith";
export const COLLECTION_PATH = "/NFT/collection";

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
    label: "GAS-FI",
    path: FARM_PATH,
    network: [PRIVATENET, TESTNET],
  },
];
