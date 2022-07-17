import React, { useState } from "react";
import Pagination from "bulma-pagination-react";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { useWallet } from "../../../../../packages/provider";
import TruncatedAddress from "../../../../components/TruncatedAddress";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import { withDecimal } from "../../../../../packages/neo/utils";

interface IHistoryProps {
  tokenA: string;
  tokenB: string;
}
const History = ({ tokenA, tokenB }: IHistoryProps) => {
  const { network } = useWallet();
  const [currentPage, setPage] = useState(1);
  const { isLoaded, error, data } = useOnChainData(() => {
    return new SwapContract(network).getSwapHistory(
      tokenA as string,
      tokenB as string,
      currentPage
    );
  }, [network, currentPage]);
  return (
    <div>
      {/*<h1 className="is-size-5 has-text-weight-bold">Swap History</h1>*/}
      <div className="table-container">
        <table className="table is-fullwidth is-bordered is-striped">
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
                <td colSpan={4}>Loading..</td>
              </tr>
            ) : error ? (
              <div>{error}</div>
            ) : data ? (
              data.items.length > 0 ? (
                data.items.map((swap, i) => {
                  return (
                    <tr key={`swap-${i}`}>
                      <td>
                        {withDecimal(
                          swap.amountIn,
                          data.pair[swap.tokenIn].decimals,
                          true
                        )}
                        &nbsp;
                        <strong>{data.pair[swap.tokenIn].symbol}</strong>
                      </td>
                      <td>
                        {withDecimal(
                          swap.amountOut,
                          data.pair[swap.tokenOut].decimals,
                          true
                        )}
                        &nbsp;
                        <strong>{data.pair[swap.tokenOut].symbol}</strong>
                      </td>
                      <td>
                        <TruncatedAddress address={swap.owner} />
                      </td>
                      <td>{swap.createdAt}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}>No swap history</td>
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
