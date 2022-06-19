import React from "react";
import { useOnChainData } from "../../../common/hooks/use-onchain-data";
import { LottoContract } from "../../../packages/neo/contracts/ftw/lotto";

const List = ({ network }: any) => {
  const { data } = useOnChainData(() => {
    return new LottoContract(network).getTicketList();
  }, [network]);
  return (
    <div className="box is-shadowless">
      <h5 className="title is-5">Latest tickets</h5>
      {data ? (
        <div className="table-container">
          <table className=" table is-fullwidth">
            <tbody>
              {data.items.map((item) => {
                return (
                  <tr key={`ticketlist${item.no}`}>
                    <td>{item.no}</td>
                    <td>{item.owner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default List;
