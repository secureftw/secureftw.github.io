import React from "react";
import {
  SMITH_CREATE_NEP11_PATH,
  SMITH_CREATE_NEP17_PATH,
  SMITH_PATH,
  SMITH_PATH_NEP11,
} from "../../../consts";
import { Link, useLocation } from "react-router-dom";
import { FaCoins } from "react-icons/fa";

const Banner = () => {
  const location = useLocation();
  return (
    <section className="hero is-white">
      <div className="hero-body is-center">
        <div className="container">
          <div className="columns">
            <div className="column is-flex is-hidden-mobile" style={{ alignItems: "center" }}>
              <figure
                className="image"
                style={{ width: "250px", margin: "0 auto" }}
              >
                <img src="/logo/NEP_Logo_Smith.svg" />
              </figure>
            </div>
            <div className="column is-flex" style={{ alignItems: "center" }}>
              <div className="">
                <h1 className="title ">Smith</h1>
                <p className="subtitle">
                  Create your token smart contracts without codes
                </p>
                <div className="content">
                  <li>
                    <a
                      target="_blank"
                      href={"https://docs.forthewin.network/smith"}
                    >
                      Tutorial for token contract
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href={
                        "https://medium.com/@Forthewin_network/diy-nft-smart-contract-on-neo-without-codes-82957811f5ff"
                      }
                    >
                      Tutorial for NFT contract
                    </a>
                  </li>
                </div>
                <br />
                <div className="buttons">
                  <Link
                    to={SMITH_CREATE_NEP17_PATH}
                    className="button is-success is-light"
                  >
                    Create Token Contract
                  </Link>
                  <Link
                    to={SMITH_CREATE_NEP11_PATH}
                    className="button is-info is-light"
                  >
                    Create NFT Contract
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <ul>
              <li
                className={location.pathname === SMITH_PATH ? "is-active" : ""}
              >
                <Link to={SMITH_PATH}>
                  <FaCoins />
                  &nbsp; Token Showcase
                </Link>
              </li>
              <li
                className={
                  location.pathname === SMITH_PATH_NEP11 ? "is-active" : ""
                }
              >
                <Link to={SMITH_PATH_NEP11}>&nbsp; NFT Showcase</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Banner;
