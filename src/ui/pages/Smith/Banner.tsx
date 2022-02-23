import React, { useState } from "react";
import { SMITH_PATH, SMITH_PATH_NEP11, TOURNAMENT_PATH } from "../../../consts";
import { Link, useLocation } from "react-router-dom";
import NEP17FormModal from "./NEP17FormModal";
import NEP11FormModal from "./NEP11FormModal";

const Banner = () => {
  const location = useLocation();
  const [isNep11FormModalActive, setNep11FormModalActive] = useState(false);
  const [isNep17FormModalActive, setNep17FormModalActive] = useState(false);
  return (
    <section className="hero is-white">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Forthewin Smith</h1>
          <p className="subtitle">
            Create your own NEP11 and NEP17 smart contracts without any codes
          </p>
          <br />
          <div className="content">
            <h5>What is NEP17?</h5>
            <p>Neo blockchain's token standard. Like ERC20 Shiba Inu.</p>
            <button
              onClick={() => setNep17FormModalActive(true)}
              className="button is-primary"
            >
              Create Token Contract
            </button>
          </div>

          <div className="content">
            <h5>What is NEP11?</h5>
            <p>Neo blockchain's NFT standard. Like ERC721 Cryptopunk NFT.</p>
          </div>

          <button
            onClick={() => setNep11FormModalActive(true)}
            className="button  is-primary is-outlined"
          >
            Create NFT Contract
          </button>
        </div>
      </div>
      <div className="hero-foot">
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <ul>
              <li
                className={location.pathname === SMITH_PATH ? "is-active" : ""}
              >
                <Link to={SMITH_PATH}>NEP17 Showcase</Link>
              </li>
              <li
                className={
                  location.pathname === SMITH_PATH_NEP11 ? "is-active" : ""
                }
              >
                <Link to={SMITH_PATH_NEP11}>NEP11 Showcase</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {isNep11FormModalActive && (
        <NEP11FormModal onClose={() => setNep11FormModalActive(false)} />
      )}
      {isNep17FormModalActive && (
        <NEP17FormModal onClose={() => setNep17FormModalActive(false)} />
      )}
    </section>
  );
};

export default Banner;
