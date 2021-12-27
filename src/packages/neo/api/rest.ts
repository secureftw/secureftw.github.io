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
    const res = await fetch(url);
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
}
