import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Distribution", "Tokens"],
  ["IDO", 50_000_000],
  ["Team", 50_000_000],
  ["Marketing", 20_000_000],
  ["NEP initial pool", 30_000_000],
  ["Swap reward", 855_000_000],
];

export const options = {
  is3D: true,
};
const Tokenomics = (props) => {
  return (
    <div className="box is-shadowless">
      <h1 className="title is-5 heading">Token utility</h1>
      <div className="columns is-multiline">
        <div className="column is-6">
          <div
            className="has-text-centered box is-shadowless"
            style={{ border: "1px solid hsl(0, 0%, 96%)" }}
          >
            <figure className="image is-128x128" style={{ margin: "auto" }}>
              <img src="/icons/smith.png" />
            </figure>
            <span>Smith</span>
          </div>
        </div>

        <div className="column is-6">
          <div
            className="has-text-centered box is-shadowless"
            style={{ border: "1px solid hsl(0, 0%, 96%)" }}
          >
            <figure className="image is-128x128" style={{ margin: "auto" }}>
              <img src="/icons/gov.png" />
            </figure>
            <span>Governance</span>
          </div>
        </div>

        <div className="column is-6">
          <div
            className="has-text-centered box is-shadowless"
            style={{ border: "1px solid hsl(0, 0%, 96%)" }}
          >
            <figure className="image is-128x128" style={{ margin: "auto" }}>
              <img src="/icons/dao.png" />
            </figure>
            <span>DAO platform</span>
          </div>
        </div>

        <div className="column is-6">
          <div
            className="has-text-centered box is-shadowless"
            style={{ border: "1px solid hsl(0, 0%, 96%)" }}
          >
            <figure className="image is-128x128" style={{ margin: "auto" }}>
              <img src="/icons/raffle.png" />
            </figure>
            <span>Raffle platform</span>
          </div>
        </div>
      </div>

      <h1 className="title is-5 heading">Tokenomics</h1>
      <div className="box is-shadowless" style={{ border: "1px solid hsl(0, 0%, 96%)" }}>
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
