import { CONST } from "../../../index";

export const RUNE_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "3863225be4e0e3ea1874a32842fab0a3dc2fbfe3",
  [CONST.TESTNET]: "9f30d01b85887d0927c01640d5789d908e7c315a",
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
