import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import { useWallet } from "../../../packages/provider";
import { SwapContract } from "../../../packages/neo/contracts";
import { StakingContract } from "../../../packages/neo/contracts/ftw/staking";
import { Link, Route } from "react-router-dom";
import {
  FARM_PATH,
  FARM_STAKE_PATH,
  FARM_STAKE_POSITIONS_PATH,
  SWAP_PATH_LIQUIDITY_ADD,
  SWAP_PATH_LIQUIDITY_REMOVE,
} from "../../../consts";
import { FaMinus, FaPlus } from "react-icons/all";
import StakingPairCard from "./components/StakingPairCard";
import StakingMain from "./scenes/Main";
import Stake from "./scenes/Stake";
import MyPositions from "./scenes/MyPositions";
import ClaimRewards from "./scenes/ClaimRewards";

const Farm = (props) => {
  // const { network, connectedWallet } = useWallet();
  // const [list, setList] = useState<any[]>([]);
  // const [detail, setDetail] = useState();
  // const [isCreateModalActive, setCreateModalActive] = useState(false);
  // const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  //
  // useEffect(() => {
  //   async function fetch() {
  //     setLoading(true);
  //     try {
  //       const res = await new StakingContract(network).getPairs();
  //       console.log(res);
  //       setLoading(false);
  //       setList(res);
  //     } catch (e: any) {
  //       setLoading(false);
  //       setError(e.message);
  //     }
  //   }
  //   fetch();
  // }, []);
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
