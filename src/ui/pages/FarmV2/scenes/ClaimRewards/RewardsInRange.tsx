import { u } from "@cityofzion/neon-core";
import React from "react";
import { DAILY, MONTHLY, YEARLY } from "./consts";
import {numberTrim} from "../../../../../packages/neo/utils";
interface ICounterUpProps {
  claimable: number;
  rewardsPerSecond: number;
  timeRangeType: string;
  tokensStaked: number;
  share: number;
  symbol: string;
  pricePerToken: number;
}
const RewardsInRange = ({
  claimable,
  rewardsPerSecond,
  symbol,
  timeRangeType,
  tokensStaked,
  share,
  pricePerToken,
}: ICounterUpProps) => {
  let timeRange = 0;
  if (timeRangeType === DAILY) {
    timeRange = 86400;
  } else if (timeRangeType === MONTHLY) {
    timeRange = 2592000;
  } else if (timeRangeType === YEARLY) {
    timeRange = 31536000;
  }
  const reward = u.BigInteger.fromNumber(rewardsPerSecond)
    .mul(timeRange)
    .mul(share)
    .div(tokensStaked)
    .add(claimable)
    .toDecimal(8);
  return (
    <div className="has-text-right">
      {`${reward} ${symbol}`}
      <br />
	    ${numberTrim(parseFloat(reward) * pricePerToken)}
    </div>
  );
};

export default RewardsInRange;
