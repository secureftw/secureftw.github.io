import React from "react";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import PoolCard from "./PoolListItem";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";

interface IPairListProps {
  onPairClick: (tokenA, tokenB) => void;
}
const PairList = ({ onPairClick }: IPairListProps) => {
  const { network, connectedWallet } = useWallet();
  const { isLoaded, error, data } = useOnChainData(() => {
    return new SwapContract(network).getPairs();
  }, [connectedWallet, network]);
  return (
    <div>
      <h1 className="title is-5 ">Pool List</h1>
      {!isLoaded ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : data.length === 0 ? (
        <div>No available pairs yet</div>
      ) : (
        <div className="panel">
          {data.map((item, i) => {
            return (
              <PoolCard onPairClick={onPairClick} key={`pool-${i}`} {...item} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PairList;
