import React from "react";
import PageLayout from "../../components/PageLayout";
import NavSwitch from "./components/NavSwitch";
import {
  SWAP_PATH,
  // SWAP_PATH_FARM,
  SWAP_PATH_HISTORY,
  SWAP_PATH_LIQUIDITY,
  SWAP_PATH_TRADE,
} from "../../../consts";
import { Route } from "react-router-dom";
import Liquidity from "./scenes/Liquidity";
// import SwapBox from "./scenes/Swap";
// import Farm from "./scenes/Farm";
import { useWallet } from "../../../packages/provider";
import { MAINNET } from "../../../packages/neo/consts";
import List from "./scenes/Farm/scenes/List";
import History from "./scenes/Farm/scenes/History";
import Trade from "./scenes/Swap";

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
            {/*<NavSwitch />*/}
            <div className="box is-shadowless">
              <Route exact={true} path={SWAP_PATH} component={List} />
              <Route path={SWAP_PATH_HISTORY} component={History} />
              <Route path={SWAP_PATH_LIQUIDITY} component={Liquidity} />
              <Route exact={true} path={SWAP_PATH_TRADE} component={Trade} />
            </div>
            {/*  /!*<Route exact={true} path={SWAP_PATH} component={SwapBox} />*!/*/}
            {/*  <Route path={SWAP_PATH} component={Farm} />*/}
            {/*  /!*<Route path={SWAP_PATH_LIQUIDITY} component={Liquidity} />*!/*/}
            {/*  /!*<NotifyError msg={error} onClose={() => setError("")} />*!/*/}
            {/*</div>*/}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Swap;
