import React from "react";
import moment from "moment";

interface IVotingPeriod {
  start: number;
  end: number;
}
const VotingPeriod = ({ start, end }: IVotingPeriod) => {
  return (
    <div className="content">
      <strong>Start date</strong>
      <br />
      <small>{moment(start).format("LLL")}</small>
      <br />
      <strong>End date</strong>
      <br />
      <small>{moment(end).format("LLL")}</small>
      <br />
    </div>
  );
};

export default VotingPeriod;
