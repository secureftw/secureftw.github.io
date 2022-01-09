import React from "react";
import { MAINNET } from "../../../../packages/neo/consts";
import { TournamentContract } from "../../../../packages/neo/contracts/ftw/tournament";
import toast from "react-hot-toast";
import { useWallet } from "../../../../packages/provider";

interface IBetButtonProps {
  arenaNo: string;
  tokenId: string;
  setTxid: (txid: string) => void;
}
const BetButton = ({ arenaNo, tokenId, setTxid }: IBetButtonProps) => {
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onBet = async () => {
    if (network === MAINNET) {
      toast.error("Betting is not supported yet");
    } else {
      if (connectedWallet) {
        try {
          const res = await new TournamentContract(network).bet(
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
    }
  };
  return (
    <button onClick={onBet} className="button is-primary is-fullwidth">
      BET 0.1 GAS
    </button>
  );
};

export default BetButton;
