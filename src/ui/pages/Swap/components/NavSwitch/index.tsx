import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SWAP_PATH,
  SWAP_PATH_FARM,
  SWAP_PATH_HISTORY,
  SWAP_PATH_LIQUIDITY,
} from "../../../../../consts";

const NavSwitch = (props) => {
  const location = useLocation();
  return (
    <div className="tabs is-toggle">
      <ul>
        <li
          className={
            location.pathname === SWAP_PATH
              ? "is-active"
              : "has-background-white"
          }
        >
          <Link to={SWAP_PATH}>Swap</Link>
        </li>
        {/*<li*/}
        {/*  className={*/}
        {/*    location.pathname === SWAP_PATH_LIQUIDITY*/}
        {/*      ? "is-active"*/}
        {/*      : "has-background-white"*/}
        {/*  }*/}
        {/*>*/}
        {/*  <Link to={SWAP_PATH_LIQUIDITY}>Liquidity</Link>*/}
        {/*</li>*/}
        <li
          className={
            location.pathname.includes(SWAP_PATH_FARM)
              ? "is-active"
              : "has-background-white"
          }
        >
          <Link to={SWAP_PATH_FARM}>Pools</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavSwitch;
