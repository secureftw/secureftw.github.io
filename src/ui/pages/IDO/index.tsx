import React from "react";
import PageLayout from "../../components/PageLayout";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  GAS_NEP,
  LAUNCH_AT,
  NEP_GAS,
  NEP_PRICE,
  TOTAL_TOKENS_FOR_SALE,
} from "../../../packages/neo/contracts/ftw/ido/consts";
import { Chart } from "react-google-charts";
import Countdown from "react-countdown";
import moment from "moment";
// import CountdownTimer from "react-component-countdown-timer";

export const data = [
  ["Distribution", "Tokens"],
  ["IDO", 15],
  ["Team", 10],
  ["NEP initial pool", 5],
  ["Swap reward", 70],
];

export const options = {
  is3D: true,
};

const IDO = () => {
  const launchDate = moment.unix(LAUNCH_AT).toDate();

  return (
    <div>
      <PageLayout>
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box is-shadowless">
              <h1 className="title is-5">Initial Dex Offering</h1>

              <div className="notification">
                FTWSwap is offering NEP tokens to NEO community.
              </div>

              <div className="block">
                <p className="has-text-weight-medium heading">
                  Sale progress: 0 NEP
                </p>
                <ProgressBar bgColor="hsl(204, 86%, 53%)" completed={100} />
              </div>

              <div className="level">
                <div className="level-left">
                  <div className="level-item is-block">
                    <p className="has-text-weight-medium heading">Rate</p>1 GAS
                    = {GAS_NEP} NEP
                    {/*<br /> 1 NEP = {NEP_GAS} GAS*/}
                  </div>
                </div>

                <div className="level-right">
                  <div className="level-item is-block">
                    <p className="has-text-weight-medium heading">
                      Tokens for sale
                    </p>
                    {TOTAL_TOKENS_FOR_SALE.toLocaleString()} NEP
                  </div>
                </div>
              </div>
              <button className="button is-fullwidth is-primary">
                <Countdown date={launchDate}>
                  <div>Good to go</div>
                </Countdown>
              </button>
            </div>

            <div className="box is-shadowless">
              <h1 className="title is-5">Token utility</h1>
              <div className="columns is-multiline">
                <div className="column is-6">
                  <div
                    className="has-text-centered box is-shadowless"
                    style={{ border: "1px solid #eee" }}
                  >
                    <figure
                      className="image is-128x128"
                      style={{ margin: "auto" }}
                    >
                      <img src="/icons/smith.png" />
                    </figure>
                    <span className="has-text-weight-medium">Smith</span>
                  </div>
                </div>

                <div className="column is-6">
                  <div
                    className="has-text-centered box is-shadowless"
                    style={{ border: "1px solid #eee" }}
                  >
                    <figure
                      className="image is-128x128"
                      style={{ margin: "auto" }}
                    >
                      <img src="/icons/dao.png" />
                    </figure>
                    <span className="has-text-weight-medium">DAO platform</span>
                  </div>
                </div>

                <div className="column is-6">
                  <div
                    className="has-text-centered box is-shadowless"
                    style={{ border: "1px solid #eee" }}
                  >
                    <figure
                      className="image is-128x128"
                      style={{ margin: "auto" }}
                    >
                      <img src="/icons/raffle.png" />
                    </figure>
                    <span className="has-text-weight-medium">
                      Raffle platform
                    </span>
                  </div>
                </div>

                <div className="column is-6">
                  <div
                    className="has-text-centered box is-shadowless"
                    style={{ border: "1px solid #eee" }}
                  >
                    <figure
                      className="image is-128x128"
                      style={{ margin: "auto" }}
                    >
                      <img src="/icons/gov.png" />
                    </figure>
                    <span className="has-text-weight-medium is-size-6">
                      Governance
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="title is-5">Tokenomics</h1>
              <div
                className="box is-shadowless"
                style={{ border: "1px solid #eee" }}
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
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default IDO;
