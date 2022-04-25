import React from "react";
import {
  SWAP_PATH,
  SWAP_PATH_HISTORY,
  SWAP_PATH_LIQUIDITY_ADD,
  SWAP_PATH_LIQUIDITY_REMOVE,
} from "../../../../../consts";
import { Route } from "react-router-dom";
import List from "../Pools";
import History from "../History";
import Liquidity from "../AddLiquidity";

const Farm = () => {
  return (
    <div>
      <Route exact={true} path={SWAP_PATH} component={List} />
      <Route path={SWAP_PATH_HISTORY} component={History} />
      <Route path={SWAP_PATH_LIQUIDITY_ADD} component={Liquidity} />
      <Route path={SWAP_PATH_LIQUIDITY_REMOVE} component={Liquidity} />
    </div>
  );
};

export default Farm;
