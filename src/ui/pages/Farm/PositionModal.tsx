import React, { useState } from "react";
import Modal from "../../components/Modal";
import { FarmContract } from "../../../packages/neo/contracts";
import { useWallet } from "../../../packages/provider";
import { toast } from "react-hot-toast";
import TransactionSubmitted from "../../components/TransactionSubmitted";
import _ from "underscore";
interface IActionModal {
  range: string;
  currentPosition: string;
  onClose: () => void;
}
const PositionModal = ({ currentPosition, range, onClose }: IActionModal) => {
  const [position, setPosition] = useState("");
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [txid, setTxid] = useState<string>();
  const onChange = async () => {
    if (connectedWallet) {
      try {
        const res = await new FarmContract(network).changePosition(
          connectedWallet,
          position
        );
        setTxid(res);
      } catch (e) {
        // @ts-ignore
        toast.error(e.message);
      }
    } else {
      openWalletModal();
    }
  };
  return (
    <Modal onClose={onClose}>
      {txid ? (
        <TransactionSubmitted txid={txid} onClick={onClose} />
      ) : (
        <>
          <h1 className="title is-spaced">Change your position</h1>
          <p className="subtitle is-6">
            Your current position is <strong>{currentPosition}</strong>
          </p>
          <div className="field">
            <label className="label">New position</label>
            <div className="select is-fullwidth">
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="">Select new position</option>
                {_.range(0, range)
                  .filter((i) => !(i + 1 === parseFloat(currentPosition)))
                  .map((i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button
            onClick={onChange}
            disabled={!position}
            className="button is-button is-black"
          >
            Change
          </button>
        </>
      )}
    </Modal>
  );
};

export default PositionModal;
