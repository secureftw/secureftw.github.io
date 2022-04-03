import React, { useEffect, useState } from "react";
// tslint:disable-next-line:no-implicit-dependencies
import queryString from "query-string";
import Pagination from "bulma-pagination-react";
import { Link, useLocation } from "react-router-dom";
import { SwapContract } from "../../../../../../../packages/neo/contracts";
import { useWallet } from "../../../../../../../packages/provider";
import { SWAP_PATH } from "../../../../../../../consts";
import { FaAngleLeft } from "react-icons/all";

const History = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { tokenA, tokenB, page, symbolA, symbolB } = params;
  const { network } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>();
  const [currentPage, setPage] = useState(page ? page : "1");

  const assetObj = {
    [tokenA]: symbolA,
    [tokenB]: symbolB,
  };

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await new SwapContract(network).getSwapHistory(
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
  if (isLoading) return <div>History loading..</div>;
  if (!data) return <div>Failed to load data from the chain</div>;
  return (
    <div>
      <Link className="button is-white" to={SWAP_PATH}>
        <span className="icon">
          <FaAngleLeft />
        </span>
        <span>Pools</span>
      </Link>
      <hr />
      <h1 className="title is-5">Swap history</h1>
      {data.totalItems === "0" ? (
        <p className="subtitle is-6">No data</p>
      ) : (
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>In</th>
                <th>Out</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((swap, i) => {
                const symbolIn = assetObj[swap.tokenIn];
                const symbolOut = assetObj[swap.tokenOut];
                return (
                  <tr key={`swap-${i}`}>
                    <td>
                      <strong>{symbolIn}</strong>&nbsp;{swap.tokenInAmount}
                    </td>
                    <td>
                      <strong>{symbolOut}</strong>&nbsp;{swap.tokenOutAmount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data && data.totalPages > 1 && (
            <div className="media">
              <div className="media-content">
                <Pagination
                  pages={data.totalPages}
                  currentPage={currentPage}
                  onChange={(_page) => {
                    if (currentPage !== _page) {
                      setPage(_page);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
