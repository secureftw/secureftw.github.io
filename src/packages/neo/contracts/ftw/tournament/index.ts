import { INetworkType, Network } from "../../../network";
import { TOURNAMENT_SCRIPT_HASH } from "./consts";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { NFT_SCRIPT_HASH } from "../nft";
import { parsePlayer, parseHistory } from "./helpers";
import { GAS_SCRIPT_HASH } from "../../../consts";

export class TournamentContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = TOURNAMENT_SCRIPT_HASH[networkType];
  }

  join = async (
    connectedWallet: IConnectedWallet,
    tokenId: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: NFT_SCRIPT_HASH[this.network],
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
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript,
      "0.01"
    );
  };

  play = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const invokeScript = {
      operation: "play",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: "32",
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

  bet = async (
    connectedWallet: IConnectedWallet,
    tokenId: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: GAS_SCRIPT_HASH[this.network],
      args: [
        { type: "Integer", value: "10000000" },
        { type: "String", value: tokenId },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
      // "0.01"
    );
  };

  getPlayers = async (): Promise<object[]> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getPlayerList",
      args: [],
    };
    const res = await Network.read(this.network, [script]);
    // @ts-ignore
    return parsePlayer(res.stack[0].value);
  };

  history = async (): Promise<object> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getHistory",
      args: [{ type: "Integer", value: "1" }],
    };
    const res = await Network.read(this.network, [script]);
    return parseHistory(res.stack[0].value);
  };
}
