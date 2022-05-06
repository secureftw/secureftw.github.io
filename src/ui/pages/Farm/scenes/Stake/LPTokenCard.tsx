import moment from "moment";
import React from "react";
import { toDecimal } from "../../../../../packages/neo/utils";
interface ILPTokenCardProps {
  tokenId: string;
  name: string;
  amount: string;
  lock: string;
  onStakeLP: (tokenId: string) => void;
}
const LPTokenCard = (props: ILPTokenCardProps) => {
  return (
    <div className="media">
      <div className="media-content">
        {props.tokenId}
        <br /> {toDecimal(props.amount)}
        {/*<br />*/}
        {/*{props.lock && props.lock !== "0" ? (*/}
        {/*  <div>Locked until {moment(parseFloat(props.lock)).format("lll")}</div>*/}
        {/*) : (*/}
        {/*  <div></div>*/}
        {/*)}*/}
      </div>
      <div className="media-right">
        <button
          onClick={() => props.onStakeLP(props.tokenId)}
          className="button is-primary"
        >
          Stake
        </button>
      </div>
    </div>
  );
};

export default LPTokenCard;
