import { CONST, wallet } from "../../../index";
import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { parseProperties } from "../../ttm/nft/helpers";
import { tx, u, wallet as NeonWallet } from "@cityofzion/neon-core";
import {  GAS_SCRIPT_HASH } from "../../../consts";
import { RUNE_SCRIPT_HASH } from "../nft";
import { TTM_SCRIPT_HASH } from "../../ttm/nft";

export const FUSE_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "f88481099b58a7ddff6693098037b23476a9dcee",
  [CONST.TESTNET]: "f88481099b58a7ddff6693098037b23476a9dcee",
  [CONST.MAINNET]: "76bf3b30bf85ad21f8650cf54963b872072b8bc0",
};

export class FusionContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = FUSE_SCRIPT_HASH[networkType];
  }

  fuse = async (
    connectedWallet: IConnectedWallet,
    cryptonautTokenId: string,
    runeTokenId: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "fuse",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "String",
          value: cryptonautTokenId,
        },
        {
          type: "String",
          value: runeTokenId,
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [
            this.contractHash,
            RUNE_SCRIPT_HASH[this.network],
            TTM_SCRIPT_HASH[this.network],
            GAS_SCRIPT_HASH,
          ],
        },
      ],
    };
    return wallet.WalletAPI.invoke(
	    connectedWallet,
      this.network,
      invokeScript,
    );
  };

  refund = async (
    connectedWallet: IConnectedWallet,
    tokenId: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "refund",
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
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [
            this.contractHash,
            RUNE_SCRIPT_HASH[this.network],
            TTM_SCRIPT_HASH[this.network],
            GAS_SCRIPT_HASH,
          ],
        },
      ],
    };
    return wallet.WalletAPI.invoke(
			connectedWallet,
      this.network,
      invokeScript,
    );
  };

  getProperties = async (tokenId: string): Promise<object> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "properties",
      args: [
        {
          type: "String",
          value: tokenId,
        },
      ],
    };

    const res = await Network.read(this.network, [script]);
    return parseProperties(res.stack[0]);
  };

  getTokensOf = async (ownerAddress: string): Promise<object[]> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "tokensOf",
      args: [
        {
          type: "Address",
          value: ownerAddress,
        },
      ],
    };
    const res = await Network.read(this.network, [script]);
    const metaList: object[] = [];
    // @ts-ignore
    for await (const item of res.stack[0].iterator) {
      const tokenId = u.HexString.fromBase64(item.value as string).toAscii();
      const meta = await this.getProperties(tokenId);
      // @ts-ignore
      metaList.push({ tokenId, ...meta });
    }
    return metaList;
  };
}
