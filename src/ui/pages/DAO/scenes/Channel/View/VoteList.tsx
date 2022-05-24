import React from "react";
import { useOnChainData } from "../../../../../../common/hooks/use-onchain-data";
import { DaoContract } from "../../../../../../packages/neo/contracts/ftw/dao";
import { INetworkType } from "../../../../../../packages/neo/network";
import TruncatedAddress from "../../../../../components/TruncatedAddress";

interface IVoteListProps {
  network: INetworkType;
  contractHash: string;
  proposalNo: string;
  options: string[];
}
const VoteList = ({
  network,
  contractHash,
  proposalNo,
  options,
}: IVoteListProps) => {
  const { isLoaded, error, data } = useOnChainData(() => {
    return new DaoContract(network).getVotes(
      contractHash,
      proposalNo,
      "5",
      "1"
    );
  }, []);
  console.log(error);
  console.log(data);

  return (
    <div className="table-container">
      <table className="table is-fullwidth">
        {isLoaded &&
          data.items.map((item, i) => {
            return (
              <tr key={`vote-${i}`}>
                <td>
                  <TruncatedAddress address={item.creator} />
                </td>
                <td>{options[parseFloat(item.optionIndex)]}</td>
                <td>{item.weight}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default VoteList;
