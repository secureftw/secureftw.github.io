import React from "react";
import { Link } from "react-router-dom";
import {
  SWAP_PATH_LIQUIDITY_ADD,
  SWAP_PATH_LIQUIDITY_REMOVE,
} from "../../../../../consts";
import { FaMinus, FaPlus } from "react-icons/all";

const PoolHeader = (props) => {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <h1 className="title is-5">Pools</h1>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <div className="buttons">
            <Link
              to={SWAP_PATH_LIQUIDITY_ADD}
              // onClick={() => setCreateModalActive(true)}
              className="button is-light is-small"
            >
              <FaPlus />
            </Link>
            <Link
              to={SWAP_PATH_LIQUIDITY_REMOVE}
              // onClick={() => setCreateModalActive(true)}
              className="button is-light is-small"
            >
              <FaMinus />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolHeader;
