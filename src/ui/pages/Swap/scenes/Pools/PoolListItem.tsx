import React from "react";
import { useWallet } from "../../../../../packages/provider";
import PairIcons from "../../components/PairIcons";
import { IReserve } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";

const PoolCard = ({
  tokenA,
  tokenB,
  amountA,
  amountB,
  tokenASymbol,
  tokenBSymbol,
  onPairClick,
}: IReserve & {
  onPairClick: (tokenA, tokenB) => void;
}) => {
  const { network } = useWallet();
  const ratioAB = (amountB / amountA).toFixed(8);
  const ratioBA = (amountA / amountB).toFixed(8);
  return (
    <a onClick={() => onPairClick(tokenA, tokenB)} className="panel-block">
      <div>
        <div className="level is-mobile mb-3">
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
        <div className="content is-small">
          {`1 ${tokenASymbol}: ${ratioAB} ${tokenBSymbol}`}
          <br />
          {`1 ${tokenBSymbol}: ${ratioBA} ${tokenASymbol}`}
        </div>

        {/*<div className="level is-mobile">*/}
        {/*  <div className="level-left">*/}
        {/*    <div className="level-item">*/}
        {/*      <span className="icon is-small">*/}
        {/*        <Link*/}
        {/*          className="has-text-grey"*/}
        {/*          to={{*/}
        {/*            pathname: `${SWAP_PATH_HISTORY}`,*/}
        {/*            search: `?tokenA=${tokenA}&tokenB=${tokenB}`,*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          <FaHistory />*/}
        {/*        </Link>*/}
        {/*      </span>*/}
        {/*    </div>*/}

        {/*    <div className="level-item">*/}
        {/*      <span className="icon is-small">*/}
        {/*        <Link*/}
        {/*          className="has-text-grey"*/}
        {/*          to={{*/}
        {/*            pathname: `${SWAP_PATH_LIQUIDITY_ADD}`,*/}
        {/*            search: `?tokenA=${tokenA}&tokenB=${tokenB}`,*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          <FaPlusSquare />*/}
        {/*        </Link>*/}
        {/*      </span>*/}
        {/*    </div>*/}

        {/*    <div className="level-item">*/}
        {/*      <span className="icon is-small">*/}
        {/*        <Link*/}
        {/*          className="has-text-grey"*/}
        {/*          to={{*/}
        {/*            pathname: `${SWAP_PATH_LP_LIST}`,*/}
        {/*            search: `?tokenA=${tokenA}&tokenB=${tokenB}`,*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          /!*<RiHandCoinFill />*!/*/}
        {/*        </Link>*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      {/*<div className="media-right">*/}
      {/*  <button*/}
      {/*    onClick={() => onPairClick(tokenA, tokenB)}*/}
      {/*    className="button is-primary"*/}
      {/*  >*/}
      {/*    Trade*/}
      {/*  </button>*/}
      {/*</div>*/}
    </a>
  );
};

export default PoolCard;
