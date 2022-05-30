import React from "react";
import { ILPToken } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";

interface IPositionCardProps extends ILPToken {
  TVL: number;
  createdAt: string;
  onUnStake: (tokenId: string) => void;
}
const PositionCard = ({
  tokenId,
  amount,
  onUnStake,
  TVL,
  createdAt,
}: IPositionCardProps) => {
  return (
    <div className="media">
      <div className="media-content">
        <strong>{tokenId}</strong>
        <br />
        <small>Share of pool: {((amount / TVL) * 100).toFixed(2)}%</small>
        <br />
        <small>Staked at {createdAt}</small>
      </div>
      <div className="media-right">
        <button onClick={() => onUnStake(tokenId)} className="button is-light">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default PositionCard;
