import React from "react";
import { Link } from "react-router-dom";
import { SWAP_PATH_LIQUIDITY_ADD } from "../../../../../consts";

const NoLPInfo = ({ tokenA, tokenB }) => {
  return (
    <>
      <div className="notification is-info">
        No liquidity with the pairs. Provide liquidity and earn fees.
        <br />
        <br />
        <Link
          className="button is-info is-inverted"
          to={
            tokenA && tokenB
              ? `${SWAP_PATH_LIQUIDITY_ADD}?tokenA=${tokenA}&tokenB=${tokenB}`
              : SWAP_PATH_LIQUIDITY_ADD
          }
        >
          Provide liquidity
        </Link>
      </div>
      <hr />
    </>
  );
};

export default NoLPInfo;
