import { MAINNET, PRIVATENET, TESTNET } from "../packages/neo/consts";

export const HOME_PATH = "/";
export const MIGRATION_PATH = "/migration";
export const GASFI_PATH = "/gas";
export const GALLERY_PATH = "/NFT/gallery";
export const TOURNAMENT_PATH = "/arena";
export const IDO_PATH = "/ido";
export const SMITH_PATH = "/smith";
export const SMITH_CREATE_NEP17_PATH = "/smith/create/nep17";
export const SMITH_CREATE_NEP11_PATH = "/smith/create/nep11";
export const SMITH_CONTRACT_NEP17_PATH = "/smith/nep17/contract";
export const SMITH_CONTRACT_NEP11_PATH = "/smith/nep11/contract";
export const SMITH_PATH_NEP11 = "/smith/nep11";
export const COLLECTION_PATH = "/NFT/collection";
export const SWAP_PATH = "/swap";
export const SWAP_POOL_PATH = "/swap/pools";
export const SWAP_PATH_HISTORY = "/swap/history";
export const SWAP_PATH_LP_LIST = "/swap/providers";
export const SWAP_PATH_LIQUIDITY_ADD = "/swap/liquidity/add";
export const SWAP_PATH_LIQUIDITY_REMOVE = "/swap/liquidity/remove";
export const SWAP_PATH_TRADE = "/swap/trade";
export const FARM_PATH = "/farm";
export const FARM_STAKE_PATH = "/farm/stake";
export const FARM_STAKE_POSITIONS_PATH = "/farm/stake/positions";
export const FUSION_PATH = "/fusion";
export const DAO_PATH = "/dao";
export const DAO_CHANNEL_CREATE_PATH = "/dao/create";
export const DAO_CHANNEL_PATH = "/dao/channel";
// export const PROPOSALS_PATH = "/proposals";
// export const PROPOSALS_CREATE_PATH = "/proposals/new";
// export const PROPOSALS_ABOUT_PATH = "/proposals/about";

export const MENU = [
	{
		label: "IDO",
		path: IDO_PATH,
		network: [PRIVATENET, TESTNET],
	},
  {
    label: "Swap",
    path: SWAP_PATH,
    network: [PRIVATENET, TESTNET],
  },
  {
    label: "Farm",
    path: FARM_PATH,
    network: [PRIVATENET, TESTNET],
  },
  {
    label: "Smith",
    path: SMITH_PATH,
    network: [PRIVATENET, TESTNET, MAINNET],
  },
  {
    label: "DAO",
    path: DAO_PATH,
    network: [PRIVATENET, TESTNET],
  },
  {
    label: "NFT",
    path: GALLERY_PATH,
    network: [PRIVATENET, TESTNET, MAINNET],
    category: [
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
    ],
  },
	{
		label: "Fusion",
		path: FUSION_PATH,
		network: [PRIVATENET],
	},
  {
    label: "GAS-FI",
    path: GASFI_PATH,
    network: [PRIVATENET],
  },
  {
    label: "Migration",
    path: MIGRATION_PATH,
    network: [PRIVATENET],
  },
];
