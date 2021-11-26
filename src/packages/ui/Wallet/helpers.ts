import { CONST } from "../../neo";

export const getWalletIcon = (key: string) => {
  let svg = "";
  switch (key){
    case CONST.DEV:
      svg = "/dev.png"
      break;
    case CONST.O3:
      svg = "/o3.svg"
      break;
    case CONST.NEO_LINE:
      svg = "/neoline.svg"
      break;
  }
  return svg
}
