import React from "react";
import PageLayout from "../components/PageLayout";
import BgContainer from "../components/BgContainer";
import {GALLERY_PATH, SMITH_PATH, SWAP_PATH, TOURNAMENT_PATH} from "../../consts";
import { ARENA_PATH } from "./Tournament/pageRoutes";
import { Link } from "react-router-dom";
import { useWallet } from "../../packages/provider";
import { TESTNET } from "../../packages/neo/consts";
import toast from "react-hot-toast";

const CARDS = [
	{
		title: "FTW Smith",
		type: "Utility",
		desc: "FTW Smith helps users to create and deploy fungible/Non-fungible token smart contracts without any codes.",
		img: "assets/smith.png",
		link: SMITH_PATH,
	},
  {
    title: "FTW Rune",
    type: "NFT",
    desc: "FTW Rune is an algorithmically generated NFT created and stored onchain.",
    img: "assets/runes.png",
    link: GALLERY_PATH,
  },
  {
    title: "FTW Arena",
    type: "GameFi",
    desc: " FTW Runes against each other with the victor earning a GAS prize.",
    img: "assets/arena-bg.jpeg",
    link: TOURNAMENT_PATH,
  },
  {
    title: "FTW Swap",
    type: "DeFi",
    desc: "Coming soon. Try on our Testnet.",
    img: "assets/swap.png",
    link: SWAP_PATH,
  },
  // {
  //   title: "FTW Lab",
  //   type: "Testnet",
  //   desc: "Preview FTW future apps.",
  //   img: "assets/testnet.png",
  //   link: SMITH_PATH,
  // },
];

const Home = () => {
  const { network, switchNetwork } = useWallet();
  const onSwitchNetwork = () => {
    if (network !== TESTNET) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Are you sure to switch network?")) {
        switchNetwork(TESTNET);
        toast.success("Network switched");
      }
    }
  };
  return (
    <div>
      <section className="hero is-black">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Forthewin Network</h1>
            <p className="subtitle">
              Building some cool decentralized stuff on NEO blockchain.{" "}
            </p>
          </div>
        </div>
      </section>
      <PageLayout>
        <div className="columns is-multiline">
          {CARDS.map((card) => {
            return (
              <div key={card.title} className="column is-3">
                <div className="card">
                  <div className="card-image is-clickable">
                    <Link to={card.link}>
                      <figure className="image">
                        <BgContainer src={card.img} height="300px" />
                      </figure>
                    </Link>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">
                          <Link className={"has-text-dark"} to={card.link}>
                            {card.title}
                          </Link>
                        </p>
                        <span className="tag is-primary">{card.type}</span>
                      </div>
                    </div>
                    <div className="content" style={{ minHeight: "100px" }}>
                      {card.desc}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="column is-3">
            <div className="card">
              <div
                className="card-image is-clickable"
                onClick={onSwitchNetwork}
              >
                <figure className="image">
                  <BgContainer src={"assets/lab.png"} height="300px" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p
                      onClick={onSwitchNetwork}
                      className="title is-4 is-clickable"
                    >
                      FTW Lab
                    </p>
                    <span className="tag is-primary">Testnet</span>
                  </div>
                </div>
                <div className="content" style={{ minHeight: "100px" }}>
                  Preview FTW future apps.
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Home;
