import React, { useState } from "react";
import { useWallet } from "../../provider";
import { getWalletIcon } from "./helpers";
import { IWalletType } from "../../neo/wallet/interfaces";
import Modal from "../../../ui/components/Modal";

const WalletList = () => {
  const [neonWalletConnecting, setNeonWalletConnecting] = useState(false);
  const { connectWallet, list } = useWallet();
  const handleWalletConnect = async (walletType: IWalletType) => {
    connectWallet(walletType);
  };
  return (
    <>
      <p className="subtitle is-6">
        Connect with one of our available wallet info providers or create a new
        one.
      </p>
      <nav className="panel">
        {list.map((_wallet) => {
          return (
            <a
              key={_wallet.key}
              className="panel-block"
              onClick={() => handleWalletConnect(_wallet.key)}
            >
              <span className="panel-icon">
                <img src={getWalletIcon(_wallet.key)} />
              </span>
              {_wallet.label}
            </a>
          );
        })}
      </nav>

      {neonWalletConnecting && (
        <Modal onClose={() => setNeonWalletConnecting(false)}>
          <div className="box">
            <figure className="image">
              <img src={"/icon/neon.svg"} />
            </figure>
            <p>Check your neon wallet</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default WalletList;
