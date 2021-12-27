import React from "react";
import TournamentTree from "./TournamentTree";
import { IHistoryGame } from "../../../../../../packages/neo/contracts/ftw/tournament/interfaces";

interface IReplayProps {
  gameHistory: IHistoryGame;
  onClick: (obj) => void;
  onClose: () => void;
}
const Replay = ({ gameHistory, onClick, onClose }: IReplayProps) => {
  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        onClick={onClose}
        style={{ backgroundColor: "black" }}
      />
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
