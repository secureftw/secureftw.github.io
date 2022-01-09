import React, { useState } from "react";
import { SMITH_PATH, TOURNAMENT_PATH } from "../../../consts";
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
          <div className="buttons">
            <button
              onClick={() => setNep11FormModalActive(true)}
              className="button is-primary press-font"
            >
              Deploy NEP11
            </button>
            <button
              onClick={() => setNep17FormModalActive(true)}
              className="button is-primary press-font"
            >
              Deploy NEP17
            </button>
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
                <Link to={SMITH_PATH}>NEP11 (NFT)</Link>
              </li>
              <li
                className={
                  location.pathname === SMITH_PATH + "/nep17" ? "is-active" : ""
                }
              >
                <Link to={SMITH_PATH + "/nep17"}>NEP17 (Token)</Link>
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
