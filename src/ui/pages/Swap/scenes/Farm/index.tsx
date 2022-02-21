import React from "react";
import { SWAP_PATH_FARM, SWAP_PATH_HISTORY } from "../../../../../consts";
import { Route } from "react-router-dom";
import List from "./scenes/List";
import History from "./scenes/History";

const Farm = () => {
  return (
    <div>
      <Route exact={true} path={SWAP_PATH_FARM} component={List} />
      <Route path={SWAP_PATH_HISTORY} component={History} />
    </div>
  );
};

export default Farm;
