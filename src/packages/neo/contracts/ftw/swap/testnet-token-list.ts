import {BNEO_SCRIPT_HASH, GAS_SCRIPT_HASH, HOOD_SCRIPT_HASH, NEP_SCRIPT_HASH} from "../../../consts/nep17-list";
import {UNKNOWN_TOKEN_IMAGE} from "../../../consts";
export const TESTNET_TOKEN_LIST = {
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
	[HOOD_SCRIPT_HASH]: {
		contractHash: HOOD_SCRIPT_HASH,
		symbol: "HOOD",
		logo: UNKNOWN_TOKEN_IMAGE,
		decimals: 8,
	},
}
