import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../../packages/provider";
import { TournamentContract } from "../../../../../../packages/neo/contracts/ftw/tournament";
import DisplayRune from "../../../DisplayRune";
import NFTListModal from "./components/NFTListModal";
import PlayerModal from "./components/PlayerModal";
import { IRuneMeta } from "../../../../../../packages/neo/contracts/ftw/nft/interfaces";

const Players = (props) => {
  const [players, setPlayers] = useState<any>([]);
  const [modalActive, setModalActive] = useState(false);
  const [playerModalActive, setPlayerModalActive] = useState<
    IRuneMeta & { tokenId: string }
  >();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();
  const onJoinModalActive = () => setModalActive(true);
  const onPlayerModalActive = (obj) => setPlayerModalActive(obj);

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
    fetchContractStatus();
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
            <div className="">
              <div className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <h3 className="title">Players {players.length}/32</h3>
                  </div>
                </div>

                <div className="level-right">
                  <div className="level-item">
                    <div
                      className="button is-primary press-font"
                      onClick={onJoinModalActive}
                    >
                      Register
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns box is-multiline">
                {players.map(({ tokenId }) => (
                  <div className="column is-1">
                    <DisplayRune
                      key={tokenId}
                      width={"100%"}
                      height={"100%"}
                      tokenId={tokenId}
                      network={network}
                      onClick={(obj: any) => onPlayerModalActive(obj)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {modalActive && connectedWallet && (
            <NFTListModal onClose={() => setModalActive(false)} />
          )}

          {playerModalActive && (
            <PlayerModal
              onClose={() => setPlayerModalActive(undefined)}
              rune={playerModalActive}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Players;
