import { u } from "@cityofzion/neon-core";
import React, { useEffect, useState } from "react";
interface ICounterUpProps {
  claimable: number;
  rewardsPerSecond: number;
  tokensStaked: number;
  share: number;
  symbol: string;
}
const CounterUp = ({
  claimable,
  rewardsPerSecond,
  symbol,
  tokensStaked,
  share,
}: ICounterUpProps) => {
  rewardsPerSecond = (rewardsPerSecond * share) / tokensStaked;
  const [timeElapsed, setTimeElapsed] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeElapsed]);

  return (
    <div className="has-text-right">
      {u.BigInteger.fromNumber(rewardsPerSecond)
        .mul(timeElapsed)
        .add(claimable)
        .toDecimal(8)}{" "}
      <span>{symbol}</span>
    </div>
  );
  // const [timeElapsed, setTimeElapsed] = useState(0);
  // const rewards = u.BigInteger.fromNumber(rewardsPerSecond).mul(timeElapsed).mul(1000000000000000000).div(tokensStaked);
  // const accumulatedRewards = u.BigInteger.fromNumber(accumulatedRewardsPerShare).add(rewards);
  // const rewardsToHarvest = accumulatedRewards.mul(share).div(1000000000000000000).sub(rewardDebt).add(claimable);
  //
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeElapsed(timeElapsed + 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [timeElapsed]);
  // return (
  //   <div className="has-text-right">
  //     {rewardsToHarvest.toDecimal(8)} <span>{symbol}</span>
  //   </div>
  // );
};

export default CounterUp;
