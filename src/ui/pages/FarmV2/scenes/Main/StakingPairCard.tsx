import React, { useEffect, useState } from "react";
import { FARM_V2_STAKE_PATH } from "../../../../../consts";
import { Link } from "react-router-dom";
import PairIcons from "../../../../components/PairIcons";
import { useWallet } from "../../../../../packages/provider";
import { IPool } from "../../../../../packages/neo/contracts/ftw/farm-v2/interfaces";
import { u } from "@cityofzion/neon-core";
import { IPrices } from "../../../../../packages/neo/api/interfaces";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { NEP_SCRIPT_HASH } from "../../../../../packages/neo/contracts/ftw/nep-token/consts";
import { numberTrim } from "../../../../../packages/neo/utils";
import { FaAngleDown } from "react-icons/fa";
import { RestAPI } from "../../../../../packages/neo/api";

const StakingPairCard = (props: IPool & { prices: IPrices }) => {
  const { network } = useWallet();
  const [pairData, setData] = useState<any>();
  const [isExpanded, setExpanded] = useState(false);
  useEffect(() => {
    async function fetch() {
      try {
        const res = await new RestAPI(network).getPairDay(
          `0x${props.tokenA}_0x${props.tokenB}`
        );
        setData(res);
      } catch (e: any) {}
    }
    fetch();
  }, []);

  const { isLoaded, data } = useOnChainData(() => {
    return new SwapContract(network).getReserve(props.tokenA, props.tokenB);
  }, [network]);

  console.log(
    `${props.tokenASymbol}-${props.tokenBSymbol} staked: ${props.tokensStaked}`
  );

  if (!isLoaded) return <></>;

  let nepPrice =
    props.prices && props.prices["0x" + NEP_SCRIPT_HASH]
      ? props.prices["0x" + NEP_SCRIPT_HASH]
      : 0;

  let bonusTokenPrice =
    props.prices && props.prices["0x" + props.bonusToken]
      ? props.prices["0x" + props.bonusToken]
      : 0;

  let tokenAPrice =
    props.prices && props.prices["0x" + props.tokenA]
      ? props.prices["0x" + props.tokenA]
      : 0;

  let tokenBPrice =
    props.prices && props.prices["0x" + props.tokenB]
      ? props.prices["0x" + props.tokenB]
      : 0;

  const nepPerYear =
    parseFloat(
      u.BigInteger.fromNumber(props.nepTokensPerSecond * 86400 * 365).toDecimal(
        8
      )
    ) * nepPrice;

  const bonusPerYear =
    parseFloat(
      u.BigInteger.fromNumber(
        props.bonusTokensPerSecond * 86400 * 365
      ).toDecimal(props.bonusTokenDecimals)
    ) * bonusTokenPrice;

  let tokenAReserveAmount =
    props.tokensStaked > 0
      ? parseFloat(
          u.BigInteger.fromNumber(
            Math.round(
              (data.pair[props.tokenA].reserveAmount * props.tokensStaked) /
                data.totalShare
            )
          ).toDecimal(data.pair[props.tokenA].decimals)
        )
      : 0;

  let tokenBReserveAmount =
    props.tokensStaked > 0
      ? parseFloat(
          u.BigInteger.fromNumber(
            Math.round(
              (data.pair[props.tokenB].reserveAmount * props.tokensStaked) /
                data.totalShare
            )
          ).toDecimal(data.pair[props.tokenB].decimals)
        )
      : 0;
  const tokenAReserveUSD = tokenAReserveAmount * tokenAPrice;
  const tokenBReserveUSD = tokenBReserveAmount * tokenBPrice;
  const feesYear =
    pairData && pairData.dailyFeesUSD ? pairData.dailyFeesUSD * 365 : 0;

  const TVL = tokenAReserveUSD + tokenBReserveUSD;
  const stakeAPR = ((nepPerYear + bonusPerYear) / TVL) * 100;
  const feeAPR = (feesYear / TVL) * 100;

  const totalAPR = stakeAPR + feeAPR;

  return (
    <>
      <tr>
        <td>
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <PairIcons
                  network={network}
                  tokenA={props.tokenA}
                  tokenB={props.tokenB}
                  width="20px"
                  height="20px"
                />
              </div>
              <div className="level-item">
                <strong>
                  {props.tokenASymbol} / {props.tokenBSymbol}
                </strong>
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="is-center" style={{ justifyContent: "start" }}>
            {/*<LogoIcon width="25px" height="25px" img={NEP_LOGO} />*/}
            {parseFloat(
              u.BigInteger.fromNumber(props.nepTokensPerSecond).toDecimal(8)
            ) * 86400}{" "}
            NEP
          </div>
          {props.bonusTokensPerSecond > 0 ? (
            <div className="is-center" style={{ justifyContent: "start" }}>
              {/*<LogoIcon width="25px" height="25px" img={bonusTokenLogo} />*/}
              {numberTrim(
                parseFloat(
                  u.BigInteger.fromNumber(props.bonusTokensPerSecond).toDecimal(
                    8
                  )
                ) * 86400
              )}{" "}
              {props.bonusTokenSymbol}
            </div>
          ) : (
            <></>
          )}
        </td>
        <td>
          <button
            onClick={() => setExpanded(!isExpanded)}
            className="button is-white is-small"
          >
            <span className="has-text-success">
              {props.prices ? numberTrim(totalAPR) : "Loading.."}%
            </span>

            <span className="icon is-small">
              <FaAngleDown />
            </span>
          </button>
        </td>
        <td className="has-text-right">
          <Link
            to={`${FARM_V2_STAKE_PATH}?tokenA=${props.tokenA}&tokenB=${props.tokenB}&tokenASymbol=${props.tokenASymbol}&tokenBSymbol=${props.tokenBSymbol}`}
            className="button is-primary is-small"
          >
            Stake
          </Link>
        </td>
      </tr>
      {isExpanded && (
        <tr className="has-background-dark">
          <td colSpan={4} className="has-text-white">
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item is-block">
                  <div className="heading has-text-white">Stake APR</div>
                  {numberTrim(stakeAPR)}%
                </div>
                <div className="level-item has-text-weight-bold">+</div>
                <div className="level-item is-block">
                  <div className="heading has-text-white">Fee APR</div>
                  {numberTrim(feeAPR)}%
                </div>
                <div className="level-item has-text-weight-bold">=</div>
                <div className="level-item is-block">
                  <div className="heading has-text-white">Total APR</div>
                  {numberTrim(totalAPR)}%
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default StakingPairCard;
