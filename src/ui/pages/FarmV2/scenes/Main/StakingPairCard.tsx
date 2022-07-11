import React from "react";
import { FARM_V2_STAKE_PATH } from "../../../../../consts";
import { useHistory } from "react-router-dom";
import PairIcons from "../../../../components/PairIcons";
import { useWallet } from "../../../../../packages/provider";
import LogoIcon from "../../../../components/LogoIcon";
import { NEP_LOGO } from "../../../../../packages/neo/contracts/ftw/farm/consts";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import { IPool } from "../../../../../packages/neo/contracts/ftw/farm-v2/interfaces";
import { u } from "@cityofzion/neon-core";
import { IPrices } from "../../../../../packages/neo/api/interfaces";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { NEP_SCRIPT_HASH } from "../../../../../packages/neo/contracts/ftw/nep-token/consts";
import { numberTrim } from "../../../../../packages/neo/utils";

const StakingPairCard = (props: IPool & { prices: IPrices }) => {
  const history = useHistory();
  const { network } = useWallet();
  const bonusTokenLogo = ASSET_LIST[network][props.bonusToken]
    ? ASSET_LIST[network][props.bonusToken].logo
    : undefined;

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
			u.BigInteger.fromNumber(props.bonusTokensPerSecond * 86400 * 365).toDecimal(
				props.bonusTokenDecimals
			)
		) * bonusTokenPrice;

  let tokenAReserveAmount =
    props.tokensStaked > 0
      ? parseFloat(
          u.BigInteger.fromNumber(
            Math.round(
              (data.pair[props.tokenA].reserveAmount * props.tokensStaked) /
                data.totalShare
            )
          ).toDecimal(8)
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
          ).toDecimal(8)
        )
      : 0;
  const tokenAReserveUSD = tokenAReserveAmount * tokenAPrice;
	console.log(nepPerYear)
	console.log("Bonus: " +  bonusPerYear)
	console.log(tokenAReserveUSD)
  const tokenBReserveUSD = tokenBReserveAmount * tokenBPrice;
	console.log(tokenBReserveUSD)
  const TVL = tokenAReserveUSD + tokenBReserveUSD;
  const apr = TVL > 0 ? (nepPerYear + bonusPerYear) / TVL * 100 : nepPerYear + bonusPerYear;

  return (
    <tr
      className="is-clickable is-flex"
      onClick={() =>
        history.push(
          `${FARM_V2_STAKE_PATH}?tokenA=${props.tokenA}&tokenB=${props.tokenB}&tokenASymbol=${props.tokenASymbol}&tokenBSymbol=${props.tokenBSymbol}`
        )
      }
    >
      <td>
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <PairIcons
                network={network}
                tokenA={props.tokenA}
                tokenB={props.tokenB}
              />
            </div>
            <div className="level-item has-text-weight-medium is-size-6">
              {props.tokenASymbol} / {props.tokenBSymbol}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="is-center" style={{ justifyContent: "start" }}>
          <LogoIcon width="25px" height="25px" img={NEP_LOGO} />
          <span className="ml-2  is-size-7">
            {parseFloat(
              u.BigInteger.fromNumber(props.nepTokensPerSecond).toDecimal(8)
            ) * 86400}{" "}
            NEP
          </span>
        </div>
        {props.bonusTokensPerSecond > 0 ? (
          <div className="is-center mt-2" style={{ justifyContent: "start" }}>
            <LogoIcon width="25px" height="25px" img={bonusTokenLogo} />
            <span className="ml-2  is-size-7">
              {numberTrim(parseFloat(
                u.BigInteger.fromNumber(props.bonusTokensPerSecond).toDecimal(8)
              ) * 86400)}{" "}
              {props.bonusTokenSymbol}
            </span>
          </div>
        ) : (
          <></>
        )}
      </td>
	    <td>
		    <small>
			    <span className="has-text-success">{props.prices ? numberTrim(apr) : "Loading.."}%</span> APR
		    </small>
	    </td>
    </tr>
  );
};

export default StakingPairCard;
