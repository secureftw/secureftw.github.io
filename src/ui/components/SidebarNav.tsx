import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useApp } from "../../common/hooks/use-app";
import { FARM_PATH, GALLERY_PATH } from "../../consts";

const SidebarNav = (props) => {
  const location = useLocation();
  const { toggleSidebar } = useApp();
  return (
    <aside className="menu p-5">
      <p className="menu-label">Menu</p>
      <ul className="menu-list">
        <li>
          <NavLink
            onClick={toggleSidebar}
            activeClassName={"is-active"}
            to={FARM_PATH}
          >
            GAS
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={toggleSidebar}
            activeClassName={"is-active"}
            to={GALLERY_PATH}
          >
            FTW NFT
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarNav;
