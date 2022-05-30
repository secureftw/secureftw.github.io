import React from "react";
import { useWallet } from "../../../../../packages/provider";
import PairIcons from "../../components/PairIcons";
import { IReserve } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
import { u } from "@cityofzion/neon-core";
import { withDecimal } from "../../../../../packages/neo/utils";
// import {numberTrim} from "../../../../../packages/neo/utils";

const PoolCard = ({
  tokenA,
  tokenB,
  amountA,
  amountB,
  tokenASymbol,
  tokenBSymbol,
  tokenADecimals,
  tokenBDecimals,
  onPairClick,
}: IReserve & {
  onPairClick: (tokenA, tokenB) => void;
}) => {
  const { network } = useWallet();
	const A = u.BigInteger.fromDecimal(amountA, tokenADecimals)
	const B = u.BigInteger.fromDecimal(amountB, tokenADecimals)
  // const ratioAB = B.div(A);
  // const ratioBA = A.div(B)
  return (
    <a onClick={() => onPairClick(tokenA, tokenB)} className="panel-block">
      <div>
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
        {/*<div className="content is-small">*/}
        {/*  {`1 ${tokenASymbol}: ${ratioAB} ${tokenBSymbol}`}*/}
        {/*  <br />*/}
        {/*  {`1 ${tokenBSymbol}: ${ratioBA} ${tokenASymbol}`}*/}
        {/*</div>*/}
      </div>
    </a>
  );
};

export default PoolCard;
