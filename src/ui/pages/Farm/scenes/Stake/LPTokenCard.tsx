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
