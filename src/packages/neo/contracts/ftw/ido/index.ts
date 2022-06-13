import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { wallet } from "../../../index";
import {
	BNEO_SCRIPT_HASH,
	DEFAULT_WITNESS_SCOPE, FLM_SCRIPT_HASH,
	GAS_SCRIPT_HASH, GM_SCRIPT_HASH, LRB_SCRIPT_HASH,
	MAINNET,
	NEO_SCRIPT_HASH,
} from "../../../consts";
import { FARM_SCRIPT_HASH } from "../staking/consts";
import { IIDOStatus } from "./interface";
import { IDO_SCRIPT_HASH } from "./consts";

export class IDOContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = IDO_SCRIPT_HASH[networkType];
  }

  buy = async (
    connectedWallet: IConnectedWallet,
    contractHash: string,
    decimals: number,
    amount: number
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "transfer",
      scriptHash: contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Hash160",
          value: this.contractHash,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(amount, decimals).toString(),
        },
        {
          type: "String",
          value: "1",
        },
      ],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript,
      undefined,
      undefined
    );
  };

  getIDOStatus = async (
    connectedWallet?: IConnectedWallet
  ): Promise<IIDOStatus> => {
    if (this.network === MAINNET) {
      return {
        available: 50_000_000_00000000,
        launchDate: 0,
        balances: {
          [NEO_SCRIPT_HASH]: 0,
          [GAS_SCRIPT_HASH]: 0,
          [BNEO_SCRIPT_HASH[this.network]]: 0,
          [FLM_SCRIPT_HASH[this.network]]: 0,
          [GM_SCRIPT_HASH[this.network]]: 0,
          [LRB_SCRIPT_HASH[this.network]]: 0,
        },
      };
    }

    const script1 = {
      scriptHash: FARM_SCRIPT_HASH[this.network],
      operation: "balanceOf",
      args: [
        {
          type: "Hash160",
          value: this.contractHash,
        },
      ],
    };
    const script2 = {
      scriptHash: this.contractHash,
      operation: "getLaunchDate",
      args: [],
    };

    const scripts = [script1, script2];

    if (connectedWallet) {
      const senderHash = NeonWallet.getScriptHashFromAddress(
        connectedWallet.account.address
      );
	    const script3 = {
		    scriptHash: NEO_SCRIPT_HASH,
		    operation: "balanceOf",
		    args: [
			    {
				    type: "Hash160",
				    value: senderHash,
			    },
		    ],
	    };
      const script4 = {
        scriptHash: GAS_SCRIPT_HASH,
        operation: "balanceOf",
        args: [
          {
            type: "Hash160",
            value: senderHash,
          },
        ],
      };
      const script5 = {
        scriptHash: BNEO_SCRIPT_HASH[this.network],
        operation: "balanceOf",
        args: [
          {
            type: "Hash160",
            value: senderHash,
          },
        ],
      };
      const script6 = {
        scriptHash: FLM_SCRIPT_HASH[this.network],
        operation: "balanceOf",
        args: [
          {
            type: "Hash160",
            value: senderHash,
          },
        ],
      };
      const script7 = {
        scriptHash: GM_SCRIPT_HASH[this.network],
        operation: "balanceOf",
        args: [
          {
            type: "Hash160",
            value: senderHash,
          },
        ],
      };
      const script8 = {
        scriptHash: LRB_SCRIPT_HASH[this.network],
        operation: "balanceOf",
        args: [
          {
            type: "Hash160",
            value: senderHash,
          },
        ],
      };
      scripts.push(script3);
      scripts.push(script4);
      scripts.push(script5);
      scripts.push(script6);
      scripts.push(script7);
      scripts.push(script8);
    }

    const res = await Network.read(this.network, scripts);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return {
      available: parseFloat(res.stack[0].value as string),
      launchDate: parseFloat(res.stack[1].value as string),
      balances: {
        [NEO_SCRIPT_HASH]: connectedWallet
          ? parseFloat(res.stack[2].value as string)
          : 0,
        [GAS_SCRIPT_HASH]: connectedWallet
          ? parseFloat(res.stack[3].value as string)
          : 0,
        [BNEO_SCRIPT_HASH[this.network]]: connectedWallet
          ? parseFloat(res.stack[4].value as string)
          : 0,
        [FLM_SCRIPT_HASH[this.network]]: connectedWallet
          ? parseFloat(res.stack[5].value as string)
          : 0,
        [GM_SCRIPT_HASH[this.network]]: connectedWallet
          ? parseFloat(res.stack[6].value as string)
          : 0,
        [LRB_SCRIPT_HASH[this.network]]: connectedWallet
          ? parseFloat(res.stack[7].value as string)
          : 0,
      },
    };
  };
}
