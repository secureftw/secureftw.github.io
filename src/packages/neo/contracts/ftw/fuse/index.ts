import { CONST, wallet } from "../../../index";
import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { parseProperties } from "../../ttm/nft/helpers";
import { u } from "@cityofzion/neon-core";

export const FUSE_SCRIPT_HASH = {
  [CONST.PRIVATENET]: "f88481099b58a7ddff6693098037b23476a9dcee",
  [CONST.TESTNET]: "f88481099b58a7ddff6693098037b23476a9dcee",
  [CONST.MAINNET]: "",
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
    const invokeScript = {
      operation: "fuse",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Address",
          value: connectedWallet.account.address,
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
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript,
      undefined,
      undefined,
      true
    );
  };

  refund = async (
    connectedWallet: IConnectedWallet,
    tokenId: string,
  ): Promise<string> => {
    const invokeScript = {
      operation: "refund",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Address",
          value: connectedWallet.account.address,
        },
        {
          type: "String",
          value: tokenId,
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript,
      undefined,
      undefined,
      true
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
