import React from "react";
import { IFarmSnapshot } from "../../../packages/neo/contracts/ftw/gas-fi/interfaces";

interface ISnapshotListProps {
  item: IFarmSnapshot;
}
const SnapshotCard = ({ item }: ISnapshotListProps) => {
  return (
    <div key={item.createdAt} className="media">
      <div className="media-left">#{item.no}</div>
      <div className="media-content">
        Position: <span className="is-capitalized">{item.winPosition}</span>
        <br />
        GAS: {item.totalGas}
        <br />
        {item.createdAt}
      </div>
    </div>
  );
};

export default SnapshotCard;
