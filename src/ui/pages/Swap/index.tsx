import React from "react";
import PageLayout from "../../components/PageLayout";
import NavSwitch from "./components/NavSwitch";
import {
  SWAP_PATH,
  SWAP_PATH_FARM,
  SWAP_PATH_LIQUIDITY,
} from "../../../consts";
import { Route } from "react-router-dom";
import Liquidity from "./scenes/Liquidity";
import SwapBox from "./scenes/Swap";
import Farm from "./scenes/Farm";
import { useWallet } from "../../../packages/provider";
import { MAINNET } from "../../../packages/neo/consts";

const Swap = () => {
  const { network } = useWallet();
  if (network === MAINNET)
    return (
      <PageLayout>
        <div className="notification is-info">
          FTW Swap is not on Mainnet yet.{" "}
        </div>
      </PageLayout>
    );
  return (
    <div>
      <PageLayout>
        <div className="columns is-centered">
          <div className="column is-half">
            <NavSwitch />
            <div className="box is-shadowless">
              <Route exact={true} path={SWAP_PATH} component={SwapBox} />
              <Route path={SWAP_PATH_LIQUIDITY} component={Liquidity} />
              <Route path={SWAP_PATH_FARM} component={Farm} />
              {/*<NotifyError msg={error} onClose={() => setError("")} />*/}
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Swap;
