import React, { useEffect, useState } from "react";
import { TournamentContract } from "../../../packages/neo/contracts/ftw/tournament";
import { useWallet } from "../../../packages/provider";
import DisplayRune from "./DisplayRune";
import TournamentTree from "./scenes/Arena/History/TournamentTree";

interface IStage4Props {
  onPlayer: (obj) => void;
  onResultRune: (obj) => void;
  onJoin: () => void;
}
const Stage4 = ({ onResultRune, onPlayer, onJoin }: IStage4Props) => {
  const [players, setPlayers] = useState<any>([]);
  const [history, setHistory] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();

  useEffect(() => {
    async function fetchContractStatus() {
      setError("");
      setLoading(true);
      try {
        const res = await new TournamentContract(network).getPlayers();
        setPlayers(res);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    async function fetchHistory() {
      setError("");
      setLoading(true);
      try {
        const res = await new TournamentContract(network).history();
        setHistory(res);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContractStatus();
    fetchHistory();
  }, [connectedWallet, network]);
  return (
    <div>
      {isLoading ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="columns">
          <div className="column">
            <div className="box">
              <div className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <h3 className="title">Players</h3>
                  </div>
                </div>

                <div className="level-right">
                  <div className="level-item">
                    <div
                      className="button is-primary press-font"
                      onClick={onJoin}
                    >
                      Join
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="is-flex"
                style={{
                  flexFlow: "wrap",
                }}
              >
                {players.map(({ tokenId }) => (
                  <DisplayRune
                    key={tokenId}
                    width={"64px"}
                    height={"64px"}
                    tokenId={tokenId}
                    network={network}
                    onClick={(obj: any) => onPlayer(obj)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="box">
              <h3 className="title">Champs</h3>
              {history.items && history.items.length > 0 ? (
                <div>
                  {history.items.map((game) => {
                    return (
                      <div className="media" key={game.no}>
                        <div className="media-left">#{game.no}</div>
                        <div className="media-content">
                          <TournamentTree
                            champ={game.champion}
                            tree={game.tournamentTree}
                            onClick={onResultRune}
                            nonce={game.nonce}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>No history</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage4;
