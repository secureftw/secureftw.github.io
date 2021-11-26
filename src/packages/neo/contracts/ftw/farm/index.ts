import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { NEO_SCRIPT_HASH } from "../../../consts";
import { InvokeResult } from "@cityofzion/neon-core/lib/rpc/Query";
import { FARM_SCRIPT_HASH } from "./consts";
import { IFarmContractStatus } from "./interfaces";
import {
  parseClaimPaginate,
  parseDeposit,
  parseSnapshotPaginate,
} from "./helpers";

export class FarmContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = FARM_SCRIPT_HASH[networkType];
  }

  /**
   * Listing NFT to sell
   */
  deposit = async (
    connectedWallet: IConnectedWallet,
    amount: string,
    position: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: NEO_SCRIPT_HASH,
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
          value: amount,
        },
        {
          type: "Integer",
          value: parseFloat(position),
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  remove = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const invokeScript = {
      operation: "removeFund",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Address",
          value: connectedWallet.account.address,
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  createSnapshot = async (
    connectedWallet: IConnectedWallet
  ): Promise<string> => {
    const invokeScript = {
      operation: "createSnapshot",
      scriptHash: this.contractHash,
      args: [],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  claim = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const invokeScript = {
      operation: "claim",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Address",
          value: connectedWallet.account.address,
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  getCurrentActivityHeight = async (): Promise<string> => {
    const getHeight = {
      operation: "getActivityHeight",
      scriptHash: this.contractHash,
      args: [],
    };

    const res: InvokeResult = await Network.read(this.network, [getHeight]);
    // @ts-ignore
    return res.stack[0].value;
  };

  getStatus = async (
    connectedWallet?: IConnectedWallet
  ): Promise<IFarmContractStatus> => {
    const neoBalance = {
      operation: "balanceOf",
      scriptHash: NEO_SCRIPT_HASH,
      args: [
        {
          type: "Hash160",
          value: this.contractHash,
        },
      ],
    };
    const timeLeft = {
      operation: "timeLeft",
      scriptHash: this.contractHash,
      args: [],
    };

    const interval = {
      operation: "getSnapshotInterval",
      scriptHash: this.contractHash,
      args: [],
    };

    const range = {
      operation: "getRange",
      scriptHash: this.contractHash,
      args: [],
    };

    const vote = {
      operation: "getVote",
      scriptHash: this.contractHash,
      args: [],
    };

    const snapshots = {
      operation: "getSnapshots",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: 1,
        },
      ],
    };

    const scripts = [neoBalance, timeLeft, interval, range, vote, snapshots];

    if (connectedWallet) {
      const deposit = {
        operation: "getDeposit",
        scriptHash: this.contractHash,
        args: [
          {
            type: "Address",
            value: connectedWallet.account.address,
          },
        ],
      };
      const claims = {
        operation: "getClaims",
        scriptHash: this.contractHash,
        args: [
          {
            // @ts-ignore
            type: "Address",
            // @ts-ignore
            value: connectedWallet.account.address,
          },
          {
            type: "Integer",
            value: 1,
          },
        ],
      };
      scripts.push(deposit);
      scripts.push(claims);
    }

    const res = await Network.read(this.network, scripts);
    return {
      neoBalance: res.stack[0].value as string,
      timeLeft: res.stack[1].value as string,
      interval: res.stack[2].value as string,
      range: res.stack[3].value as string,
      vote: res.stack[4].value as string,
      snapshots: parseSnapshotPaginate(res.stack[5].value),
      deposit:
        connectedWallet && res.stack[6].value
          ? parseDeposit(res.stack[6].value)
          : undefined,
      claims:
        connectedWallet && res.stack[7].value
          ? parseClaimPaginate(res.stack[7].value)
          : undefined,
    };
  };
}
