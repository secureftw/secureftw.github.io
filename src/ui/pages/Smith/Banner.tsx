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
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Smith</h1>
          <p className="subtitle">
            Create your token smart contracts without codes
          </p>
          <br />
          <div className="columns">
            <div className="column">
              <div className="box content has-background-info has-text-white">
                <h5 className="has-text-light">Token</h5>
                <p>
                  Neo blockchain's token smart contract. Like ERC20 Shiba Inu.
                </p>
                <Link to={SMITH_CREATE_NEP17_PATH} className="button is-light">
                  Create Token Contract
                </Link>
              </div>
            </div>
            <div className="column">
              <div className="box content has-background-info  has-text-white">
                <h5 className="has-text-white">NFT</h5>
                <p>
                  Neo blockchain's NFT smart contract. Like ERC721 Cryptopunk
                  NFT.
                </p>
                <Link to={SMITH_CREATE_NEP11_PATH} className="button  is-light">
                  Create NFT Contract
                </Link>
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
                <Link to={SMITH_PATH_NEP11}>
                  {/*<BsLightbulb />*/}
                  &nbsp; NFT Showcase
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/*{isNep11FormModalActive && (*/}
      {/*  <NEP11FormModal onClose={() => setNep11FormModalActive(false)} />*/}
      {/*)}*/}
      {/*{isNep17FormModalActive && (*/}
      {/*  <NEP17FormModal />*/}
      {/*)}*/}
    </section>
  );
};

export default Banner;
