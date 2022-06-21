import { u } from "@cityofzion/neon-core";
import React, { useEffect, useState } from "react";
interface ICounterUpProps {
  claimable: number;
  rewardsPerDay: number;
}
const CounterUp = ({ claimable, rewardsPerDay }: ICounterUpProps) => {
  const [timeElapsed, setTimeElapsed] = useState(1);
  const perSec = u.BigInteger.fromNumber(rewardsPerDay).div(86400);
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
      {perSec.mul(timeElapsed).add(claimable).toDecimal(8)} <span>NEP</span>
    </div>
  );
};

export default CounterUp;
