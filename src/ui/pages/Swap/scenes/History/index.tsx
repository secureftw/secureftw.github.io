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

const History = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { tokenA, tokenB, page, symbolA, symbolB } = params;
  const { network } = useWallet();
  const [isLoading, setLoading] = useState(false);
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
        setData(res);
	      setLoading(false);
      } catch (e: any) {
        console.error(e.message);
        setLoading(false);
      }
    }
    fetch();
  }, [location, currentPage]);
  // if (isLoading) return <div>History loading..</div>;
  // if (!data) return <div>Failed to load data from the chain</div>;
  return (
    <div>
      <HeaderBetween path={SWAP_PATH} title={"Swap history"} />
      <hr />

      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>In</th>
              <th>Out</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>Loading..</td>
              </tr>
            ) : data ? (
              data.items.length > 0 ? (
                data.items.map((swap, i) => {
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
                      <td>
                        <TruncatedAddress address={swap.account} />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No swap history</td>
                </tr>
              )
            ) : (
              <tr>
                <td>Something went wrong</td>
              </tr>
            )}
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
    </div>
  );
};

export default History;
