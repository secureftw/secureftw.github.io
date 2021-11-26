import { INetworkType } from "../network";
import { ENDPOINT } from "./consts";

export class TTMRestAPI {
  network: INetworkType;
  endpoint: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.endpoint = ENDPOINT[networkType];
  }

  fetchResult = async (url: string) => {
    const res = await fetch(url);
    const json = await res.json();
    if (res.status === 200) {
      return json;
    } else {
      // throw new Error(json.message);
      throw new Error("Network error");
    }
  };

  // Uses to grab nft after minting
  async getCharacterByOrderNo(category: string, orderNo: string) {
    category = category.toLowerCase();
    category = category.replace(" ", "-");
    return await this.fetchResult(
      this.endpoint + "/sale/" + category + "/" + orderNo
    );
  }

  async getActiveTrades(page: string) {
    return await this.fetchResult(this.endpoint + "/trade/items/" + page);
  }
}
