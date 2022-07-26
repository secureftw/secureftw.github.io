import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { tx, u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { wallet } from "../../../index";
import { LOCKER_SCRIPT_HASH } from "./consts";
import { NEP_SCRIPT_HASH } from "../../../consts/nep17-list";
import { parseMapValue } from "../../../utils";
import {
  ILocker,
  ILockerContract,
  ILockerContracts,
  ILockersByToken,
} from "./interface";
import { DEFAULT_WITNESS_SCOPE } from "../../../consts";

export class LockerContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = LOCKER_SCRIPT_HASH[networkType];
  }

  create = async (
    connectedWallet: IConnectedWallet,
    contract: {
      assetHash: string;
      symbol: string;
      decimals: number;
    },
    receiver: string,
    amount: number,
    releaseAt: number,
    title: string,
    description: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    receiver = NeonWallet.getScriptHashFromAddress(receiver);
    const invokeScript = {
      operation: "lock",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: contract.assetHash,
        },
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Hash160",
          value: receiver,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(amount, contract.decimals).toString(),
        },
        {
          type: "Integer",
          value: releaseAt,
        },
        {
          type: "String",
          value: title,
        },
        {
          type: "String",
          value: description,
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [contract.assetHash, NEP_SCRIPT_HASH],
        },
      ],
    };
    return wallet.WalletAPI.invoke(connectedWallet, this.network, invokeScript);
  };

  unLock = async (connectedWallet, lockerNo): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "unLock",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: lockerNo,
        },
        {
          type: "Hash160",
          value: senderHash,
        },
      ],
      signers: [DEFAULT_WITNESS_SCOPE(senderHash)],
    };
    return wallet.WalletAPI.invoke(connectedWallet, this.network, invokeScript);
  };

  getToken = async (contractHash): Promise<ILockerContract> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getToken",
      args: [
        {
          type: "Hash160",
          value: contractHash,
        },
      ],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseMapValue(res.stack[0] as any);
  };

  getTokens = async (): Promise<ILockerContracts> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getTokens",
      args: [
        {
          type: "Integer",
          value: "30",
        },
        {
          type: "Integer",
          value: "1",
        },
      ],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseMapValue(res.stack[0] as any);
  };

  getLockerByNo = async (no: string): Promise<ILocker> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getLocker",
      args: [
        {
          type: "Integer",
          value: no,
        },
      ],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseMapValue(res.stack[0] as any);
  };

  getLockersByContract = async (
    contractHash: string
  ): Promise<ILockersByToken> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getLockersByToken",
      args: [
        {
          type: "Hash160",
          value: contractHash,
        },
        {
          type: "Integer",
          value: "30",
        },
        {
          type: "Integer",
          value: "1",
        },
      ],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseMapValue(res.stack[0] as any);
  };

  getLockersByUser = async (address: string): Promise<ILockersByToken> => {
    const script = {
      scriptHash: this.contractHash,
      operation: "getLockersByOwner",
      args: [
        {
          type: "Hash160",
          value: NeonWallet.getScriptHashFromAddress(address),
        },
        {
          type: "Integer",
          value: "30",
        },
        {
          type: "Integer",
          value: "1",
        },
      ],
    };
    const res = await Network.read(this.network, [script]);
    if (res.state === "FAULT") {
      throw new Error(res.exception as string);
    }
    return parseMapValue(res.stack[0] as any);
  };
}
