import React from "react";

import { Route } from "react-router-dom";
import {DAO_CHANNEL_CREATE_PATH, DAO_CHANNEL_PATH, DAO_PATH} from "../../../consts";
import ChannelList from "./scenes/ChannelList";
import Channel from "./scenes/Channel";
import CreateChannel from "./scenes/CreateChannel";

const Dao = () => {
  return (
    <div>
      <Route exact={true} path={DAO_PATH}  component={ChannelList} />
      <Route exact={true} path={DAO_CHANNEL_CREATE_PATH}  component={CreateChannel} />
      <Route path={`${DAO_CHANNEL_PATH}/:contractHash`} component={Channel}  />
    </div>
  );
};

export default Dao;
