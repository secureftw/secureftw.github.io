import React from "react";
import { useWallet } from "../../../../packages/provider";
import { TournamentContract } from "../../../../packages/neo/contracts/ftw/tournament";
import toast from "react-hot-toast";

interface ILeaveButtonProps {
  arenaNo: string;
  tokenId: string;
  setTxid: (txid: string) => void;
}
const LeaveButton = ({ arenaNo, tokenId, setTxid }: ILeaveButtonProps) => {
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onLeave = async () => {
    if (connectedWallet) {
      try {
        const res = await new TournamentContract(network).leave(
          connectedWallet,
          tokenId,
          arenaNo
        );
        addPendingTransaction(res);
        setTxid(res);
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please connect wallet.");
    }
  };

  return (
    <button onClick={onLeave} className="button is-danger is-fullwidth">
      Leave
    </button>
  );
};

export default LeaveButton;
