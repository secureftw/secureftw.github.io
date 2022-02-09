import React from "react";
import { TournamentContract } from "../../../../packages/neo/contracts/ftw/tournament";
import toast from "react-hot-toast";
import { useWallet } from "../../../../packages/provider";
import { balanceCheck } from "../../../../packages/neo/utils";
import { SUPPORT_TICKET_PRICE } from "../../../../packages/neo/contracts/ftw/tournament/consts";

interface IBetButtonProps {
  arenaNo: string;
  tokenId: string;
  setTxid: (txid: string) => void;
}
const BetButton = ({ arenaNo, tokenId, setTxid }: IBetButtonProps) => {
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onBet = async () => {
    if (connectedWallet) {
      if (
        balanceCheck(connectedWallet.balances, parseFloat(SUPPORT_TICKET_PRICE))
      ) {
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
        toast.error(`You must have more than ${SUPPORT_TICKET_PRICE} GAS.`);
      }
    } else {
      toast.error("Please connect wallet.");
    }
  };
  return (
    <button onClick={onBet} className="button is-primary is-fullwidth">
      Support {SUPPORT_TICKET_PRICE} GAS
    </button>
  );
};

export default BetButton;
