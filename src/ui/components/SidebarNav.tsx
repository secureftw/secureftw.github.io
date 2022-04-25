import React from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../../common/hooks/use-app";
import { MENU } from "../../consts";
import { useWallet } from "../../packages/provider";
// tslint:disable-next-line:no-submodule-imports
import { FaMedium, FaTwitter } from "react-icons/all";
// tslint:disable-next-line:no-submodule-imports
import { FaGithub } from "react-icons/fa";
import SocialLinkGroup from "./SocialLinkGroup";

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
                {route.category ? (
                  <>
                    <div
                      onClick={toggleSidebar}
                      // activeClassName={"is-active"}
                      // to={route.path}
                    >
                      {route.label}
                    </div>
                    <ul>
                      {route.category.map((item) => {
                        return (
                          <li key={item.label}>
                            <NavLink
                              key={`category-${item.label}`}
                              activeClassName={"is-active"}
                              to={item.path}
                            >
                              {item.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    onClick={toggleSidebar}
                    activeClassName={"is-active"}
                    to={route.path}
                  >
                    {route.label}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="p-5" style={{ position: "absolute", bottom: "40px" }}>
        <div className="buttons">
          <SocialLinkGroup />
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
