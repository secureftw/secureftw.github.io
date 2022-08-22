import React, { useEffect, useState } from "react";
import PageLayout from "../../../../components/PageLayout";
import SwapHistory from "./SwapHistory";
import { useWallet } from "../../../../../packages/provider";
import { RestAPI } from "../../../../../packages/neo/api";

interface IPairDetailProps{
	pairId: string
}
const PairDetail = ({pairId}: IPairDetailProps) => {
  const { network } = useWallet();
  const pairs = pairId.split("_");
  const tokenA = pairs[0];
  const tokenB = pairs[1];
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch() {
      setError("");
      setLoading(true);
      try {
        const res = await new RestAPI(network).getPair(pairId);
        setData(res);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    }
    fetch();
  }, [network]);
  console.log(data);

  return (
    <PageLayout>
      <div>
        {data ? (
          <div className="columns">
            <div className="column">
              <SwapHistory
                tokenA={tokenA}
                tokenB={tokenB}
                network={network}
                pairs={{
                  [data.tokenA.id]: {
                    ...data.tokenA,
                  },
                  [data.tokenB.id]: {
                    ...data.tokenB,
                  },
                }}
              />
            </div>
            <div className="column"></div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </PageLayout>
  );
};

export default PairDetail;
