import React, { useEffect, useState } from "react";
// tslint:disable-next-line:no-implicit-dependencies
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { useWallet } from "../../../../../packages/provider";
import { SWAP_PATH } from "../../../../../consts";
import HeaderBetween from "../../../../components/HeaderBetween";
import TruncatedAddress from "../../../../components/TruncatedAddress";

const Providers = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { tokenA, tokenB, symbolA, symbolB } = params;
  const { network } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await new SwapContract(network).getLPList(tokenA, tokenB);
        setLoading(false);
        setData(res);
      } catch (e: any) {
        console.error(e);
        setLoading(false);
      }
    }
    fetch();
  }, [location]);

  return (
    <div>
      <HeaderBetween path={SWAP_PATH} title={"LP list"} />
      <hr />

      <div className="table-container is-small">
        <table className="table is-fullwidth is-small">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Lock</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>Loading..</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td>No NP</td>
              </tr>
            ) : (
              data.map((lp, i) => {
                return (
                  <tr key={`lp-${i}`}>
                    <td>{lp.amount}</td>
                    <td>{lp.lockUntil}</td>
                    <td>
                      <TruncatedAddress address={lp.owner} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Providers;
