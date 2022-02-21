import { sc, u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { DEFAULT_WITNESS_SCOPE, GAS_SCRIPT_HASH } from "../../../consts";
import { INetworkType, Network } from "../../../network";
import { RUNE_SCRIPT_HASH, RUNE_PRICE } from "./consts";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { IRuneMeta } from "./interfaces";
import { parseProperties } from "./helpers";

export class NFTContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = RUNE_SCRIPT_HASH[networkType];
  }

  mint = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "transfer",
      scriptHash: GAS_SCRIPT_HASH,
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
          value: u.BigInteger.fromDecimal(
            RUNE_PRICE[this.network],
            8
          ).toString(),
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
      "0.01"
    );
  };

  withdrawFund = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "withdrawFund",
      scriptHash: this.contractHash,
      args: [],
	    signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript
    );
  };

  getTotalSupplyScript = (): sc.ContractCallJson => {
    return {
      scriptHash: this.contractHash,
      operation: "totalSupply",
      args: [],
    };
  };

  getPropertiesScript = (tokenId: string) => {
    return {
      scriptHash: this.contractHash,
      operation: "properties",
      args: [
        {
          type: "String",
          value: tokenId,
        },
      ],
    };
  };

  getProperties = async (tokenId: string): Promise<IRuneMeta> => {
    const script = this.getPropertiesScript(tokenId);
    const res = await Network.read(this.network, [script]);
    // @ts-ignore
    return parseProperties(res.stack);
  };

  getTokensOfScript = (ownerAddress: string) => {
    return {
      scriptHash: this.contractHash,
      operation: "tokensOf",
      args: [
        {
          type: "Address",
          value: ownerAddress,
        },
      ],
    };
  };

  getTokensOf = async (ownerAddress: string): Promise<object[]> => {
    const script = this.getTokensOfScript(ownerAddress);
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

  getTokens = async (): Promise<string[]> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "tokens",
      args: [],
    };
    const res = await Network.read(this.network, [script]);
    // @ts-ignore
    return res.stack[0].iterator.map((item) => {
      return u.HexString.fromBase64(item.value as string).toAscii();
    });
  };
}
export { RUNE_SCRIPT_HASH } from "./consts";
