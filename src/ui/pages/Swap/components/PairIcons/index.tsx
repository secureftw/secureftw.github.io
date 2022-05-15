import React from "react";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";

interface IPairIconsProps {
  network: string;
  token: string;
  tokenSymbol: string;
}
const PairIcons = ({ network, token, tokenSymbol }: IPairIconsProps) => {
  const tokenALogo = ASSET_LIST[network][token]
    ? ASSET_LIST[network][token].logo
    : "/symbols/unknown.png";

  return (
    <div
      id="PairIcons"
      className="is-centered"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="circular--portrait mr-2">
        <img src={tokenALogo} />
      </div>
      {tokenSymbol}
    </div>
  );
};

export default PairIcons;
