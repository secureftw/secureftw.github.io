import React, { useEffect } from "react";
import {
  ANALYTICS_ROUTE,
} from "../../../../../consts";
import { useWallet } from "../../../../../packages/provider";
import ProductNotSupportedInNetwork from "../../../../components/ProductNotSupportedInNetwork";
import LiquidityChart from "./LiquidityChart";
import PageLayout from "../../../../components/PageLayout";
import Pools from "./Pairs";
import Tokens from "./Tokens";
import NEPChart from "./NEPChart";

const AnalyticsMain = () => {
  const { network } = useWallet();
  if (!ANALYTICS_ROUTE.network.includes(network)) {
    return (
      <ProductNotSupportedInNetwork title={"Analytics"} network={network} />
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.title = "FTW Analytics";
  }, []);
  return (
    <PageLayout>
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="box">
            <h1 className="title is-5">Liquidity</h1>
            <LiquidityChart />
          </div>
        </div>
        <div className="column is-6">
          <div className="box">
            <h1 className="title is-5">NEP</h1>
            <NEPChart />
          </div>
        </div>
	      <div className="column is-6">
		      <div className="box is-paddingless">
			      <h1
				      className="title is-5"
				      style={{ padding: "1.25rem", paddingBottom: "0" }}
			      >
				      Tokens
			      </h1>
			      <div style={{ height: "600px", width:"100%", overflow:"hidden"   }}>
				      <div style={{ padding: "1.25rem", paddingTop: "0", height: "100%", width:"100%", overflow:"auto" ,paddingRight: "20px" }}>
					      <Tokens />
				      </div>
			      </div>
		      </div>
	      </div>
        <div className="column is-6">
          <div className="box is-paddingless">
            <h1
              className="title is-5"
              style={{ padding: "1.25rem", paddingBottom: "0" }}
            >
              Pairs
            </h1>
	          <div style={{ height: "600px",   width:"100%", overflow:"hidden"   }}>
		          <div style={{ padding: "1.25rem", paddingTop: "0", height: "100%", width:"100%", overflow:"auto" ,paddingRight: "20px" }}>
                <Pools />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AnalyticsMain;
