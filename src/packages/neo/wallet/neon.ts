import { WcSdk } from "@cityofzion/wallet-connect-sdk-core";
// import QRCodeModal from "@walletconnect/qrcode-modal";

import buffer from "buffer";
import { dispatchEventNeonWalletDisconnected } from "../../neon/events";
import { INetworkType } from "../network";
import { MAINNET } from "../consts";

const getWcNeonWalletInstance = async (
  network: INetworkType
): Promise<WcSdk> => {
  // Set window.Buffer to solve ReferenceError: Buffer is not defined
  window.Buffer = buffer.Buffer;
  const instance = new WcSdk();
  await instance.initClient("error", "wss://relay.walletconnect.org");

  // Subscribe to Wallet Connect events
  instance.subscribeToEvents({
    onProposal: (uri: string) => {
      // QRCodeModal.open(uri, () => {});
      // @ts-ignore
      window.open(`https://neon.coz.io/connect?uri=${uri}`, "_blank").focus();
    },
    onDeleted: () => {
      dispatchEventNeonWalletDisconnected();
    },
  });

  // Load any existing connection, it should be called after the initialization
  await instance.loadSession();

  // Check if user has a session and get its accounts
  if (!instance.session) {
    await instance.connect({
      chains: [network === MAINNET ? "neo3:mainnet" : "neo3:testnet"], // the blockchains your dapp accepts to connect
      methods: [
        // which RPC methods do you plan to call
        "invokeFunction",
        // "testInvoke",
        // "signMessage",
        // "verifyMessage",
        // "getapplicationlog",
      ],
      appMetadata: {
        name: "Forthewin Network", // your application name to be displayed on the wallet
        description: "The hub of NEP-17", // description to be shown on the wallet
        url: "https://forthewin.network/", // url to be linked on the wallet
        icons: ["https://forthewin.network/logo/FTW_512_512.svg"], // icon to be shown on the wallet
      },
    });

    if (instance.session) {
      if (process.env.NODE_ENV === "development") {
        console.log("NEON: Connected to New Session");
        console.log(instance.session);
      }
    } else {
      console.log("NEON: Cannot connect to Neon Wallet");
    }
  } else if (instance.session) {
    if (process.env.NODE_ENV === "development") {
      console.log("NEON: Session Loaded");
      console.log(instance.session);
    }
  }
  return instance;
};

export const initNeon = async (network: INetworkType) => {
  const instance = await getWcNeonWalletInstance(network);
  if (instance.session) {
    const account = {
      address: instance.accountAddress,
      label: "Neon", // Neon not provide this info
    };
    return { account, instance };
  }
};
