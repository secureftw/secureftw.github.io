import React from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../../common/hooks/use-app";
import { MENU } from "../../consts";
import { useWallet } from "../../packages/provider";
// tslint:disable-next-line:no-submodule-imports
import { FaMedium, FaTwitter } from "react-icons/all";

const SidebarNav = (props) => {
  const { network } = useWallet();
  const { toggleSidebar } = useApp();
  return (
    <>
      <aside className="menu p-5">
        <p className="menu-label">Menu</p>
        <ul className="menu-list">
          {MENU.map((route, i) => {
            if (!route.network.includes(network)) return false;
            return (
              <li key={`${route.label}${i}`}>
                <NavLink
                  onClick={toggleSidebar}
                  activeClassName={"is-active"}
                  to={route.path}
                >
                  {route.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="p-5" style={{ position: "absolute", bottom: "40px" }}>
        <div className="buttons">
          <div className="button is-white has-text-info">
            <FaTwitter />
          </div>
          <div className="button is-white">
            <FaMedium />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
