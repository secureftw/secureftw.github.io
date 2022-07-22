import {INetworkType} from "../../../network";
import {SWAP_SCRIPT_HASH} from "../swap/consts";
import {IConnectedWallet} from "../../../wallet/interfaces";
import {tx, u, wallet as NeonWallet} from "@cityofzion/neon-core";
import {defaultDeadLine} from "../swap/helpers";
import {wallet} from "../../../index";

export class SwapContract {
	network: INetworkType;
	contractHash: string;

	constructor(networkType: INetworkType) {
		this.network = networkType;
		this.contractHash = SWAP_SCRIPT_HASH[networkType];
	}

	provide = async (
		connectedWallet: IConnectedWallet,
		tokenA: string,
		tokenADecimals: number,
		amountA: number,
		tokenB: string,
		tokenBDecimals: number,
		amountB: number,
		lockUntil: number,
		slippage: number
	): Promise<string> => {
		const senderHash = NeonWallet.getScriptHashFromAddress(
			connectedWallet.account.address
		);
		const invokeScript = {
			operation: "addLiquidity",
			scriptHash: this.contractHash,
			args: [
				{
					type: "Hash160",
					value: senderHash,
				},
				{
					type: "Hash160",
					value: tokenA,
				},
				{
					type: "Integer",
					value: u.BigInteger.fromDecimal(amountA, tokenADecimals).toString(),
				},
				{
					type: "Hash160",
					value: tokenB,
				},
				{
					type: "Integer",
					value: u.BigInteger.fromDecimal(amountB, tokenBDecimals).toString(),
				},
				{
					type: "Integer",
					value: defaultDeadLine(),
				},
				{
					type: "Integer",
					value: lockUntil,
				},
				{
					type: "Integer",
					value: slippage,
				},
			],
			signers: [
				{
					account: senderHash,
					scopes: tx.WitnessScope.CustomContracts,
					allowedContracts: [this.contractHash, tokenA, tokenB],
				},
			],
			// signers: [
			//   {
			//     account: senderHash,
			//     scopes: tx.WitnessScope.WitnessRules,
			//     rules: [
			//       {
			//         action: WitnessRuleAction.Allow,
			//         condition: {
			// 	        type: WitnessConditionType.And,
			// 	        hash: this.contractHash,
			//         }
			//       }
			//     ]
			//   },
			// ],
		};
		return wallet.WalletAPI.invoke(connectedWallet, this.network, invokeScript);
	};

}
