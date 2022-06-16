import { INetworkType } from "../neo/network";
import { MAINNET } from "../neo/consts";

export const NEON_WALLET_DISCONNECTED = "NEON_WALLET_DISCONNECTED";

export const WC_OPTIONS = {
  chains: ["neo3:mainnet", "neo3:testnet"], // the blockchains your dapp accepts to connect
  methods: [
    // which RPC methods do you plan to call
    "invokeFunction",
    // "testInvoke",
    // "signMessage",
    // "verifyMessage",
    // "getapplicationlog",
  ],
  logger: "debug", // use debug to show all log information on browser console
  relayServer: "wss://relay.walletconnect.org", // we are using walletconnect's official relay server,
  qrCodeModal: true, // to show a QRCode modal when connecting. Another option would be to listen to proposal event and handle it manually, described later
  appMetadata: {
    name: "Forthewin Network", // your application name to be displayed on the wallet
    description: "The hub of NEP-17", // description to be shown on the wallet
    url: "https://forthewin.network/", // url to be linked on the wallet
    icons: ["https://forthewin.network/logo/FTW_512_512.svg"], // icon to be shown on the wallet
  },
};
