import React, { useEffect, useState } from "react";
import { useWallet } from "../../packages/provider";
import { MAINNET, TESTNET } from "../../packages/neo/consts";
const NetworkSwitch = () => {
  const [isActive, setActive] = useState(false);
  const { network, switchNetwork } = useWallet();

  const onActive = () => setActive(!isActive);
  const handleNetworkChange = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure to switch network?")) {
      switchNetwork(network === TESTNET ? MAINNET : TESTNET);
      setActive(false);
    }
  };
  return (
    <div className={`dropdown is-right ${isActive ? "is-active" : ""}`}>
      <div className="dropdown-trigger">
        <button
          onClick={onActive}
          className={`button is-small ${
            network === TESTNET ? "is-danger" : "is-white"
          }`}
          aria-controls="dropdown-wallet"
        >
          {network}
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-wallet" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <a onClick={handleNetworkChange}>
              {network === TESTNET ? `Switch to Mainnet` : `Switch to Testnet`}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSwitch;
