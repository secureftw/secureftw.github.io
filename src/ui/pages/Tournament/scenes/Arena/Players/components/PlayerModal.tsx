import React from "react";
import { IRuneMeta } from "../../../../../../../packages/neo/contracts/ftw/nft/interfaces";
import Modal from "../../../../../../components/Modal";
import { TournamentContract } from "../../../../../../../packages/neo/contracts/ftw/tournament";
import toast from "react-hot-toast";
import { useWallet } from "../../../../../../../packages/provider";

interface IPlayerModalProps {
  rune: IRuneMeta & { tokenId: string };
  onClose: () => void;
}
const PlayerModal = ({ rune, onClose }: IPlayerModalProps) => {
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onBet = async () => {
    if (connectedWallet) {
      try {
        const res = await new TournamentContract(network).bet(
          connectedWallet,
          rune.tokenId
        );
        addPendingTransaction(res);
        // setModalActive(false);
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please connect wallet.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <div className="columns">
          <div className="column">
            <img src={rune.image} />
          </div>
          <div className="column">
            <div className="content">
              <strong>Name</strong>
              <br />
              <p>{rune.name}</p>
              <strong>Phase</strong>
              <p>{rune.phase}</p>
              <strong>Luck</strong>
              <p>{rune.luck}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <button onClick={onBet} className="button is-primary is-fullwidth">
              BET 1 GAS
            </button>
          </div>
          <div className="column">
            <button onClick={onClose} className="button is-light is-fullwidth">
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlayerModal;
