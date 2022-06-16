import { NeoDapi } from "@neongd/neo-dapi";
import { MAINNET, TESTNET } from "../consts";

export const initOG = async () => {
  // @ts-ignore
  const instance = new NeoDapi(window.OneGate);
  const account = await instance.getAccount();
  // const network = await instance.getNetworks();
  // network.defaultNetwork =
  //   network.defaultNetwork === "MainNet" ? MAINNET : TESTNET;
  // TODO: Need to some sort of validation for balances in case wallet doesn't have any address?
  return {
    instance,
    account,
  };
};
