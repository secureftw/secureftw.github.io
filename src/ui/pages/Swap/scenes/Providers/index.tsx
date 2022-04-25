import React, { useEffect, useState } from "react";
// tslint:disable-next-line:no-implicit-dependencies
import queryString from "query-string";
import Pagination from "bulma-pagination-react";
import { Link, useLocation } from "react-router-dom";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { useWallet } from "../../../../../packages/provider";
import { SWAP_PATH } from "../../../../../consts";
import HeaderBetween from "../../../../components/HeaderBetween";
import TruncatedAddress from "../../../../components/TruncatedAddress";

const Providers = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { tokenA, tokenB, page, symbolA, symbolB } = params;
  const { network } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);
  const [currentPage, setPage] = useState(page ? page : "1");

  const assetObj = {
    [tokenA]: symbolA,
    [tokenB]: symbolB,
  };

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await new SwapContract(network).getLPList(
          tokenA,
          tokenB,
          currentPage
        );
        setLoading(false);
        setData(res);
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
      }
    }
    fetch();
  }, [location, currentPage]);

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
              data.map((swap, i) => {
                return (
                  <tr key={`swap-${i}`}>
                    <td>{swap.amount}</td>
                    <td>{swap.lockUntil}</td>
                    <td>
                      <TruncatedAddress address={swap.owner} />
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
