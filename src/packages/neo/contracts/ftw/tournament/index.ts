import { INetworkType, Network } from "../../../network";
import { TOURNAMENT_SCRIPT_HASH } from "./consts";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { RUNE_SCRIPT_HASH } from "../nft";
import { parsePlayer, parseHistory } from "./helpers";
import { GAS_SCRIPT_HASH } from "../../../consts";
import { toDecimal } from "../../../utils";

export class TournamentContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = TOURNAMENT_SCRIPT_HASH[networkType];
  }

  register = async (
    connectedWallet: IConnectedWallet,
    tokenId: string,
    arenaNo: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: RUNE_SCRIPT_HASH[this.network],
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
          type: "Array",
          value: [
            {
              type: "Integer",
              value: arenaNo,
            },
          ],
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
      // "0.01"
    );
  };

  play = async (
    connectedWallet: IConnectedWallet,
    arenaNo: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "play",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: arenaNo,
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript,
      "0.1"
    );
  };

  leave = async (
    connectedWallet: IConnectedWallet,
    tokenId: string,
    arenaNo: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "leave",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: arenaNo,
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
      invokeScript
      // "0.1"
    );
  };

  bet = async (
    connectedWallet: IConnectedWallet,
    tokenId: string,
    arenaNo: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: GAS_SCRIPT_HASH,
      args: [
        { type: "Address", value: connectedWallet.account.address },
        { type: "Hash160", value: this.contractHash },
        { type: "Integer", value: "10000000" },
        {
          type: "Array",
          value: [
            { type: "Integer", value: arenaNo },
            { type: "String", value: tokenId },
          ],
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

  claim = async (
    connectedWallet: IConnectedWallet,
    arenaNo: string,
    gameNo: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "claim",
      scriptHash: this.contractHash,
      args: [
        { type: "Integer", value: arenaNo },
        { type: "Integer", value: gameNo },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  getPlayers = async (arenaNo: string): Promise<object[]> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getPlayers",
      args: [
        {
          type: "Integer",
          value: arenaNo,
        },
      ],
    };
    const res = await Network.read(this.network, [script]);
    // @ts-ignore
    return parsePlayer(res.stack[0].value);
  };

  history = async (arenaNo: string, page: number): Promise<object> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getHistoryPaginate",
      args: [
        { type: "Integer", value: arenaNo },
        { type: "Integer", value: page },
      ],
    };
    const res = await Network.read(this.network, [script]);
    return parseHistory(res.stack[0].value);
  };

  getGameHeight = async (arenaNo: string): Promise<object> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getGameHeight",
      args: [{ type: "Integer", value: arenaNo }],
    };
    const res = await Network.read(this.network, [script]);
    // @ts-ignore
    return res.stack[0].value;
  };

  getBetAmount = async (
    arenaNo: string,
    gameNo: string,
    championTokenId: string,
    address: string
  ): Promise<any> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getBetsOnAccount",
      args: [
        { type: "Integer", value: arenaNo },
        { type: "Integer", value: gameNo },
        { type: "String", value: championTokenId },
        { type: "Address", value: address },
      ],
    };
    const script1 = {
      scriptHash: this.contractHash,
      operation: "isClaimed",
      args: [
        { type: "Integer", value: arenaNo },
        { type: "Integer", value: gameNo },
        { type: "Address", value: address },
      ],
    };
    const res = await Network.read(this.network, [script, script1]);
    return {
      // @ts-ignore
      betAmount: parseFloat(res.stack[0].value),
      // @ts-ignore
      isClaimed: res.stack[1].value,
    };
  };

  getCurrentPrize = async (
    arenaNo: string
  ): Promise<{
    prize: number;
    gameNo: number;
  }> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getCurrentPrize",
      args: [{ type: "Integer", value: arenaNo }],
    };
    const script1 = {
      scriptHash: this.contractHash,
      operation: "getGameHeight",
      args: [{ type: "Integer", value: arenaNo }],
    };
    const res = await Network.read(this.network, [script, script1]);
    return {
      prize: toDecimal(res.stack[0].value as string),
      gameNo: parseFloat(res.stack[1].value as string) + 1,
    };
  };
}
