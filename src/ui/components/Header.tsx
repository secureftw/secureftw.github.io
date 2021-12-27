import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// tslint:disable-next-line:no-submodule-imports
import { FaBars, FaWallet } from "react-icons/fa";
import Logo from "./Logo";
import { useApp } from "../../common/hooks/use-app";
import { useWallet } from "../../packages/provider";
import { utils } from "../../packages/neo";
import { COLLECTION_PATH, MENU } from "../../consts";
import PendingTransaction from "../../packages/ui/PendingTransaction";
import WalletDropdown from "./WalletDropdown";
import { getWalletIcon } from "../../packages/ui/Wallet/helpers";
import NetworkSwitch from "./NetworkSwitch";

const Header = () => {
  const { toggleSidebar, toggleWalletSidebar } = useApp();
  const { connectedWallet, network, disConnectWallet } = useWallet();
  const [isActive, setActive] = useState(false);
  const handleDisconnectWallet = () => {
    setActive(false);
    disConnectWallet();
  };
  return (
    <nav
      className="navbar has-shadow is-white is-fixed-top"
      role="navigation"
      aria-label="main navigation"
      style={{ height: "52px" }}
    >
      <div className="container">
        <div
          className="navbar-brand"
          style={{ justifyContent: "space-between" }}
        >
          <div
            role="button"
            className="navbar-burger is-center is-hidden-tablet"
            style={{ marginLeft: 0 }}
            onClick={toggleSidebar}
          >
            <FaBars />
          </div>
          <Link className="has-text-white navbar-item is-center" to="/">
            <Logo />
          </Link>
          <div
            role="button"
            className={`navbar-burger is-center is-hidden-desktop`}
            onClick={() => {
              if (connectedWallet) {
                setActive(!isActive);
              } else {
                toggleWalletSidebar();
              }
            }}
            style={{ marginLeft: 0 }}
          >
            <FaWallet />
          </div>
        </div>
        {connectedWallet && (
          <div
            className={`navbar-menu  is-hidden-tablet ${
              isActive && "is-active"
            }`}
          >
            <div className="navbar-start">
              <div className="navbar-item">
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
              <Link
                onClick={() => setActive(false)}
                className="navbar-item has-text-dark"
                to={COLLECTION_PATH}
              >
                My NFT
              </Link>
              <hr className="dropdown-divider" />
              <a onClick={handleDisconnectWallet} className="navbar-item">
                Disconnect wallet
              </a>
            </div>
          </div>
        )}

        <div className="navbar-menu ml-3">
          <div className="navbar-start">
            {MENU.map((route) => {
              if (!route.network.includes(network)) return <></>;
              return (
                <NavLink
                  key={route.label}
                  activeClassName="is-active"
                  to={route.path}
                  className="navbar-item"
                >
                  <strong>{route.label}</strong>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="navbar-end is-hidden-touch">
          <div className="navbar-item">
            <NetworkSwitch />
          </div>
          <PendingTransaction />
          <div className="navbar-item">
            <div className="buttons">
              {connectedWallet ? (
                <WalletDropdown connectedWallet={connectedWallet} />
              ) : (
                <button
                  onClick={toggleWalletSidebar}
                  className="button is-small is-black is-rounded"
                >
                  Connect wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
