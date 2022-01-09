import React, { useEffect, useState } from "react";
import Pagination from "bulma-pagination-react";
import { useWallet } from "../../../../../../packages/provider";
import { TournamentContract } from "../../../../../../packages/neo/contracts/ftw/tournament";
import NFTDetailModal from "./NFTDetailModal";
import HistoryTable from "./HistoryTable";
import Replay from "./Replay";
import PlayButton from "../../../components/PlayButton";
import { ADMIN_FOR_PLAY } from "../../../../../../packages/neo/contracts/ftw/tournament/consts";
import AfterTransactionSubmitted from "../../../../../../packages/ui/AfterTransactionSubmitted";
import Modal from "../../../../../components/Modal";

interface IHistoryProps {
  arenaNo: string;
}
const History = ({ arenaNo }: IHistoryProps) => {
  const [playTxid, setPlayTxid] = useState("");
  const [claimTxid, setClaimTxid] = useState("");
  const [page, setPage] = useState(1);
  const [nftModalActive, setNftModalActive] = useState();
  const [replayModalActive, setReplayModalActive] = useState();
  const [history, setHistory] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();
  const onNFTModalActive = (obj) => setNftModalActive(obj);
  const onReplayModalActive = (obj) => setReplayModalActive(obj);

  useEffect(() => {
    async function fetchHistory() {
      setError("");
      setLoading(true);
      try {
        const res = await new TournamentContract(network).history(
          arenaNo,
          page
        );
        setHistory(res);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [connectedWallet, network, page]);
  return (
    <div>
      {isLoading ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="box">
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <h3 className="title">History</h3>
                </div>
              </div>

              {ADMIN_FOR_PLAY[network].length !== 0 &&
              ADMIN_FOR_PLAY[network].includes(
                connectedWallet?.account.address
              ) ? (
                <div className="level-right">
                  <div className="level-item">
                    <PlayButton onSubmitted={setPlayTxid} arenaNo={arenaNo} />
                  </div>
                </div>
              ) : ADMIN_FOR_PLAY[network].length === 0 ? (
                <div className="level-right">
                  <div className="level-item">
                    <PlayButton onSubmitted={setPlayTxid} arenaNo={arenaNo} />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {history.items && history.items.length > 0 ? (
              history.items.map((game) => {
                return (
                  <HistoryTable
                    key={game.gameNo}
                    width={"64px"}
                    height={"64px"}
                    history={game}
                    arenaNo={arenaNo}
                    network={network}
                    onClick={(obj) => {
                      onNFTModalActive(obj);
                    }}
                    onReplay={() => onReplayModalActive(game)}
                    onClaimed={setClaimTxid}
                  />
                );
              })
            ) : (
              <div>Game hasn't been played</div>
            )}
            {history && history.totalPages > 1 && (
              <div className="media">
                <div className="media-content">
                  <Pagination
                    pages={history.totalPages}
                    currentPage={page}
                    onChange={(_page) => {
                      if (page !== _page) {
                        setPage(_page);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {nftModalActive && (
        <NFTDetailModal
          rune={nftModalActive}
          onClose={() => setNftModalActive(undefined)}
        />
      )}

      {replayModalActive && (
        <Replay
          arenaNo={arenaNo}
          gameHistory={replayModalActive}
          onClick={(obj) => {
            onNFTModalActive(obj);
          }}
          onClose={() => setReplayModalActive(undefined)}
        />
      )}

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

      {claimTxid && (
        <Modal onClose={() => setClaimTxid("")}>
          <AfterTransactionSubmitted
            txid={playTxid}
            network={network}
            onSuccess={() => setClaimTxid("")}
            onError={() => setClaimTxid("")}
          />
        </Modal>
      )}
    </div>
  );
};

export default History;
