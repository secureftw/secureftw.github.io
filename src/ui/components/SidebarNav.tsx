import React from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../../common/hooks/use-app";
import { GALLERY_PATH, MENU, SMITH_PATH } from "../../consts";
import { useWallet } from "../../packages/provider";

const SidebarNav = (props) => {
  const { network } = useWallet();
  const { toggleSidebar } = useApp();
  return (
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
  );
};

export default SidebarNav;
