import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Distribution", "Tokens"],
  ["IDO", 50_000_000],
  ["Team", 50_000_000],
  ["Marketing", 5_000_000],
  ["NEP initial pool", 25_000_000],
  ["Swap reward", 870_000_000],
];

export const options = {
  is3D: true,
};

const utilityCards = [
  { img: "/520/smith.png", title: "Smith" },
  { img: "/520/swap.png", title: "Swap" },
  { img: "/520/farm.png", title: "Farm" },
  { img: "/520/dao.png", title: "Voting" },
  { img: "/520/rune.png", title: "Rune" },
  { img: "/520/raffle.png", title: "Raffle" },
];

const Tokenomics = (props) => {
  return (
    <div className="box is-shadowless">
      <h1 className="title is-5 heading">Token utility</h1>
      <div className="columns is-multiline is-mobile">
        {utilityCards.map((card) => {
          return (
            <div key={`ucard-${card.title}`} className="column is-4-desktop is-6-mobile">
              <div
                className="has-text-centered box is-shadowless"
                style={{ border: "1px solid hsl(0, 0%, 96%)" }}
              >
                <figure className="image is-128x128" style={{ margin: "auto" }}>
                  <img src={card.img} />
                </figure>
                <span className="heading">{card.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      <h1 className="title is-5 heading">Tokenomics</h1>
      <div
        className="box is-shadowless"
        style={{ border: "1px solid hsl(0, 0%, 96%)" }}
      >
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
};

export default Tokenomics;
