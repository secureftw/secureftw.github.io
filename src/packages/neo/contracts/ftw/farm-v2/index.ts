import { INetworkType, Network } from "../../../network";
import { SWAP_SCRIPT_HASH } from "../swap/consts";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { tx, wallet as NeonWallet } from "@cityofzion/neon-core";
import { wallet } from "../../../index";
import { DEFAULT_WITNESS_SCOPE } from "../../../consts";
import {IClaimableRewards, ILPTokens, IPool} from "./interfaces";
import {
  parseClaimableMap,
  parseStakedLPTokensMap,
} from "./helpers";
import {FARM_V2_SCRIPT_HASH} from "./consts";
import {parseMapValue} from "../../../utils";

export class FarmV2Contract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = FARM_V2_SCRIPT_HASH[networkType];
  }

  stake = async (
    connectedWallet: IConnectedWallet,
    tokenId: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "transfer",
      scriptHash: SWAP_SCRIPT_HASH[this.network],
      args: [
        {
          type: "Hash160",
          value: this.contractHash,
        },
        {
          type: "String",
          value: tokenId,
        },
	      {
		      type: "String",
		      value: "1",
	      },
      ],
	    signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return wallet.WalletAPI.invoke(connectedWallet, this.network, invokeScript);
  };

  remove = async (
    connectedWallet: IConnectedWallet,
    tokenId: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "unStake",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "String",
          value: tokenId,
        },
      ],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return wallet.WalletAPI.invoke(connectedWallet, this.network, invokeScript);
  };

  claim = async (
    connectedWallet: IConnectedWallet,
    tokenA: string,
    tokenB: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "claim",
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
          type: "Hash160",
          value: tokenB,
        },
      ],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return wallet.WalletAPI.invoke(connectedWallet, this.network, invokeScript);
  };

  claimMulti = async (
    connectedWallet: IConnectedWallet,
    batch: IClaimableRewards[]
  ) => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "claimMulti",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Array",
          value: batch.map((item) => {
            return {
              type: "Array",
              value: [
                {
                  type: "Hash160",
                  value: item.tokenA,
                },
                {
                  type: "Hash160",
                  value: item.tokenB,
                },
              ],
            };
          }),
        },
      ],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return wallet.WalletAPI.invoke(connectedWallet, this.network, invokeScript);
  };

  getPools = async (): Promise<IPool[]> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getPools",
      args: [],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
		// @ts-ignore
	  return res.stack[0].value.map((pair) => {
		  return parseMapValue(pair);
	  });
  };

  getStakedLPTokens = async (
    connectedWallet: IConnectedWallet
  ): Promise<ILPTokens[]> => {
    const scripts = [
      {
        scriptHash: this.contractHash,
        operation: "getLPTokens",
        args: [{ type: "Address", value: connectedWallet.account.address }],
      },
    ];
    const res = await Network.read(this.network, scripts);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseStakedLPTokensMap(res as any);
  };

  getClaimable = async (
    connectedWallet?: IConnectedWallet
  ): Promise<IClaimableRewards[]> => {
    if (!connectedWallet) {
      return [];
    } else {
      const scripts = [
        {
          scriptHash: this.contractHash,
          operation: "getClaimable",
          args: [{ type: "Address", value: connectedWallet.account.address }],
        },
      ];
      const res = await Network.read(this.network, scripts);
      if (res.state !== "FAULT") {
        return parseClaimableMap(res as any);
      } else {
        console.error(res.exception);
        return [];
      }
    }
  };

  getMarketStatus = async (): Promise<boolean> => {
    const scripts = [
      {
        scriptHash: this.contractHash,
        operation: "getMarketStatus",
        args: [],
      },
    ];
    const res = await Network.read(this.network, scripts);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return res.stack[0].value as boolean;
  };
}
