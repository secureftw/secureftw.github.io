import React, { useState } from "react";
import Modal from "../../components/Modal";
import NumberFormat from "react-number-format";
import { FarmContract } from "../../../packages/neo/contracts";
import { useWallet } from "../../../packages/provider";
import { toast } from "react-hot-toast";
import TransactionSubmitted from "../../components/TransactionSubmitted";

interface IActionModal {
  onClose: () => void;
}
const ActionModal = ({ onClose }: IActionModal) => {
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [txid, setTxid] = useState<string>();
  const onMint = async () => {
    if (connectedWallet) {
      try {
        // const txid = await new FarmContract(network).deposit(
        //   connectedWallet,
        // );
        // setTxid(txid);
      } catch (e) {
        console.error(e);
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
          <h1 className="title is-flex">
            {/*<img src={"/neo_512_512.svg"} />*/}
            Deposit NEO
          </h1>

          <button
            onClick={onMint}
            className="button is-button is-black"
          >
            Deposit
          </button>
        </>
      )}
    </Modal>
  );
};

export default ActionModal;
