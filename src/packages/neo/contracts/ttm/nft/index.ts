import { u } from "@cityofzion/neon-core";
import { INetworkType, Network } from "../../../network";
import { parseProperties } from "./helpers";
import { TTM_SCRIPT_HASH } from "./consts";
const CRYPTONAUT_REGEX = /^C0/;
export class TTMNFTContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = TTM_SCRIPT_HASH[networkType];
  }

  static owner = TTM_SCRIPT_HASH;

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
    const properties = parseProperties(res.stack[0]);
    return properties;
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
      if (CRYPTONAUT_REGEX.test(tokenId)) {
        const meta = await this.getProperties(tokenId);
        // @ts-ignore
        metaList.push({ tokenId, ...meta });
      }
    }
    return metaList;
  };
}
export { TTM_SCRIPT_HASH } from "./consts";
