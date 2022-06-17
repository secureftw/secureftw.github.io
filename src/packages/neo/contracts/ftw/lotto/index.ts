import { INetworkType } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { tx, u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { wallet } from "../../../index";
import {
  GAS_SCRIPT_HASH,
} from "../../../consts";
import { LOTTO_SCRIPT_HASH } from "./consts";

export class LottoContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = LOTTO_SCRIPT_HASH[networkType];
  }

  buy = async (
    connectedWallet: IConnectedWallet,
  ): Promise<string> => {
	  const senderHash = NeonWallet.getScriptHashFromAddress(
		  connectedWallet.account.address
	  );
	  const invokeScript = {
		  operation: "buyTicket",
		  scriptHash: this.contractHash,
		  args: [
		  ],
		  signers: [
			  {
				  account: senderHash,
				  scopes: tx.WitnessScope.CustomContracts,
				  allowedContracts: ["6e644dda08a62f3fc9d14e824d1a3bd816a0c2d5", GAS_SCRIPT_HASH, this.contractHash],
			  },
		  ],
	  };
	  return wallet.WalletAPI.invoke(connectedWallet, this.network, invokeScript);
    // const senderHash = NeonWallet.getScriptHashFromAddress(
    //   connectedWallet.account.address
    // );
    // const invokeScript = {
    //   operation: "buyTicket",
    //   scriptHash: this.contractHash,
    //   args: [
    //     {
    //       type: "Integer",
    //       value: "906136660674217664395602009534968853908592327693",
    //     },
    //   ],
    //   signers: [
    //     {
    //       account: senderHash,
    //       scopes: tx.WitnessScope.CustomContracts,
    //       allowedContracts: ["6e644dda08a62f3fc9d14e824d1a3bd816a0c2d5", GAS_SCRIPT_HASH, this.contractHash],
    //     },
	  //     {
		//       account: this.contractHash,
		//       scopes: tx.WitnessScope.CustomContracts,
		//       allowedContracts: ["6e644dda08a62f3fc9d14e824d1a3bd816a0c2d5", GAS_SCRIPT_HASH, this.contractHash],
	  //     },
    //   ],
    // };
    // return wallet.WalletAPI.invoke(connectedWallet, this.network, invokeScript);
  };
}
