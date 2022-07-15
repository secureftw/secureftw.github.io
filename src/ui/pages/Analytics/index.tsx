import React, { useEffect } from "react";
import PoolAnalytics from "./Pools";
import {
  ANALYTICS_FARM_PATH,
  ANALYTICS_POOLS_PATH,
  ANALYTICS_ROUTE,
  ANALYTICS_TOKENS_PATH,
} from "../../../consts";
import { Route } from "react-router-dom";
import FarmAnalytics from "./Farm";
import { useWallet } from "../../../packages/provider";
import TokensAnalytics from "./Tokens";
import ProductNotSupportedInNetwork from "../../components/ProductNotSupportedInNetwork";
import LiquidityChart from "./LiquidityChart";
import PageLayout from "../../components/PageLayout";
import Pools from "./Pools";

const Analytics = () => {
  const { network } = useWallet();
  if (!ANALYTICS_ROUTE.network.includes(network)) {
    return (
      <ProductNotSupportedInNetwork title={"Analytics"} network={network} />
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.title = "FTW | Analytics";
  }, []);
  return (
    <PageLayout>
      <div className="columns">
        <div className="column">
          <div className="box">
            <h1 className="title is-5">Liquidity</h1>
            <LiquidityChart />
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h1 className="title is-5">Pairs</h1>
            <Pools />
          </div>
        </div>
      </div>

      {/*<Route component={TokensAnalytics} path={ANALYTICS_TOKENS_PATH} />*/}
      {/*<Route component={PoolAnalytics} path={ANALYTICS_POOLS_PATH} />*/}
      {/*<Route component={FarmAnalytics} path={ANALYTICS_FARM_PATH} />*/}
    </PageLayout>
  );
};

export default Analytics;
