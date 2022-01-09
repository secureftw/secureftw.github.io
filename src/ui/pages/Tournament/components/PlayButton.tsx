import React from "react";
import { TournamentContract } from "../../../../packages/neo/contracts/ftw/tournament";
import toast from "react-hot-toast";
import { useWallet } from "../../../../packages/provider";

interface IPlayButtonProps {
  arenaNo: string;
  onSubmitted: (txid: string) => void;
}
const PlayButton = ({ arenaNo, onSubmitted }: IPlayButtonProps) => {
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onPlay = async () => {
    if (connectedWallet) {
      try {
        const res = await new TournamentContract(network).play(
          connectedWallet,
          arenaNo
        );
        addPendingTransaction(res);
        onSubmitted(res);
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please connect wallet.");
    }
  };
  return (
    <button className="button is-primary press-font" onClick={onPlay}>
      Start
    </button>
  );
};

export default PlayButton;
