import React from "react";
import { Route, Switch } from "react-router-dom";
import { ANALYTICS_PAIRS_PATH, ANALYTICS_PATH } from "../../../consts";
import AnalyticsMain from "./scenes/Main";
import PairDetail from "./scenes/PairDetail";

const Analytics = (props) => {
  return (
    <div>
	    <Switch>
		    <Route exact={true} path={ANALYTICS_PATH} component={AnalyticsMain} />
		    <Route
			    exact={true}
			    path={`${ANALYTICS_PAIRS_PATH}/:pairId`}
			    component={PairDetail}
		    />
	    </Switch>
    </div>
  );
};

export default Analytics;
