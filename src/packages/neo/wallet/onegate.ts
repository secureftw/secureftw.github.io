import { NeoDapi } from "@neongd/neo-dapi";

export const initOG = async () => {
  try {
    // @ts-ignore
    const instance = new NeoDapi(window.OneGate);
    const account = await instance.getAccount();
    return {
      instance,
      account,
    };
  } catch (e) {
    throw new Error("OneGate wallet only supports in OneGate web browser.");
  }
};
