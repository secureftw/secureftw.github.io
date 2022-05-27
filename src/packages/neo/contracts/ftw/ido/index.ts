import { INetworkType } from "../../../network";
import { FUSE_SCRIPT_HASH } from "../fuse";

export class IDOContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = FUSE_SCRIPT_HASH[networkType];
  }
}
