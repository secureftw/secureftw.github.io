import React from "react";
import { Link } from "react-router-dom";
import {
  SWAP_PATH_HISTORY,
  SWAP_PATH_LIQUIDITY_ADD,
  SWAP_PATH_LP_LIST,
  SWAP_PATH_TRADE,
} from "../../../../../consts";
import { useWallet } from "../../../../../packages/provider";
import { FaHistory, FaPlusSquare, RiHandCoinFill } from "react-icons/all";
import PairIcons from "../PairIcons";
import { IReserve } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";

const PoolCard = ({
  tokenA,
  tokenB,
  amountA,
  amountB,
  tokenASymbol,
  tokenBSymbol,
}: IReserve) => {
  const { network } = useWallet();
  const ratioAB = (amountB / amountA).toFixed(8);
  const ratioBA = (amountA / amountB).toFixed(8);
  return (
    <div style={{ alignItems: "center" }} className="media">
      <div className="media-content">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <PairIcons
                network={network}
                token={tokenA}
                tokenSymbol={tokenASymbol}
              />
            </div>
            <div className="level-item">
              <PairIcons
                network={network}
                token={tokenB}
                tokenSymbol={tokenBSymbol}
              />
            </div>
          </div>
        </div>
        <div className="content is-small mb-5">
          {`1 ${tokenASymbol}: ${ratioAB} ${tokenBSymbol}`}
          <br />
          {`1 ${tokenBSymbol}: ${ratioBA} ${tokenASymbol}`}
        </div>

        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <span className="icon is-small">
                <Link
                  className="has-text-grey"
                  to={{
                    pathname: `${SWAP_PATH_HISTORY}`,
                    search: `?tokenA=${tokenA}&tokenB=${tokenB}`,
                  }}
                >
                  <FaHistory />
                </Link>
              </span>
            </div>

            <div className="level-item">
              <span className="icon is-small">
                <Link
                  className="has-text-grey"
                  to={{
                    pathname: `${SWAP_PATH_LIQUIDITY_ADD}`,
                    search: `?tokenA=${tokenA}&tokenB=${tokenB}`,
                  }}
                >
                  <FaPlusSquare />
                </Link>
              </span>
            </div>

            <div className="level-item">
              <span className="icon is-small">
                <Link
                  className="has-text-grey"
                  to={{
                    pathname: `${SWAP_PATH_LP_LIST}`,
                    search: `?tokenA=${tokenA}&tokenB=${tokenB}`,
                  }}
                >
                  <RiHandCoinFill />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="media-right">
        <Link
          to={{
            pathname: `${SWAP_PATH_TRADE}`,
            search: `?tokenA=${tokenA}&tokenB=${tokenB}`,
          }}
          className="button is-primary"
        >
          Trade
        </Link>
      </div>
    </div>
  );
};

export default PoolCard;