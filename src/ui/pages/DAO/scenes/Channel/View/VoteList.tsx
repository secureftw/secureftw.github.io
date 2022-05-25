import React from "react";
import { useOnChainData } from "../../../../../../common/hooks/use-onchain-data";
import { DaoContract } from "../../../../../../packages/neo/contracts/ftw/dao";
import { INetworkType } from "../../../../../../packages/neo/network";
import TruncatedAddress from "../../../../../components/TruncatedAddress";

interface IVoteListProps {
  network: INetworkType;
  contractHash: string;
  symbol: string;
  proposalNo: string;
  options: string[];
}
const VoteList = ({
  network,
  contractHash,
  proposalNo,
  options,
	symbol
}: IVoteListProps) => {
  const { isLoaded, error, data } = useOnChainData(() => {
    return new DaoContract(network).getVotes(
      contractHash,
      proposalNo,
      "5",
      "1"
    );
  }, [network]);
  return (
    <div className="table-container">
      <h1 className="title is-6">
        Votes {data && <span className="tag">{data.totalItems}</span>}{" "}
      </h1>
      {isLoaded ? (
        data.items.length > 0 ? (
          <div className="table-container">
            <table className="table is-fullwidth">
              {data.items.map((item, i) => {
                return (
                  <tr key={`vote-${i}`}>
                    <td>
                      <TruncatedAddress address={item.creator} />
                    </td>
                    <td>{options[parseFloat(item.optionIndex)]}</td>
                    <td>{item.amount} {symbol}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <div>No votes yet</div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default VoteList;
