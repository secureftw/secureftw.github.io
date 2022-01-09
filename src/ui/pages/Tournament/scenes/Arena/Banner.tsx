import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TOURNAMENT_PATH } from "../../../../../consts";
import { useWallet } from "../../../../../packages/provider";
import { TournamentContract } from "../../../../../packages/neo/contracts/ftw/tournament";

interface IBanner {
  arenaNo: string;
}
const Banner = ({ arenaNo }: IBanner) => {
  const location = useLocation();
  const [status, setStatus] = useState<{
    prize: number;
    gameNo: number;
  }>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();
  useEffect(() => {
    async function fetchBetAmount() {
      setError("");
      setLoading(true);
      try {
        const res = await new TournamentContract(network).getCurrentPrize(
          arenaNo
        );
        setStatus(res);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBetAmount();
  }, [network, location.pathname]);
  return (
    <section className="hero is-white">
      <div className="hero-body">
        <div className="container">
          <div className="level">
            <div className="level-left">
              <div className="level-item  has-text-centered">
                <div>
                  <p className="heading">Round</p>
                  <p className="title is-5">#{status ? status.gameNo : ""}</p>
                </div>
              </div>
            </div>

            <div className="level-left">
              <div className="level-item">
                <h1 className="title is-marginless">ARENA {arenaNo}</h1>
              </div>
            </div>

            <div className="level-left">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Prize</p>
                  <p className="title is-5">
                    {status ? status.prize + " GAS" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <ul>
              <li
                className={
                  location.pathname === TOURNAMENT_PATH + "/" + arenaNo
                    ? "is-active"
                    : ""
                }
              >
                <Link to={TOURNAMENT_PATH + "/" + arenaNo}>Players</Link>
              </li>
              <li
                className={
                  location.pathname ===
                  TOURNAMENT_PATH + "/" + arenaNo + "/history"
                    ? "is-active"
                    : ""
                }
              >
                <Link to={TOURNAMENT_PATH + "/" + arenaNo + "/history"}>
                  Champions
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Banner;
