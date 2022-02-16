import React from "react";
import { useWallet } from "../../provider";
import { DEV } from "../../neo/consts";
import { getWalletIcon } from "./helpers";

const WalletList = () => {
  const { connectWallet, list, useDevWallet } = useWallet();
  return (
    <>
      <p className="subtitle is-6">
        Connect with one of our available wallet info providers or create a new
        one.
      </p>
      <nav className="panel">
        {list.map((_wallet) => {
          if (!useDevWallet && _wallet.key === DEV) return false;
          return (
            <a
              key={_wallet.key}
              className="panel-block"
              onClick={() => connectWallet(_wallet.key)}
            >
              <span className="panel-icon">
                <img src={getWalletIcon(_wallet.key)} />
                {/*<_wallet.img />*/}
                {/*<i className="fas fa-book" aria-hidden="true"></i>*/}
              </span>
              {_wallet.label}
            </a>
          );
        })}
      </nav>
    </>
  );
};

export default WalletList;
