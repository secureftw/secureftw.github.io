import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../packages/provider";
import { TournamentContract } from "../../../../packages/neo/contracts/ftw/tournament";
import toast from "react-hot-toast";
import { IHistoryGame } from "../../../../packages/neo/contracts/ftw/tournament/interfaces";
import { calculateClaimableAmount } from "../../../../packages/neo/contracts/ftw/tournament/helpers";

interface IClaimButtonProps {
  arenaNo: string;
  history: IHistoryGame;
  onClaimed: (txid: string) => void;
}
const ClaimButton = ({ arenaNo, history, onClaimed }: IClaimButtonProps) => {
  const [status, setStatus] = useState<any>({
    betAmount: 0,
    isClaimed: false,
  });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onClaim = async () => {
    if (connectedWallet) {
      try {
        const res = await new TournamentContract(network).claim(
          connectedWallet,
          arenaNo,
          history.gameNo
        );
        addPendingTransaction(res);
        onClaimed(res);
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please connect wallet.");
    }
  };
  useEffect(() => {
    async function fetchBetAmount(address: string) {
      setError("");
      setLoading(true);
      try {
        const res = await new TournamentContract(network).getBetAmount(
          arenaNo,
          history.gameNo,
          history.champion,
          address
        );
        setStatus(res);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (connectedWallet) {
      fetchBetAmount(connectedWallet.account.address);
    }
  }, [connectedWallet, network]);
  if (!connectedWallet) return <></>;
  if (!status.betAmount) return <></>;
  return (
    <>
      {isLoading ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {status.isClaimed ? (
            <button disabled={true} className="button is-info is-fullwidth">
              Claimed
            </button>
          ) : (
            <button className="button is-info is-fullwidth" onClick={onClaim}>
              Claim {calculateClaimableAmount(history, status.betAmount)} GAS
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ClaimButton;
