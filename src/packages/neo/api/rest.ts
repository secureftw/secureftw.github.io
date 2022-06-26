import { INetworkType } from "../network";
import { ENDPOINT } from "./consts";

// interface IRuneFilter = "All" | "Fire" |  ""

export class RestAPI {
  network: INetworkType;
  endpoint: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.endpoint = ENDPOINT[networkType];
  }

  fetchResult = async (url: string) => {
    const res = await fetch(url, { mode: "cors" });
    const json = await res.json();
    if (res.status === 200) {
      return json;
    } else {
      // throw new Error(json.message);
      throw new Error("Network error");
    }
  };

  async getRunes(filter) {
    return this.fetchResult(this.endpoint + "/runes/" + filter);
  }

  async getRune(tokenId) {
    return this.fetchResult(this.endpoint + "/rune/" + tokenId);
  }

	async getPools() {
		return this.fetchResult(this.endpoint + "/pools");
	}

	async getTokens() {
		return this.fetchResult(this.endpoint + "/tokens");
	}
}
