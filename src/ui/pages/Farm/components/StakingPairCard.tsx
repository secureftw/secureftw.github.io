import React from "react";
import { FARM_STAKE_PATH } from "../../../../consts";
import { Link } from "react-router-dom";
import { IStakingPairs } from "../../../../packages/neo/contracts/ftw/staking/interfaces";
import { NEP_LOGO } from "../../../../packages/neo/contracts/ftw/staking/consts";
import { toDecimal } from "../../../../packages/neo/utils";
import LogoIcon from "../../../components/LogoIcon";

// interface IStakingPairCardProps extends IStakingPair {}
const StakingPairCard = (props: IStakingPairs) => {
  return (
    <div className="media">
      <div className="media-content">
        <div className="mb-3">
          <strong>{props.tokenASymbol}</strong> /{" "}
          <strong>{props.tokenBSymbol}</strong>
        </div>
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <LogoIcon img={NEP_LOGO} />
            </div>
            <div className="level-item">
              <small>
                <strong>{toDecimal(props.dailyReward)} NEP</strong> per day
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="media-right">
        <Link
          to={`${FARM_STAKE_PATH}?tokenA=${props.tokenA}&tokenB=${props.tokenB}&tokenASymbol=${props.tokenASymbol}&tokenBSymbol=${props.tokenBSymbol}`}
          className="button is-primary"
        >
          Stake
        </Link>
      </div>
    </div>
  );
};

export default StakingPairCard;
