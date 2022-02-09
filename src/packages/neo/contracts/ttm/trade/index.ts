import { INetworkType, Network } from "../../../network";
import { IConnectedWallet } from "../../../wallet/interfaces";
import { wallet } from "../../../index";
import { TRADE_CONTRACT_OWNER, TRADE_SCRIPT_HASH } from "./consts";
import { parseSettings } from "./helpers";
import { ITradeContractSettings } from "./interfaces";
import { GAS_SCRIPT_HASH } from "../../../consts";
import { InvokeResult } from "@cityofzion/neon-core/lib/rpc/Query";

export class TradeContract {
  network: INetworkType;
  contractHash: string;

  constructor(networkType: INetworkType) {
    this.network = networkType;
    this.contractHash = TRADE_SCRIPT_HASH[networkType];
  }

  static owner = TRADE_CONTRACT_OWNER;

  /**
   * Listing NFT to sell
   */
  doList = async (
    connectedWallet: IConnectedWallet,
    nftContractHash,
    tokenId: string,
    paymentContractHash: string,
    price: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: nftContractHash,
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
              type: "Hash160",
              value: paymentContractHash,
            },
            {
              type: "Integer",
              value: price,
            },
            {
              type: "String",
              value: "trade",
            },
          ],
        },
      ],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  listAuction = async (
    connectedWallet: IConnectedWallet,
    nftContractHash,
    tokenId: string,
    paymentContractHash: string,
    price: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: nftContractHash,
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
              type: "Hash160",
              value: paymentContractHash,
            },
            {
              type: "Integer",
              value: price,
            },
            {
              type: "String",
              value: "auction",
            },
          ],
        },
      ],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  bid = async (
    connectedWallet: IConnectedWallet,
    paymentContractHash: string,
    price: string,
    auctionNo: string
  ): Promise<string> => {
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
          value: price,
        },
        {
          type: "Array",
          value: [
            {
              type: "Integer",
              value: auctionNo,
            },
            {
              type: "String",
              value: "auction",
            },
          ],
        },
      ],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  claimAuctionByOwner = async (
    connectedWallet: IConnectedWallet,
    auctionNo: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "claimAuctionByOwner",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: auctionNo,
        },
      ],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  claimAuctionByBider = async (
    connectedWallet: IConnectedWallet,
    auctionNo: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "claimAuctionByBider",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: auctionNo,
        },
        {
          type: "Address",
          value: connectedWallet.account.address,
        },
      ],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  updateFee = async (
    connectedWallet: IConnectedWallet,
    fee: string
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: fee,
        },
      ],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  buy = async (
    connectedWallet: IConnectedWallet,
    paymentContractHash: string,
    price: string,
    itemNo,
    type: "trade" | "auction"
  ): Promise<string> => {
    const invokeScript = {
      operation: "transfer",
      scriptHash: paymentContractHash,
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
          value: price,
        },
        {
          type: "Array",
          value: [
            {
              type: "Integer",
              value: itemNo,
            },
            {
              type: "String",
              value: "trade",
            },
          ],
        },
      ],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  cancel = async (
    connectedWallet: IConnectedWallet,
    itemNo: number
  ): Promise<string> => {
    const invokeScript = {
      operation: "cancelTradeItem",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: itemNo,
        },
      ],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  getSettings = async (): Promise<ITradeContractSettings> => {
    const payment = {
      operation: "getPaymentList",
      scriptHash: this.contractHash,
      args: [],
    };
    const currentFee = {
      operation: "getFeePercentage",
      scriptHash: this.contractHash,
      args: [],
    };
    const gasFee = {
      operation: "balanceOf",
      scriptHash: GAS_SCRIPT_HASH,
      args: [
        {
          type: "Hash160",
          value: this.contractHash,
        },
      ],
    };
    const getAuctions = {
      operation: "getAuctions",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Integer",
          value: "1",
        },
      ],
    };

    const res: InvokeResult = await Network.read(this.network, [
      payment,
      currentFee,
      gasFee,
      getAuctions,
    ]);
    return parseSettings(res.stack);
  };

  openMarket = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const invokeScript = {
      operation: "openMarket",
      scriptHash: this.contractHash,
      args: [],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  closeMarket = async (connectedWallet: IConnectedWallet): Promise<string> => {
    const invokeScript = {
      operation: "closeMarket",
      scriptHash: this.contractHash,
      args: [],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };

  whitelistContractHash = async (
    connectedWallet: IConnectedWallet,
    contractHash: string
  ): Promise<any> => {
    const invokeScript = {
      operation: "whitelistContractHash",
      scriptHash: this.contractHash,
      args: [
        {
          type: "Hash160",
          value: contractHash,
        },
      ],
    };
    return await new wallet.WalletAPI(connectedWallet.key).invoke(
      this.network,
      connectedWallet.account.address,
      invokeScript
    );
  };
}
