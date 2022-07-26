import React, { useEffect } from "react";
import Wave from "react-wavify";
import {
  DAO_PATH,
  FARM_V2_PATH,
  LOCKER_PATH,
  SMITH_PATH,
  SWAP_PATH,
} from "../../consts";
import { Link } from "react-router-dom";

const CARDS: {
  title: string;
  type: string;
  desc?: string;
  img: string;
  link: string;
}[] = [
  {
    title: "Mint",
    type: "Utility",
    img: "520/smith.png",
    link: SMITH_PATH,
  },
  {
    title: "Swap",
    type: "DeFi",
    img: "520/swap.png",
    link: SWAP_PATH,
  },
  {
    title: "Staking",
    type: "DeFi",
    img: "520/farm.png",
    link: FARM_V2_PATH,
  },
  {
    title: "Vesting",
    type: "Utility",
    img: "520/rune.png",
    link: LOCKER_PATH,
  },
  {
    title: "DAO",
    type: "Utility",
    img: "520/dao.png",
    link: DAO_PATH,
  },
  {
    title: "NEP",
    type: "Governance token",
    img: "520/nep.png",
    link: "/swap?tokenA=d2a4cff31913016155e38e474a2c06d08be276cf&tokenB=f853a98ac55a756ae42379a312d55ddfdf7c8514",
  },
];

const Home = () => {
  useEffect(() => {
    document.title = "FTW";
  }, []);
  return (
    <div>
      <section className="hero is-white is-fullheight-with-navbar is-relative">
        <div className="hero-body">
          <div className="container">
            <div className="has-text-centered mb-6">
              <h1 className="title is-spaced is-size-4-mobile">
                Forthewin Network
              </h1>
              {/*<p className="subtitle is-size-6-mobile">The hub of NEP-17</p>*/}
              <p className="subtitle is-size-6-mobile">
                All-in-one solution for crypto startups
              </p>
            </div>

            <div className="columns is-multiline is-mobile">
              {CARDS.map((card) => {
                return (
                  <div
                    key={card.title}
                    className="column is-2-desktop is-4-mobile"
                  >
                    <div className="is-shadowless">
                      <Link to={card.link}>
                        <figure
                          className="image is-128x128-desktop"
                          style={{ margin: "auto" }}
                        >
                          <img src={card.img} />
                        </figure>
                      </Link>
                      <p className="is-size-6 is-size-7-mobile has-text-centered">
                        <Link className={"has-text-dark"} to={card.link}>
                          {card.title}
                        </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <Wave
            fill="#000"
            paused={false}
            options={{
              height: 10,
              amplitude: 30,
              speed: 0.15,
            }}
          />
          <div
            style={{
              width: "100%",
              height: "10px",
              bottom: 0,
              position: "absolute",
              backgroundColor: "black",
              zIndex: 999,
            }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
