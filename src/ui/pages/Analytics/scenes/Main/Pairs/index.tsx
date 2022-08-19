import React, { useEffect, useState } from "react";
import { RestAPI } from "../../../../../../packages/neo/api";
import { useWallet } from "../../../../../../packages/provider";
import PairItem from "./PairItem";

const Pairs = (props) => {
  const { network } = useWallet();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const res = await new RestAPI(network).getPairs();
        setData(res);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        // setError(e.message);
      }
    }
    fetch();
  }, []);
  return (
    <div className="table-container">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Liquidity</th>
            <th>Volume</th>
            {/*<th>Fees</th>*/}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((pair) => (
            <PairItem
              key={pair.id}
              tokenA={pair.token_A_id}
              tokenB={pair.token_B_id}
              tokenASymbol={pair.token_A_symbol}
              tokenBSymbol={pair.token_B_symbol}
              network={network}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pairs;
