import React, {useEffect} from "react";
import Wave from "react-wavify";
import {
  DAO_PATH,
  FARM_PATH,
  GALLERY_PATH,
  IDO_PATH,
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
    title: "Swap",
    type: "DeFi",
    img: "520/swap.png",
    link: SWAP_PATH,
  },
  {
    title: "Smith",
    type: "Utility",
    img: "520/smith.png",
    link: SMITH_PATH,
  },
  {
    title: "Farm",
    type: "DeFi",
    img: "520/farm.png",
    link: FARM_PATH,
  },
  {
    title: "DAO",
    type: "Utility",
    img: "520/dao.png",
    link: DAO_PATH,
  },
  {
    title: "Rune",
    type: "NFT",
    img: "520/rune.png",
    link: GALLERY_PATH,
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
            <div className="has-text-centered mb-5">
              <h1 className="title is-spaced is-size-4-mobile">Forthewin Network</h1>
              <p className="subtitle is-size-6-mobile">The hub of NEP-17</p>
            </div>

            <div className="columns is-multiline is-mobile">
              {CARDS.map((card) => {
                return (
                  <div key={card.title} className="column is-2-desktop is-4-mobile">
                    <div className="is-shadowless">
                      <Link to={card.link}>
                        <figure className="image">
                          <img src={card.img} />
                        </figure>
                      </Link>
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-6 heading has-text-centered">
                            <Link className={"has-text-dark"} to={card.link}>
                              {card.title}
                            </Link>
                          </p>
                        </div>
                      </div>
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
