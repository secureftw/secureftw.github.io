import React from "react";
import { useWallet } from "../../../../../packages/provider";
import { IReserve } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
import PairIcons from "../../../../components/PairIcons";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { u } from "@cityofzion/neon-core";
import { numberTrim } from "../../../../../packages/neo/utils";
import TruncatedAddress from "../../../../components/TruncatedAddress";

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
  const { isLoaded, error, data } = useOnChainData(() => {
    return new SwapContract(network).getReserve(tokenA, tokenB);
  }, [network]);

  const reserveA =
    data && data.pair[tokenA] && data.pair[tokenA].reserveAmount !== 0
      ? parseFloat(
          u.BigInteger.fromNumber(data.pair[tokenA].reserveAmount).toDecimal(
            tokenADecimals
          )
        )
      : 0;
  const reserveB =
    data && data.pair[tokenB] && data.pair[tokenB].reserveAmount !== 0
      ? parseFloat(
          u.BigInteger.fromNumber(data.pair[tokenB].reserveAmount).toDecimal(
            tokenBDecimals
          )
        )
      : 0;
  if (reserveA < 10 || reserveB < 10) return <></>;
  return (
    <a
      onClick={() => onPairClick(tokenA, tokenB)}
      className="panel-block is-block"
    >
      <div>
        <div className="media" style={{ alignItems: "center" }}>
          <div className="media-left is-vcentered">
            <PairIcons network={network} tokenA={tokenA} tokenB={tokenB} />
          </div>
          <div className="media-content">
            <div className="is-size-7">
              <strong>{tokenASymbol}</strong> (
              <TruncatedAddress address={`0x${tokenA}`} />) /{" "}
              <strong>{tokenBSymbol}</strong> (
              <TruncatedAddress address={`0x${tokenB}`} />)
            </div>
            <div>
              <small className="is-size-7">TVL</small>
              &nbsp;
              <small className="is-size-7">
                {!isLoaded
                  ? "Loading"
                  : `${numberTrim(reserveA, 2)} / ${numberTrim(reserveB, 2)}`}
              </small>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default PoolCard;
