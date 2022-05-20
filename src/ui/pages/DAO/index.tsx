import React from "react";

import { Link, NavLink, Route } from "react-router-dom";
import { DAO_PATH } from "../../../consts";
import ChannelList from "./scenes/ChannelList";
import Channel from "./scenes/Channel";

const Dao = () => {
  return (
    <div>
      <Route exact={true} component={ChannelList} path={DAO_PATH} />
      <Route component={Channel} path={`${DAO_PATH}/:contractHash`} />
    </div>
  );
};

export default Dao;
