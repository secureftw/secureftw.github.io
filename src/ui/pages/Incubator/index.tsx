import React from "react";
import NavSwitch from "./components/NavSwitch";
import { Link, Route, useLocation } from "react-router-dom";
import SwapBox from "./scenes/Swap";
import { useWallet } from "../../../packages/provider";
import {
  INCUBATOR_PATH,
  INCUBATOR_REGISTER_PATH,
  SMITH_PATH,
  SMITH_PATH_NEP11,
} from "../../../consts";
import PageLayout from "../../components/PageLayout";
import Register from "./scenes/Register";
import Pools from "./scenes/Pools";

const Swap = () => {
  const location = useLocation();
  const { network } = useWallet();
  return (
    <div>
      <section className="hero is-white">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">DAO Incubator</h1>
            <p className="subtitle">Start your DAO tokens today.</p>
            <br />
          </div>
        </div>
        <div className="hero-foot">
          <nav className="tabs is-boxed">
            <div className="container">
              <ul>
                <li
                  className={
                    location.pathname === INCUBATOR_PATH ? "is-active" : ""
                  }
                >
                  <Link to={INCUBATOR_PATH}>Pools</Link>
                </li>
                <li
                  className={
                    location.pathname === INCUBATOR_REGISTER_PATH
                      ? "is-active"
                      : ""
                  }
                >
                  <Link to={INCUBATOR_REGISTER_PATH}>Create a pool</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>

     <PageLayout>
	     <Route exact={true} path={INCUBATOR_PATH} component={Pools} />
	     <Route path={INCUBATOR_REGISTER_PATH} component={Register} />
     </PageLayout>
    </div>
  );
};

export default Swap;
