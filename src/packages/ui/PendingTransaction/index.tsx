import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useWallet } from "../../provider";
import { Network } from "../../neo/network";

const PendingTransaction = (props) => {
  const { network, pendingTransactions, removePendingTransaction } =
    useWallet();
  // const [items, setItems] = useState<ITransaction[]>([]);

  // const handleTransactionsChange = useCallback(async (event) => {
  //   const transactions = LocalStorage.getTransactions();
  //   const pendingTransactions = transactions.filter(
  //     (i) => i.status === "PENDING"
  //   );
  //   if (pendingTransactions.length > 0) {
  //     setItems(transactions);
  //     for (const tx of transactions) {
  //       const res = await Network.getRawTx(tx.txid, network);
  //       setItems(items.filter((i) => i.txid !== tx.txid));
  //       console.log(1);
  //       console.log(res);
  //     }
  //   }
  // }, []);

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
    // handleTransactionsChange(() => {});
    // window.addEventListener("transactions", handleTransactionsChange);
    // return () => {
    //   window.removeEventListener("transactions", handleTransactionsChange);
    // };
  }, [pendingTransactions]);
  // console.log(items);
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
