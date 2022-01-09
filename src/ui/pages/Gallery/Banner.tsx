import React from "react";
import { RUNE_PRICE } from "../../../packages/neo/contracts/ftw/nft/consts";
import { INetworkType } from "../../../packages/neo/network";
import DisplayRandomRune from "../../components/RandomRune";
interface IBannerProps {
  network: INetworkType;
  filter: string;
  onMint: () => void;
  onFilterChange: (val: string) => void;
}
const Banner = ({ onMint, network }: IBannerProps) => {
  return (
    <section className="hero is-white">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div>
                <h1 className="title">Forthewin Runes</h1>
                <p className="subtitle">Algorithms-generated lucky runes</p>

                <div className="content is-small">
                  <p>
                    <strong>Max supply</strong>
                    <br />
                    500 runes
                  </p>
                  <p>
                    <strong>Attribute #1</strong>
                    <br />
                    Random phase (Dark, Light, Fire, Water, Wood, Earth, Metal)
                  </p>
                  <p>
                    <strong>Attribute #2</strong>
                    <br /> Luck (1 ~ 10)
                  </p>
                </div>
                <div className="block has-text-centered-mobile is-hidden-mobile">
                  <button
                    onClick={onMint}
                    className="button is-primary press-font"
                  >
                    Mint: {RUNE_PRICE[network]} GAS
                  </button>
                </div>
              </div>
            </div>
            <div className="column">
              <div
                className="block"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <DisplayRandomRune
                  isActive={true}
                  width="230px"
                  height="230px"
                />
              </div>
              <div className="block has-text-centered-mobile is-hidden-tablet">
                <button
                  onClick={onMint}
                  className="button is-primary press-font"
                >
                  Mint: {RUNE_PRICE[network]} GAS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<div className="hero-foot">*/}
      {/*  <nav className="tabs is-boxed is-fullwidth">*/}
      {/*    <div className="container">*/}
      {/*      <ul>*/}
      {/*        {RUNE_PHASE_FILTER.map((phase) => {*/}
      {/*          return (*/}
      {/*            <li*/}
      {/*              key={phase}*/}
      {/*              className={filter === phase ? "is-active" : ""}*/}
      {/*            >*/}
      {/*              <a onClick={() => onFilterChange(phase)}>{phase}</a>*/}
      {/*            </li>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*      </ul>*/}
      {/*    </div>*/}
      {/*  </nav>*/}
      {/*</div>*/}
    </section>
  );
};

export default Banner;
