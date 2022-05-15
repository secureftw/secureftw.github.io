import React from "react";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import PoolCard from "../../components/PoolCard";
import PoolHeader from "./PoolHeader";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";

const PairList = () => {
  const { network, connectedWallet } = useWallet();
  const { isLoaded, error, data } = useOnChainData(() => {
    return new SwapContract(network).getPairs();
  }, [connectedWallet, network]);
  return (
    <div>
      <PoolHeader />
      <hr />
      {!isLoaded ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        data.map((item, i) => {
          return <PoolCard key={`pool-${i}`} {...item} />;
        })
      )}
    </div>
  );
};

export default PairList;
