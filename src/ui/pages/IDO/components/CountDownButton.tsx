import React from "react";
import ConnectWalletButton from "../../../components/ConnectWalletButton";

const CountDownButton = ({ hours, minutes, seconds, completed ,connectedWallet, onClick }) => {
  if (completed) {
    // Render a completed state
    return connectedWallet ? (
      <button onClick={onClick} className="button is-primary is-fullwidth">Swap</button>
    ) : (
      <ConnectWalletButton />
    );
  } else {
    // Render a countdown
    return (
      <button className="button is-primary is-fullwidth">
        {hours} Day : {minutes} Min : {seconds} Sec
      </button>
    );
  }
};

export default CountDownButton;
