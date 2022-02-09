import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TOURNAMENT_PATH } from "../../../../../consts";
import { useWallet } from "../../../../../packages/provider";
import PlayButton from "../../components/PlayButton";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { ADMIN_FOR_PLAY } from "../../../../../packages/neo/contracts/ftw/tournament/consts";

interface IBanner {
  arenaNo: string;
  pathname: string;
  status?: {
    prize: number;
    gameNo: number;
    previousChampWallet?: string;
    timeElapsedFromPreviousGame?: string;
  };
}
const Banner = ({ arenaNo, status, pathname }: IBanner) => {
  const { connectedWallet, network } = useWallet();
  const [playTxid, setPlayTxid] = useState("");

  let hasPermissionToPlay = false;
  if (ADMIN_FOR_PLAY[network].includes(connectedWallet?.account.address)) {
    hasPermissionToPlay = true;
  }
  if (
    connectedWallet &&
    status &&
    connectedWallet.account.address === status.previousChampWallet
  ) {
    hasPermissionToPlay = true;
  }
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
                <div>
                  <h1 className="title mb-3">ARENA {arenaNo}</h1>
                  {hasPermissionToPlay && (
                    <div className="has-text-centered">
                      <PlayButton
                        onSubmitted={setPlayTxid}
                        arenaNo={arenaNo}
                        status={status}
                      />
                    </div>
                  )}
                </div>
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
                  pathname === TOURNAMENT_PATH + "/" + arenaNo
                    ? "is-active"
                    : ""
                }
              >
                <Link to={TOURNAMENT_PATH + "/" + arenaNo}>Players</Link>
              </li>
              <li
                className={
                  pathname === TOURNAMENT_PATH + "/" + arenaNo + "/history"
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

      {playTxid && (
        <Modal onClose={() => setPlayTxid("")}>
          <AfterTransactionSubmitted
            txid={playTxid}
            network={network}
            onSuccess={() => setPlayTxid("")}
            onError={() => setPlayTxid("")}
          />
        </Modal>
      )}
    </section>
  );
};

export default Banner;
