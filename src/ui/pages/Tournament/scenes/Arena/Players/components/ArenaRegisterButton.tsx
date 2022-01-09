import React, { useState } from "react";
import NFTListModal from "./NFTListModal";
import { useWallet } from "../../../../../../../packages/provider";
import { toast } from "react-hot-toast";

interface IRegisterButtonProps {
  arenaNo: string;
  playerCount: number;
}
const RegisterButton = ({ arenaNo, playerCount }: IRegisterButtonProps) => {
  const [modalActive, setModalActive] = useState(false);
  const { connectedWallet } = useWallet();
  const onPickModal = () => {
    if (connectedWallet) {
      setModalActive(true);
    } else {
      toast.error("Connect your wallet.");
    }
  };
  return (
    <>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title">Players</h1>
          </div>
        </div>

        <div className="level-right">
          <div className="level-item">
            <button
              disabled={playerCount === parseFloat(arenaNo)}
              className="button is-primary press-font"
              onClick={onPickModal}
            >
              Register ({playerCount}/{arenaNo})
            </button>
          </div>
        </div>
      </div>
      {modalActive && connectedWallet && (
        <NFTListModal arenaNo={arenaNo} onClose={() => setModalActive(false)} />
      )}
    </>
  );
};

export default RegisterButton;
