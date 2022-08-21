import React from "react";
import LogoIcon from "../../../../components/LogoIcon";

interface ISwapTokenCardProps {
  onClick: (contractHash, symbol, decimals) => void;
  contractHash: string;
  symbol: string;
  decimals: number;
  logo: string;
}
const SwapTokenCard = ({
  contractHash,
  symbol,
  decimals,
  onClick,
  logo,
}: ISwapTokenCardProps) => {
  return (
    <div
      className="column is-2-desktop is-2-tablet is-3-mobile"
      onClick={() => onClick(contractHash, symbol, decimals)}
      key={`assets-${contractHash}`}
    >
      <div className="box is-hoverable has-text-centered">
        <LogoIcon img={logo} />
        <span className="is-size-7 has-text-weight-semibold">{symbol}</span>
      </div>
    </div>
  );
};

export default SwapTokenCard;
