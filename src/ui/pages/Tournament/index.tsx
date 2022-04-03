import React, { useEffect } from "react";
import { ARENA_PATH } from "./pageRoutes";
import { Link, NavLink, Route, useLocation } from "react-router-dom";
import Arena from "./scenes/Arena";
import { TOURNAMENT_PATH } from "../../../consts";
import { useWallet } from "../../../packages/provider";
import { MAINNET } from "../../../packages/neo/consts";
import PageLayout from "../../components/PageLayout";

const Tournament = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = "Forthewin Arena: NFT tournament on NEO";
  }, []);
  const { network } = useWallet();
  let ARENA_LIST = ["4", "8", "16", "32", "64", "128", "256"];
  if (network === MAINNET) {
    ARENA_LIST = ["8", "16", "32", "64", "128"];
  }
  return (
    <section>
      <section className="hero is-white">
        <div className="hero-body">
          <div className="container">
            <div>
              <h1 className="title">Arenas</h1>
              <div className="content is-small">
                <p>
                  <strong>Smart contract</strong>
                  <br />
                  <a
                    className="has-text-dark is-size-7"
                    href="https://explorer.onegate.space/contractinfo/0x0eb288c413b5d5ec4aa0df5aea34d9538b28dd29"
                  >
                    0x0eb288c413b5d5ec4aa0df5aea34d9538b28dd29
                  </a>
                </p>
                <p>
                  <strong>Press</strong>
                  <br />
                  <a
                    // className="has-text-dark is-size-7"
                    href="https://neonewstoday.com/nft/ftw-arena-tickets-now-on-sale/"
                  >
                    Article 1, &nbsp;
                  </a>
                  <a
                    // className="has-text-dark is-size-7"
                    href="https://neonewstoday.com/gaming/forthewin-opens-the-arena-allowing-runes-to-battle-for-gas-prizes/"
                  >
                    2
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <nav className="tabs is-boxed">
            <div className="container">
              <ul>
                {ARENA_LIST.map((arena) => {
                  return (
                    <li
                      key={arena}
                      className={
                        location.pathname === TOURNAMENT_PATH + "/" + arena ||
                        (location.pathname === TOURNAMENT_PATH &&
                          arena === ARENA_LIST[0])
                          ? "is-active"
                          : ""
                      }
                    >
                      <NavLink
                        activeClassName="is-active"
                        to={TOURNAMENT_PATH + "/" + arena}
                      >
                        ARENA {arena}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </section>
      <PageLayout>
        <div className="box">
          <Route
            exact={true}
            path={TOURNAMENT_PATH}
            component={(route) => (
              <Arena defaultArena={ARENA_LIST[0]} {...route} />
            )}
          />
          <Route
            path={ARENA_PATH}
            component={(route) => (
              <Arena defaultArena={ARENA_LIST[0]} {...route} />
            )}
          />
        </div>
      </PageLayout>
    </section>
  );
};

export default Tournament;
