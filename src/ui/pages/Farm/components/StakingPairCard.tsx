import React from "react";
import { FARM_STAKE_PATH } from "../../../../consts";
import { Link } from "react-router-dom";
import { IStakingPairs } from "../../../../packages/neo/contracts/ftw/staking/interfaces";
import { STAKING_COIN_SYMBOL } from "../../../../packages/neo/contracts/ftw/staking/consts";

// interface IStakingPairCardProps extends IStakingPair {}
const StakingPairCard = (props: IStakingPairs) => {
  return (
    <div className="media">
      <div className="media-content">
        {props.tokenASymbol} / {props.tokenBSymbol}
        <br />
        <strong>
          {props.dailyReward} {STAKING_COIN_SYMBOL}
        </strong>{" "}
        <small>per day</small>
      </div>
      <div className="media-right">
        <Link
          to={`${FARM_STAKE_PATH}?tokenA=${props.tokenA}&tokenB=${props.tokenB}&tokenASymbol=${props.tokenASymbol}&tokenBSymbol=${props.tokenBSymbol}`}
          className="button is-light"
        >
          Stake
        </Link>
      </div>
    </div>
  );
};

export default StakingPairCard;
