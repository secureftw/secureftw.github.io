import React from "react";
import { TournamentContract } from "../../../../packages/neo/contracts/ftw/tournament";
import toast from "react-hot-toast";
import { useWallet } from "../../../../packages/provider";
import { TOURNAMENT_TIME_PADDING } from "../../../../packages/neo/contracts/ftw/tournament/consts";

interface IPlayButtonProps {
  arenaNo: string;
  onSubmitted: (txid: string) => void;
  status?: {
    prize: number;
    gameNo: number;
    previousChampWallet?: string;
    timeElapsedFromPreviousGame?: string;
  };
}
const PlayButton = ({ arenaNo, onSubmitted, status }: IPlayButtonProps) => {
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onPlay = async () => {
    if (connectedWallet && status) {
      // try {
      //   const res = await new TournamentContract(network).play(
      //     connectedWallet,
      //     arenaNo
      //   );
      //   addPendingTransaction(res);
      //   onSubmitted(res);
      // } catch (e: any) {

      // }
      // const timeLeft =
      //   TOURNAMENT_TIME_PADDING -
      //   parseFloat(status.timeElapsedFromPreviousGame);
      // if (timeLeft <= 0) {
      try {
        const res = await new TournamentContract(network).play(
          connectedWallet,
          arenaNo
        );
        addPendingTransaction(res);
        onSubmitted(res);
      } catch (e: any) {
	      console.log(e);
	      toast.error("An error occurred, Check console.");
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
