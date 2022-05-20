import { INetworkType } from "../../../network";

import { IConnectedWallet } from "../../../wallet/interfaces";
import { tx, u, wallet as NeonWallet } from "@cityofzion/neon-core";
import { wallet } from "../../../index";
import { DAO_SCRIPT_HASH } from "./consts";

export class DaoContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = DAO_SCRIPT_HASH[networkType];
  }

  createChannel = async (
    connectedWallet: IConnectedWallet,
    contractHash: string,
    minTokens: string,
    metadata: string
  ): Promise<string> => {
    const senderHash = NeonWallet.getScriptHashFromAddress(
      connectedWallet.account.address
    );
    const invokeScript = {
      operation: "createChannel",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: contractHash,
        },
        {
          type: "Hash160",
          value: senderHash,
        },
        {
          type: "Integer",
          value: u.BigInteger.fromDecimal(minTokens, 8).toString(),
        },
        {
          type: "String",
          value: metadata,
        },
      ],
      signers: [
        {
          account: senderHash,
          scopes: tx.WitnessScope.CustomContracts,
          allowedContracts: [this.contractHash, contractHash],
        },
      ],
    };
    return new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      invokeScript,
      undefined,
      undefined
    );
  };
}
