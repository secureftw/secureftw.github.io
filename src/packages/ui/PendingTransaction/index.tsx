import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useWallet } from "../../provider";
import { Network } from "../../neo/network";

const PendingTransaction = () => {
  const { network, pendingTransactions, removePendingTransaction } =
    useWallet();
  useEffect(() => {
    async function checkTxid() {
      try {
        for (const txid of pendingTransactions) {
          const res = await Network.getRawTx(txid, network);
          removePendingTransaction(txid);
        }
      } catch (e: any) {
        console.error(e);
      }
    }

    if (pendingTransactions.length > 0) {
      checkTxid();
    }
  }, [pendingTransactions]);
  if (pendingTransactions.length === 0) return <></>;
  return (
    <div className="navbar-item pr-0">
      <div
        style={{ pointerEvents: "none" }}
        className="is-center button is-outlined is-rounded is-small"
      >
        <ClipLoader loading={true} size={15} />
        <span className="ml-2">{`${pendingTransactions.length} Pending`}</span>
      </div>
    </div>
  );
};

export default PendingTransaction;
