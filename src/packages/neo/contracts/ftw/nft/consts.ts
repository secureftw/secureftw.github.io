import { CONST } from "../../../index";

export const NFT_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "80a8027c99a174b6de0160af044587f31979a75e",
  [CONST.TESTNET]: "3863225be4e0e3ea1874a32842fab0a3dc2fbfe3",
  [CONST.MAINNET]: "bebd4eb7c09ca5b59004aa8b58c9bfc81270e5d6",
};

export const RUNE_PRICE = {
  [CONST.PRIVATENET]: "10",
  [CONST.TESTNET]: "0.1", // Testnet mint is cheaper than mainnet
  [CONST.MAINNET]: "10",
};

export const RUNE_PHASE_FILTER = [
  "All",
  "Fire",
  "Water",
  "Wood",
  "Earth",
  "Metal",
  "Dark",
  "Light",
];
