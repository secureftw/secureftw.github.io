import { sc, u } from "@cityofzion/neon-core";
import { GAS_SCRIPT_HASH } from "../../../consts";
import { INetworkType, Network } from "../../../network";
import { NFT_SCRIPT_HASH } from "./consts";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { IRuneMeta } from "./interfaces";
import { parseProperties } from "./helpers";

export class NFTContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = NFT_SCRIPT_HASH[networkType];
  }

  mint = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: GAS_SCRIPT_HASH,
      args: [
        {
          type: "Address",
          value: connectedWallet.account.address,
        },
        {
          type: "Hash160",
          value: this.contractHash,
        },
        {
          type: "Integer",
          value: 1000000000,
        },
        {
          type: "String",
          value: "1",
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript,
      "0.01"
    );
  };

  withdrawFund = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const invokeScript = {
      operation: "withdrawFund",
      scriptHash: this.contractHash,
      args: [],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  deploy = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const invokeScript = {
      operation: "deploy",
      scriptHash: "fffdc93764dbaddd97c48f252a53ea4643faa3fd",
      args: [
        {
          type: "ByteArray",
          value:
            "TkVGM05lby5Db21waWxlci5DU2hhcnAgMy4wLjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH9o/pDRupTKiWPxJfdrdtkN8n9/wtnZXRDb250cmFjdAEAAQ8AAP1mBFcAAQwGc3ltYm9sQZv2Z85Bkl3oMSFAIUBBkl3oMUBBm/ZnzkBXAAF4NQYAAABAVwABeDUGAAAAQFcAAXg1BgAAAEBXAAFAVwABGEAMAQDbMEGb9mfOQZJd6DFK2CYERRDbIUBK2CYERRDbIUBBkl3oMUBXAgEheHBoC5cnDQAAABHbICMRAAAAIXhK2ShQygAUs6uqIScoAAAADCBUaGUgYXJndW1lbnQgIm93bmVyIiBpcyBpbnZhbGlkLjohQZv2Z84REYhOEFHQUBLAcWl4SxHOUItQEM5Bkl3oMUrYJgRFENshIwUAAABAStkoUMoAFLOrQBGIThBR0FASwEBLEc5Qi1AQzkGSXegxQFcDASFBm/ZnznAMAQDbMHFpaEGSXegxStgmBEUQ2yFyanieSnJFamloQeY/GIRAQeY/GIRAVwICIUGb9mfOERGIThBR0FASwHBoeEsRzlCLUBDOQZJd6DFK2CYERRDbIXFpeZ5KcUVpELUnDQAAABDbICM9AAAAIWkQsycZAAAAaHhLEc5Qi1AQzkEvWMXtIxcAAAAhaHhpEk0RzlGLURDOQeY/GIQhEdsgIwUAAABASxHOUItQEM5BL1jF7UASTRHOUYtREM5B5j8YhEBXAgQheHBoC5cnDQAAABHbICMRAAAAIXhK2ShQygAUs6uqIScnAAAADB9UaGUgYXJndW1lbnQgImZyb20iIGlzIGludmFsaWQuOiF5cWkLlycNAAAAEdsgIxEAAAAheUrZKFDKABSzq6ohJyUAAAAMHVRoZSBhcmd1bWVudCAidG8iIGlzIGludmFsaWQuOiF6ELUnLQAAAAwlVGhlIGFtb3VudCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyLjoheEH4J+yMqicNAAAAENsgI0EAAAAhehCYJyYAAAAhept4NYb+//+qJw0AAAAQ2yAjIQAAACF6eTVw/v//RSEhe3p5eDUUAAAAEdsgIwUAAABAQfgn7IxAVwIEIcJKeM9Kec9Kes8MCFRyYW5zZmVyQZUBb2F5cGgLl6olDQAAABDbICMPAAAAIXk3AABxaQuXqiEnIgAAAHt6eBPAHwwOb25ORVAxN1BheW1lbnR5QWJ9W1JFIUA3AABAQWJ9W1JAVwACIXmZELUnDgAAAAwGYW1vdW50OiF5ELMnCgAAACMdAAAAIXl4NcD9//9FeTWE/f//C3l4CzVg////QFcAAiF5mRC1Jw4AAAAMBmFtb3VudDoheRCzJwoAAAAjMQAAACF5m3g1gv3//6onEQAAAAwJZXhjZXB0aW9uOiF5mzUz/f//C3kLeDUP////QAwEbmFtZUGb9mfOQZJd6DEhQAwFb3duZXJBm/ZnzkGSXegxIUBXAgEheBDOcHgRznFpaDU/////Qdv+qHQjBQAAAEBB2/6odEBXAAMhQFYBCg38//8Kwfv//xLAYEDCSljPSjXY+///I677///CSljPSjXJ+///I+b7//9Y1sNm",
        },
        {
          type: "String",
          value:
            '{"name":"FTWSmith","groups":[],"features":{},"supportedstandards":["NEP-17"],"abi":{"methods":[{"name":"symbol","offset":1096,"safe":true,"returntype":"String","parameters":[]},{"name":"decimals","offset":1111,"safe":true,"returntype":"Integer","parameters":[]},{"name":"totalSupply","offset":76,"safe":true,"returntype":"Integer","parameters":[]},{"name":"balanceOf","offset":115,"safe":true,"returntype":"Integer","parameters":[{"name":"owner","type":"Hash160"}]},{"name":"transfer","offset":475,"safe":false,"returntype":"Boolean","parameters":[{"name":"from","type":"Hash160"},{"name":"to","type":"Hash160"},{"name":"amount","type":"Integer"},{"name":"data","type":"Any"}]},{"name":"name","offset":1002,"safe":true,"returntype":"String","parameters":[]},{"name":"owner","offset":1020,"safe":true,"returntype":"String","parameters":[]},{"name":"_deploy","offset":1039,"safe":false,"returntype":"Hash160","parameters":[{"name":"data","type":"Array"}]},{"name":"onNEP17Payment","offset":1075,"safe":false,"returntype":"Void","parameters":[{"name":"from","type":"Hash160"},{"name":"amount","type":"Integer"},{"name":"data","type":"Any"}]},{"name":"_initialize","offset":1080,"safe":false,"returntype":"Void","parameters":[]}],"events":[{"name":"Transfer","parameters":[{"name":"from","type":"Hash160"},{"name":"to","type":"Hash160"},{"name":"amount","type":"Integer"}]}]},"permissions":[{"contract":"*","methods":"*"}],"trusts":[],"extra":{"Author":"forthewin.network","Description":"Forthewin Smith: Your metaverse coin."}}',
        },
        // {
        //   type: "Array",
        //   value: [
        //     {
        //       type: "Hash160",
        //       value: "0xfffdc93764dbaddd97c48f252a53ea4643faa3fd",
        //     },
        //     { type: "Integer", value: "100000000" },
        //   ],
        // },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
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
    // const tokenId = `${u.str2hexstring(prefix + no.toString())}`;
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
    console.log(res)
    const metaList: object[] = [];
    // @ts-ignore
    for await (const item of res.stack[0].iterator) {
      const tokenId = u.HexString.fromBase64(item.value as string).toAscii();
      const meta = await this.getProperties(tokenId);
      metaList.push(meta);
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
export { NFT_SCRIPT_HASH } from "./consts";
