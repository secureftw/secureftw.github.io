import React  from "react";
import { IFarmContractStatus } from "../../../packages/neo/contracts/ftw/farm/interfaces";
import moment from "moment";

interface ISnapshotListProps {
  contractStatus?: IFarmContractStatus;
}
const SnapshotList = ({ contractStatus }: ISnapshotListProps) => {
  if (!contractStatus) return <div></div>;
  const tempTime = moment.duration(contractStatus.interval);
  const format = `Every ${
    tempTime.hours() > 0
      ? `${tempTime.hours()} hours ${tempTime.minutes()} mins`
      : `${tempTime.minutes()} mins`
  }`;
  return (
    <div className="">
      <h1 className="title is-4">About</h1>
      <h4 className="title is-6">Current settings</h4>
      <p className="subtitle is-6">
        Position range: {contractStatus.range}
        <br />
        Interval: {format}
      </p>
    </div>
  );
};

export default SnapshotList;
