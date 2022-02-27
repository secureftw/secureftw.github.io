import React from "react";
import {
  SWAP_PATH_FARM,
  SWAP_PATH_HISTORY,
  SWAP_PATH_LIQUIDITY,
} from "../../../../../consts";
import { Route } from "react-router-dom";
import List from "./scenes/List";
import History from "./scenes/History";
import Liquidity from "../Liquidity";

const Farm = () => {
  return (
    <div>
      <Route exact={true} path={SWAP_PATH_FARM} component={List} />
      <Route path={SWAP_PATH_HISTORY} component={History} />
      <Route path={SWAP_PATH_LIQUIDITY} component={Liquidity} />
    </div>
  );
};

export default Farm;
