import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// tslint:disable-next-line:no-submodule-imports
import { FaBars, FaGithub, FaWallet } from "react-icons/fa";
import Logo from "./Logo";
import { useApp } from "../../common/hooks/use-app";
import { useWallet } from "../../packages/provider";
import { utils } from "../../packages/neo";
import { MENU } from "../../consts";
import WalletDropdown from "./WalletDropdown";
import { getWalletIcon } from "../../packages/ui/Wallet/helpers";
import NetworkSwitch from "./NetworkSwitch";
// tslint:disable-next-line:no-submodule-imports
import { FaMedium, FaTwitter } from "react-icons/all";
import { MAINNET, TESTNET } from "../../packages/neo/consts";
import toast from "react-hot-toast";

const Header = () => {
  const { toggleSidebar, toggleWalletSidebar } = useApp();
  const { connectedWallet, network, disConnectWallet, switchNetwork } =
    useWallet();
  const [isActive, setActive] = useState(false);
  const handleDisconnectWallet = () => {
    setActive(false);
    disConnectWallet();
  };
  const handleSwitchNetwork = () => {
    const targetNetwork = network === TESTNET ? MAINNET : TESTNET;
    switchNetwork(targetNetwork);
    setActive(false);
    toast.success(`Network switched. You are on ${targetNetwork}`);
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
                <div className="media" style={{ alignItems: "center" }}>
                  <div className="media-left">
                    <img
                      width="32px"
                      src={getWalletIcon(connectedWallet.key)}
                    />
                  </div>
                  <div className="media-content">
                    {utils.truncateAddress(connectedWallet.account.address)}
                  </div>
                </div>
              </div>
              <hr className="dropdown-divider" />
              <div className="navbar-item">
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      <span
                        className={
                          network === TESTNET
                            ? "has-text-danger"
                            : "has-text-info"
                        }
                      >
                        {" "}
                        {network}
                      </span>
                    </div>
                  </div>

                  <div className="level-right">
                    <div className="level-item">
                      <button
                        onClick={handleSwitchNetwork}
                        className="button is-small"
                      >
                        Switch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/*<hr className="dropdown-divider" />*/}
              {/*<Link*/}
              {/*  onClick={() => setActive(false)}*/}
              {/*  className="navbar-item has-text-dark"*/}
              {/*  to={COLLECTION_PATH}*/}
              {/*>*/}
              {/*  My NFT*/}
              {/*</Link>*/}
              <hr className="dropdown-divider" />
              <a onClick={handleDisconnectWallet} className="navbar-item">
                Disconnect wallet
              </a>
            </div>
          </div>
        )}

        <div className="navbar-menu ml-3">
          <div className="navbar-start">
            {MENU.map((route, i) => {
              if (!route.network.includes(network)) return false;
              return (
                <NavLink
                  key={`header-${route.label}${i}`}
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
            <a
              target="_blank"
              href="https://twitter.com/N3_FTW_NETWORK"
              className="button is-white is-small "
            >
              <FaTwitter />
            </a>
            <a
              target="_blank"
              href="https://github.com/ForTheWinn"
              className="button is-white is-small"
            >
              <FaGithub />
            </a>
            <a
              target="_blank"
              href="https://medium.com/@Forthewin_network"
              className="button is-white is-small"
            >
              <FaMedium />
            </a>
          </div>
          <div className="navbar-item">
            <NetworkSwitch />
          </div>
          {/*<PendingTransaction />*/}
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
