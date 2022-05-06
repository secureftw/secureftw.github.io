import React from "react";

interface IPositionCardProps {
  tokenId: string;
  amount: string;
  onUnStake: (tokenId: string) => void;
}
const PositionCard = ({ tokenId, amount, onUnStake }: IPositionCardProps) => {
  return (
    <div className="media">
      <div className="media-content">
        {tokenId}
        <br />
        {amount}
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
