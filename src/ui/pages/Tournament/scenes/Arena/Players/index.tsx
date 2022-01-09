import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../../packages/provider";
import { TournamentContract } from "../../../../../../packages/neo/contracts/ftw/tournament";
import DisplayRuneWithProperties from "../../../components/DisplayRuneWithProperties";
import PlayerModal from "./components/PlayerModal";
import { IRuneMeta } from "../../../../../../packages/neo/contracts/ftw/nft/interfaces";
import RegisterButton from "./components/ArenaRegisterButton";

const Players = ({ arenaNo }: { arenaNo: string }) => {
  const [playerModalActive, setPlayerModalActive] = useState<
    IRuneMeta & { tokenId: string; gameOwner: string }
  >();

  const onPlayerModalActive = (obj) => setPlayerModalActive(obj);
  const [players, setPlayers] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();

  useEffect(() => {
    async function fetchContractStatus() {
      setError("");
      setLoading(true);
      try {
        const res = await new TournamentContract(network).getPlayers(arenaNo);
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
        <div className="box">
          <RegisterButton playerCount={players.length} arenaNo={arenaNo} />
          {players.length > 0 ? (
            <div className="columns is-multiline is-mobile">
              {players.map(({ tokenId, owner }) => {
                return (
                  <div
                    key={tokenId}
                    className="column is-1-desktop is-3-mobile"
                  >
                    <DisplayRuneWithProperties
                      key={tokenId}
                      width={"100%"}
                      height={"100%"}
                      tokenId={tokenId}
                      network={network}
                      isOwner={
                        connectedWallet
                          ? connectedWallet.account.address === owner
                          : false
                      }
                      onClick={(obj: any) =>
                        onPlayerModalActive({ ...obj, gameOwner: owner })
                      }
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No players</div>
          )}
        </div>
      )}
      {playerModalActive && (
        <PlayerModal
          arenaNo={arenaNo}
          onClose={() => setPlayerModalActive(undefined)}
          player={playerModalActive}
        />
      )}
    </div>
  );
};

export default Players;
