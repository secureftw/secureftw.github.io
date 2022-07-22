import { u } from "@cityofzion/neon-core";
import React, { useEffect, useState } from "react";
import {numberTrim} from "../../../../../packages/neo/utils";
interface ICounterUpProps {
  claimable: number;
  rewardsPerSecond: number;
  tokensStaked: number;
  share: number;
  pricePerToken: number;
  symbol: string;
}
const CounterUp = ({
  claimable,
  rewardsPerSecond,
  symbol,
  tokensStaked,
  share,
  pricePerToken,
}: ICounterUpProps) => {
  const [timeElapsed, setTimeElapsed] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeElapsed]);
  const rewards = u.BigInteger.fromNumber(rewardsPerSecond)
    .mul(share)
    .div(tokensStaked)
    .mul(timeElapsed)
    .add(claimable)
    .toDecimal(8);
  return (
    <div className="has-text-right">
      {`${rewards} ${symbol}`}
      <br />${numberTrim(parseFloat(rewards) * pricePerToken)}
    </div>
  );
};

export default CounterUp;
