import React from "react";
import TournamentTree from "./TournamentTree";
import { IHistoryGame } from "../../../../../../packages/neo/contracts/ftw/tournament/interfaces";

interface IReplayProps {
  arenaNo: string;
  gameHistory: IHistoryGame;
  onClick: (obj) => void;
  onClose: () => void;
}
const Replay = ({ arenaNo, gameHistory, onClick, onClose }: IReplayProps) => {
  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        onClick={onClose}
        style={{ backgroundColor: "black" }}
      />
      <h1
        className="title has-text-white"
        style={{ position: "absolute", top: "20px", left: "20px" }}
      >
        ARENA {arenaNo}
      </h1>
      <section className="modal-content" style={{ width: "100%" }}>
        <TournamentTree
          champ={gameHistory.champion}
          tree={gameHistory.tournamentTree}
          nonce={gameHistory.nonce}
          onClick={onClick}
        />
      </section>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      />
    </div>
  );
};

export default Replay;
