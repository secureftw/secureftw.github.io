import React, { useState } from "react";
import { IRuneMeta } from "../../../../../../../packages/neo/contracts/ftw/nft/interfaces";
import Modal from "../../../../../../components/Modal";
import { useWallet } from "../../../../../../../packages/provider";
import BetButton from "../../../../components/BetButton";
import LeaveButton from "../../../../components/LeaveButton";
import AfterTransactionSubmitted from "../../../../../../../packages/ui/AfterTransactionSubmitted";

interface IPlayerModalProps {
  arenaNo: string;
  player: IRuneMeta & { tokenId: string; gameOwner: string };
  onClose: () => void;
}
const PlayerModal = ({ arenaNo, player, onClose }: IPlayerModalProps) => {
  const [txid, setTxid] = useState("");
  const { connectedWallet, network } = useWallet();
  return (
    <Modal onClose={onClose}>
      <div>
        {txid ? (
          <AfterTransactionSubmitted
            onSuccess={onClose}
            onError={() => setTxid("")}
            txid={txid}
            network={network}
          />
        ) : (
          <div>
            <div className="columns">
              <div className="column">
                <img src={player.image} />
              </div>
              <div className="column">
                <div className="content">
                  <strong>Name</strong>
                  <br />
                  <p>{player.name}</p>
                  <strong>Phase</strong>
                  <p>{player.phase}</p>
                  <strong>Luck</strong>
                  <p>{player.luck}</p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <BetButton
                  setTxid={setTxid}
                  arenaNo={arenaNo}
                  tokenId={player.tokenId}
                />
              </div>
              <div className="column">
                <button
                  onClick={onClose}
                  className="button is-light is-fullwidth"
                >
                  Close
                </button>
              </div>
              {connectedWallet &&
              connectedWallet.account.address === player.gameOwner ? (
                <div className="column">
                  <LeaveButton
                    setTxid={setTxid}
                    arenaNo={arenaNo}
                    tokenId={player.tokenId}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PlayerModal;
