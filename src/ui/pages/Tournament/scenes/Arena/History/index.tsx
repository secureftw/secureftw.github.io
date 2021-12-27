import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../../packages/provider";
import { TournamentContract } from "../../../../../../packages/neo/contracts/ftw/tournament";
import ResultModal from "./ResultModal";
import toast from "react-hot-toast";
import DisplayRuneTable from "./DisplayRuneTable";
import Replay from "./Replay";

const History = (props) => {
  const [nftModalActive, setNftModalActive] = useState();
  const [replayModalActive, setReplayModalActive] = useState();
  const [history, setHistory] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onNFTModalActive = (obj) => setNftModalActive(obj);
  const onReplayModalActive = (obj) => setReplayModalActive(obj);
  const onPlay = async () => {
    if (connectedWallet) {
      try {
        const res = await new TournamentContract(network).play(connectedWallet);
        addPendingTransaction(res);
        // setModalActive(false);
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please connect wallet.");
    }
  };

  useEffect(() => {
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
    fetchHistory();
  }, [connectedWallet, network]);
  return (
    <div>
      {isLoading ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <h3 className="title">Match history</h3>
              </div>
            </div>

            <div className="level-right">
              <div className="level-item">
                <button
                  className="button is-primary press-font"
                  onClick={onPlay}
                >
                  Start
                </button>
              </div>
            </div>
          </div>

          <div className="box">
            {history.items && history.items.length > 0 ? (
              history.items.map((game) => {
                return (
                  <DisplayRuneTable
                    key={game.no}
                    gameNo={game.no}
                    network={network}
                    onClick={(obj) => {
                      onNFTModalActive(obj);
                    }}
                    onReplay={() => onReplayModalActive(game)}
                    width={"64px"}
                    height={"64px"}
                    tokenId={game.champion}
                  />
                );
              })
            ) : (
              <h1 className="title">No history yet</h1>
            )}
          </div>
        </>
      )}
      {nftModalActive && (
        <ResultModal
          rune={nftModalActive}
          onClose={() => setNftModalActive(undefined)}
        />
      )}
      {replayModalActive && (
        <Replay
          gameHistory={replayModalActive}
          onClick={(obj) => {
            onNFTModalActive(obj);
          }}
          onClose={() => setReplayModalActive(undefined)}
        />
      )}
    </div>
  );
};

export default History;
