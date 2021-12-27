import React from "react";
import { Link, useLocation } from "react-router-dom";

interface IBanner {
	arenaNo: string
}
const Banner = ({arenaNo}: IBanner) => {
  return (
    <section className="hero is-white">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div>
                <h1 className="title">Arena {arenaNo}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <ul>
              {/*<li*/}
              {/*  className={*/}
              {/*    location.pathname === PLAYERS_PATH ? "is-active" : ""*/}
              {/*  }*/}
              {/*>*/}
              {/*  <Link to={PLAYERS_PATH}>Players</Link>*/}
              {/*</li>*/}
              {/*<li*/}
              {/*  className={*/}
              {/*    location.pathname === HISTORY_PATH ? "is-active" : ""*/}
              {/*  }*/}
              {/*>*/}
              {/*  <Link to={HISTORY_PATH}>Champions</Link>*/}
              {/*</li>*/}
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Banner;
