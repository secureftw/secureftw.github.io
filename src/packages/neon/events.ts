import { NEON_WALLET_DISCONNECTED } from "./consts";

export const addEventListenerNeonWalletDisconnected = (
  callback: () => void
) => {
  window.addEventListener(NEON_WALLET_DISCONNECTED, callback, false);
};

export const removeEventListenerNeonWalletDisconnected = (
  callback: () => void
) => {
  window.removeEventListener(NEON_WALLET_DISCONNECTED, callback, false);
};

export const dispatchEventNeonWalletDisconnected = () => {
	console.log("disconnected")
  window.dispatchEvent(new CustomEvent(NEON_WALLET_DISCONNECTED));
};
