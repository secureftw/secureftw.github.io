import React, { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useWallet } from "../../provider";
import { LocalStorage } from "../../neo/local-storage";
import { Network } from "../../neo/network";
import { ITransaction } from "../../neo/wallet/interfaces";

const PendingTransaction = (props) => {
  const { network } = useWallet();
  const [items, setItems] = useState<ITransaction[]>([]);

  const handleTransactionsChange = useCallback((event) => {
    let transactions = LocalStorage.getTransactions();
    transactions = transactions.filter((i) => i.status === "PENDING");
    if (transactions.length > 0) {
      setItems(transactions);
      for (const tx of transactions) {
        pingFunc(tx);
      }
    }
  }, []);

  const pingFunc = (tx) => {
    let retryNum = 0;

    // create interval as a named function
    const interval = async () => {
      const intervalCall = await Network.getNotificationsFromTxId(
        tx.txid,
        network
      );
      if (intervalCall) {
        const _items = items.filter((item) => item.txid !== tx.txid);
        setItems(_items);
        LocalStorage.updatePendingTransaction(tx.txid);
        return false;
      }

      retryNum++;

      if (retryNum >= 10) {
        return;
      }

      setTimeout(interval, 10000);
    };
    // call interval
    interval();
  };

  useEffect(() => {
    // handleTransactionsChange(() => {});
    window.addEventListener("transactions", handleTransactionsChange);
    return () => {
      window.removeEventListener("transactions", handleTransactionsChange);
    };
  }, []);
  console.log(items)
  if (items.length === 0) return <></>;
  return (
    <div className="navbar-item pr-0">
      <div
        style={{ pointerEvents: "none" }}
        className="is-center button is-outlined is-rounded is-small"
      >
        <ClipLoader loading={true} size={15} />
        <span className="ml-2">{`${items.length} Pending`}</span>
      </div>
    </div>
  );
};

export default PendingTransaction;
