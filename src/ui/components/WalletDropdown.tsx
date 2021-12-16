import React, { useEffect, useState } from "react";
import { utils } from "../../packages/neo";
import { IConnectedWallet } from "../../packages/neo/wallet/interfaces";
import { useWallet } from "../../packages/provider";
import { useApp } from "../../common/hooks/use-app";
import { getWalletIcon } from "../../packages/ui/Wallet/helpers";
import { COLLECTION_PATH } from "../../consts";
import { NavLink } from "react-router-dom";
import { NEO_LINE, O3 } from "../../packages/neo/consts";
import neo3Dapi from "neo3-dapi";
interface IWalletDropdownProps {
  connectedWallet: IConnectedWallet;
}
const WalletDropdown = ({ connectedWallet }: IWalletDropdownProps) => {
  const [isActive, setActive] = useState(false);
  const { disConnectWallet, connectWallet } = useWallet();
  const { toggleWalletSidebar } = useApp();
  const handleDisconnectWallet = () => {
    setActive(false);
    toggleWalletSidebar();
    disConnectWallet();
  };

  const onActive = () => setActive(!isActive);

  useEffect(() => {
    const refresh = () => {
      connectWallet(connectedWallet.key);
    };
    const disconnected = () => {
      disConnectWallet();
    };

    if (connectedWallet.key === NEO_LINE) {
      window.addEventListener("NEOLine.NEO.EVENT.ACCOUNT_CHANGED", refresh);
      window.addEventListener("NEOLine.NEO.EVENT.NETWORK_CHANGED", refresh);
      window.addEventListener("NEOLine.NEO.EVENT.DISCONNECTED", disconnected);
      return () => {
        window.removeEventListener(
          "NEOLine.NEO.EVENT.ACCOUNT_CHANGED",
          refresh
        );
        window.removeEventListener(
          "NEOLine.NEO.EVENT.NETWORK_CHANGED",
          refresh
        );
        window.removeEventListener(
          "NEOLine.NEO.EVENT.DISCONNECTED",
          disconnected
        );
      };
    }
    if (connectedWallet.key === O3) {
      neo3Dapi.addEventListener(
        neo3Dapi.Constants.EventName.ACCOUNT_CHANGED,
        refresh
      );

      neo3Dapi.addEventListener(
        neo3Dapi.Constants.EventName.NETWORK_CHANGED,
        refresh
      );

      neo3Dapi.addEventListener(
        neo3Dapi.Constants.EventName.DISCONNECTED,
        disconnected
      );

      return () => {
        neo3Dapi.removeEventListener(
          neo3Dapi.Constants.EventName.ACCOUNT_CHANGED,
          refresh
        );
        neo3Dapi.removeEventListener(
          neo3Dapi.Constants.EventName.NETWORK_CHANGED,
          refresh
        );
        neo3Dapi.removeEventListener(
          neo3Dapi.Constants.EventName.DISCONNECTED,
          disconnected
        );
      };
    }
  }, []);
  return (
    <div className={`dropdown is-right ${isActive ? "is-active" : ""}`}>
      <div className="dropdown-trigger">
        <button
          onClick={onActive}
          className="button is-small is-black is-rounded"
          aria-controls="dropdown-wallet"
        >
          <span>{utils.truncateAddress(connectedWallet.account.address)}</span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-wallet" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <div className="media">
              <div className="media-left">
                <img src={getWalletIcon(connectedWallet.key)} />
              </div>
              <div className="media-content">
                {utils.truncateAddress(connectedWallet.account.address)}
              </div>
            </div>
          </div>
          <hr className="dropdown-divider" />
          <NavLink
            className="dropdown-item has-text-dark"
            onClick={() => setActive(false)}
            to={COLLECTION_PATH}
          >
            My NFT
          </NavLink>
          <hr className="dropdown-divider" />
          <a onClick={handleDisconnectWallet} className="dropdown-item">
            Disconnect
          </a>
        </div>
      </div>
    </div>
  );
};

export default WalletDropdown;
