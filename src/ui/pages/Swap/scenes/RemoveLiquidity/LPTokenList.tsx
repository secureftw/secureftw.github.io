import moment from "moment";
import React from "react";
import { toDecimal } from "../../../../../packages/neo/utils";
interface ILPTokenListProps {
  tokenId: string;
  name: string;
  amount: string;
  lock: string;
  onRemove: (tokenId: string) => void;
}
const LPTokenList = (props: ILPTokenListProps) => {
  console.log(props);
  const now = moment.utc().valueOf();
  return (
    <div className="media">
      <div className="media-content">
        {props.name} / {toDecimal(props.amount)}
        <br />
        {props.lock && props.lock !== "0" ? (
          <div>Locked until {moment(parseFloat(props.lock)).format("lll")}</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="media-right">
        <button
          disabled={
            props.lock && props.lock !== "0"
              ? now < parseFloat(props.lock)
              : false
          }
          onClick={() => props.onRemove(props.tokenId)}
          className="button is-light is-small"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default LPTokenList;
