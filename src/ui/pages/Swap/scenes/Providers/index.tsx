import React, { useState } from "react";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { useWallet } from "../../../../../packages/provider";
import TruncatedAddress from "../../../../components/TruncatedAddress";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import Pagination from "bulma-pagination-react";
import { numberTrim } from "../../../../../packages/neo/utils";
interface IProvidersProps {
  tokenA: string;
  tokenB: string;
  totalShare?: number;
}

const Providers = ({ tokenA, tokenB, totalShare }: IProvidersProps) => {
  const [currentPage, setPage] = useState(1);
  const { network } = useWallet();

  const { isLoaded, error, data } = useOnChainData(() => {
    return new SwapContract(network).getLPList(
      tokenA as string,
      tokenB as string,
      currentPage
    );
  }, [network, currentPage]);
  return (
    <div>
      <h1 className="title is-5">LP list</h1>
      <div className="table-container is-small">
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Token Id</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Lock</th>
              <th>Provided by</th>
            </tr>
          </thead>
          <tbody>
            {!isLoaded ? (
              <tr>
                <td colSpan={4}>Loading..</td>
              </tr>
            ) : error ? (
              <div>{error}</div>
            ) : data && data.items.length === 0 ? (
              <tr>
                <td>No LP History</td>
              </tr>
            ) : (
              data.items.map((lp, i) => {
                const percentage =
                  totalShare && totalShare > 0
                    ? (lp.amount / totalShare) * 100
                    : 0;
                const owership =
                  percentage >= 1 ? numberTrim(percentage) : "<1";
                return (
                  <tr key={`lp-${i}`}>
	                  <td>{lp.tokenId}</td>
                    <td>{lp.isActive ? "Active" : "Withdrawn"}</td>
                    <td>{owership}%</td>
                    <td>{lp.lock}</td>
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
  );
};

export default Providers;
