import React from "react";
interface IChannelCardProps {
  logo?: string;
  symbol: string;
}
const ChannelCard = ({ logo, symbol }: IChannelCardProps) => {
  return (
    <div className="box is-shadowless has-text-centered">
      <div className="circular--portrait">
        <div className="image is-64x64 mb-2" style={{ margin: "auto" }}>
          <img src={logo ? logo : "/symbols/unknown.png"} />
        </div>
      </div>
      <strong>{symbol}</strong>
    </div>
  );
};

export default ChannelCard;
