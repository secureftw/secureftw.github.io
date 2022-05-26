import React, { useState } from "react";
import Pagination from "bulma-pagination-react";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { useWallet } from "../../../../../packages/provider";
import TruncatedAddress from "../../../../components/TruncatedAddress";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";

interface IHistoryProps {
  tokenA: string;
  tokenB: string;
}
const History = ({ tokenA, tokenB }: IHistoryProps) => {
  const { network } = useWallet();
  // const location = useLocation();
  // const params = queryString.parse(location.search);
  // const { tokenA, tokenB, page } = params;
  // const [currentPage, setPage] = useState(page ? (page as string) : "1");
  const [currentPage, setPage] = useState("1");

  const { isLoaded, error, data } = useOnChainData(() => {
    return new SwapContract(network).getSwapHistory(
      tokenA as string,
      tokenB as string,
      currentPage
    );
  }, [network, currentPage]);
	console.log(data)
  return (
    <div>
	    <h1 className="is-size-5 has-text-weight-bold">Swap History</h1>
      {/*<HeaderBetween path={SWAP_PATH} title={"Swap history"} />*/}
      <hr />
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>In</th>
              <th>Out</th>
              <th>Address</th>
              <th>At</th>
            </tr>
          </thead>
          <tbody>
            {!isLoaded ? (
              <tr>
                <td>Loading..</td>
              </tr>
            ) : error ? (
              <div>{error}</div>
            ) : data ? (
              data.items.length > 0 ? (
                data.items.map((swap, i) => {
                  return (
                    <tr key={`swap-${i}`}>
                      <td>
                        <strong>{data[swap.tokenIn]}</strong>&nbsp;
                        {swap.amountIn}
                      </td>
                      <td>
                        <strong>{data[swap.tokenOut]}</strong>&nbsp;
                        {swap.amountOut}
                      </td>
                      <td>
                        <TruncatedAddress address={swap.account} />
                      </td>
                      <td>{swap.createdAt}</td>
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
