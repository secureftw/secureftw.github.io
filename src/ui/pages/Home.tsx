import React from "react";
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
    // desc: "Coming soon. Try on our Testnet.",
    img: "520/swap.png",
    link: SWAP_PATH,
  },
  {
    title: "Smith",
    type: "Utility",
    // desc: "Deploy fungible/Non-fungible token smart contracts without any codes.",
    img: "520/smith.png",
    link: SMITH_PATH,
  },
  {
    title: "Farm",
    type: "DeFi",
    // desc: "Deploy fungible/Non-fungible token smart contracts without any codes.",
    img: "520/farm.png",
    link: FARM_PATH,
  },
  {
    title: "DAO",
    type: "Utility",
    // desc: "Deploy fungible/Non-fungible token smart contracts without any codes.",
    img: "520/dao.png",
    link: DAO_PATH,
  },
  {
    title: "Rune",
    type: "NFT",
    // desc: "An algorithmically generated NFT created and stored onchain.",
    img: "520/rune.png",
    link: GALLERY_PATH,
  },
	{
		title: "NEP",
		type: "Governance token",
		// desc: "Coming soon. Try on our Testnet.",
		img: "520/nep.png",
		link: IDO_PATH,
	},
  // {
  //   title: "Arena",
  //   type: "GameFi",
  //   // desc: "FTW Runes against each other with the victor earning a GAS prize.",
  //   img: "assets/54.png",
  //   link: TOURNAMENT_PATH,
  // },
  // {
  //   title: "FTW Lab",
  //   type: "Testnet",
  //   desc: "Preview FTW future apps.",
  //   img: "assets/testnet.png",
  //   link: SMITH_PATH,
  // },
];

const Home = () => {
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
