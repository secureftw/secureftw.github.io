import React from "react";
import { useWallet } from "../../packages/provider";
import { MAINNET, TESTNET } from "../../packages/neo/consts";
import toast from "react-hot-toast";

const NetworkSwitch = () => {
  const { network, switchNetwork } = useWallet();
  const handleSwitchNetwork = () => {
    const targetNetwork = network === TESTNET ? MAINNET : TESTNET;
    switchNetwork(targetNetwork);
    toast.success(`Network switched. You are on ${targetNetwork}`);
  };
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          Network:&nbsp;
          <span
            className={
              network === TESTNET ? "has-text-danger" : "has-text-info"
            }
          >
            {" "}
            {network}
          </span>
        </div>
      </div>

      <div className="level-right">
        <div className="level-item">
          <button onClick={handleSwitchNetwork} className="button is-small">
            Switch
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkSwitch;
