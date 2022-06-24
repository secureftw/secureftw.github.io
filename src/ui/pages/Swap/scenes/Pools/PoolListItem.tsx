import React from "react";
import { useWallet } from "../../../../../packages/provider";
import { IReserve } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
import PairIcons from "../../../../components/PairIcons";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { u } from "@cityofzion/neon-core";

const PoolCard = ({
  tokenA,
  tokenB,
  tokenADecimals,
  tokenASymbol,
  tokenBDecimals,
  tokenBSymbol,
  onPairClick,
}: IReserve & {
  onPairClick: (tokenA, tokenB) => void;
}) => {
  const { network } = useWallet();
  // const A = u.BigInteger.fromDecimal(amountA, tokenADecimals)
  // const B = u.BigInteger.fromDecimal(amountB, tokenADecimals)
  // const ratioAB = B.div(A);
  // const ratioBA = A.div(B)
  const { isLoaded, error, data } = useOnChainData(() => {
    return new SwapContract(network).getReserve(tokenA, tokenB);
  }, [network]);

  const reserveA =
    data && data.pair[tokenA] && data.pair[tokenA].reserveAmount !== 0
      ? u.BigInteger.fromNumber(data.pair[tokenA].reserveAmount).toDecimal(
          tokenADecimals
        )
      : 0;
  const reserveB =
    data && data.pair[tokenB] && data.pair[tokenB].reserveAmount !== 0
      ? u.BigInteger.fromNumber(data.pair[tokenB].reserveAmount).toDecimal(
          tokenBDecimals
        )
      : 0;

  return (
    <a
      onClick={() => onPairClick(tokenA, tokenB)}
      className="panel-block is-block"
    >
      <div>
        <div className="level is-mobile mb-2">
          <div className="level-left">
            <div className="level-item">
              <PairIcons network={network} tokenA={tokenA} tokenB={tokenB} />
            </div>
            <div className="level-item has-text-weight-medium is-size-7">
              {tokenASymbol} / {tokenBSymbol}
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <small className="is-size-7">TVL</small>
	            &nbsp;
              <small className="is-size-7">
                {!isLoaded ? "Loading" : `${reserveA} / ${reserveB}`}
              </small>
            </div>
          </div>
        </div>
	      <div className="is-size-7">
		      {`${tokenASymbol}: 0x${tokenA}`}<br/>
		      {`${tokenBSymbol}: 0x${tokenB}`}
	      </div>
      </div>
    </a>
  );
};

export default PoolCard;
