import React from "react";
import { Route } from "react-router-dom";
import {
  DAO_CHANNEL_CREATE_PATH,
  DAO_CHANNEL_PATH,
  DAO_PAGE_ROUTE,
  DAO_PATH,
} from "../../../consts";
import ChannelList from "./scenes/ChannelList";
import Channel from "./scenes/Channel";
import CreateChannel from "./scenes/CreateChannel";
import { useWallet } from "../../../packages/provider";
import PageLayout from "../../components/PageLayout";

const Dao = () => {
  const { network } = useWallet();
  if (!DAO_PAGE_ROUTE.network.includes(network)) {
    return (
      <PageLayout>
        <div className="notification is-info">
          {DAO_PAGE_ROUTE.label} is not on {network} yet.
          <br />
          Please stay tuned.
        </div>
      </PageLayout>
    );
  }
  return (
    <div>
      <Route exact={true} path={DAO_PATH} component={ChannelList} />
      <Route
        exact={true}
        path={DAO_CHANNEL_CREATE_PATH}
        component={CreateChannel}
      />
      <Route path={`${DAO_CHANNEL_PATH}/:contractHash`} component={Channel} />
    </div>
  );
};

export default Dao;
