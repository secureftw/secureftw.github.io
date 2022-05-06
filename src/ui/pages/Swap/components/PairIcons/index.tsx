import React from "react";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";

interface IPairIconsProps {
  network: string;
  tokenA?: string;
  tokenB?: string;
}
const PairIcons = ({ network, tokenA, tokenB }: IPairIconsProps) => {
  const tokenALogo = ASSET_LIST[network][tokenA]
    ? ASSET_LIST[network][tokenA].logo
    : "/symbols/unknown.png";
  const tokenBLogo = ASSET_LIST[network][tokenB]
    ? ASSET_LIST[network][tokenB].logo
    : "/symbols/unknown.png";
  return (
    <div id="PairIcons">
      <div className="circular--portrait" style={{ zIndex: 1 }}>
        <img src={tokenALogo} />
      </div>
      <div className="circular--portrait" style={{ left: "-5px" }}>
        <img src={tokenBLogo} />
      </div>
    </div>
  );
};

export default PairIcons;
