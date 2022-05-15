import React from "react";
import PageLayout from "../../components/PageLayout";
import { Route } from "react-router-dom";
import {
  FARM_PATH,
  FARM_STAKE_PATH,
  FARM_STAKE_POSITIONS_PATH,
} from "../../../consts";
import StakingMain from "./scenes/Main";
import Stake from "./scenes/Stake";
import MyPositions from "./scenes/MyPositions";
import ClaimRewards from "./scenes/ClaimRewards";

const Farm = () => {
  return (
    <PageLayout>
      <div className="columns">
        <div className="column is-6 is-offset-3">
          <div className="columns">
            <div className="column is-9">
              <div className="box is-shadowless">
                <Route exact={true} path={FARM_PATH} component={StakingMain} />
                <Route exact={true} path={FARM_STAKE_PATH} component={Stake} />
                <Route
                  path={FARM_STAKE_POSITIONS_PATH}
                  component={MyPositions}
                />
              </div>
            </div>
            <div className="column is-4">
              <div className="box">
                <ClaimRewards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Farm;
