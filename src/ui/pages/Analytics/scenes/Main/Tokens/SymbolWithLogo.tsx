import React from "react";
import { ASSET_LIST } from "../../../../../../packages/neo/contracts/ftw/swap/consts";
import { MAINNET, UNKNOWN_TOKEN_IMAGE } from "../../../../../../packages/neo/consts";
import LogoIcon from "../../../../../components/LogoIcon";

const SymbolWithLogo = ({ id, symbol }) => {
  const hash = id.substring(2);
  const logo = ASSET_LIST[MAINNET][hash]
    ? ASSET_LIST[MAINNET][hash].logo
    : UNKNOWN_TOKEN_IMAGE;
  return (
    <div className="is-flex" style={{alignItems:"center"}}>
      <LogoIcon img={logo} width="20px" height="20px" />
      <span className="ml-2">{symbol}</span>
    </div>
  );
};

export default SymbolWithLogo;
