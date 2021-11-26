import store from "store2";
import { IConnectedWallet, ITransaction } from "../wallet/interfaces";

const CONNECTED_WALLET = "CONNECTED_WALLET";
const TRANSACTIONS = "TRANSACTIONS";

export class LocalStorage {
  public static getWallet = (): IConnectedWallet | undefined =>
    validateConnectedWallet(store.get(CONNECTED_WALLET));

  public static setWallet(connectedWallet: IConnectedWallet) {
    const validated = validateConnectedWallet(connectedWallet);
    store.set(CONNECTED_WALLET, validated);
  }

  public static removeWallet() {
    store.remove(CONNECTED_WALLET);
  }

  public static getTransactions = (): ITransaction[] =>
    store.has(TRANSACTIONS) ? store.get(TRANSACTIONS) : [];

  public static addTransaction(tx: ITransaction) {
    if (store.has(TRANSACTIONS)) {
      store.add(TRANSACTIONS, tx);
    } else {
      store.set(TRANSACTIONS, [tx]);
    }
    window.dispatchEvent(new Event("transactions"));
  }
  public static updatePendingTransaction(txId: string) {
    let transactions = store.get(TRANSACTIONS);
    transactions = transactions.map((tx) => {
      if (tx.txid === txId) {
        tx.status = "SUBMITTED";
      }
      return tx;
    });
    store.set(TRANSACTIONS, transactions);
  }

  public static removeTransaction = (tx: ITransaction) =>
    store.remove(TRANSACTIONS, tx);

  public static clearTransaction = () => store.set(TRANSACTIONS, []);
}

const validateConnectedWallet = (connectedWallet?: IConnectedWallet) => {
  if (
    !connectedWallet ||
    !connectedWallet.account ||
    !connectedWallet.provider ||
    !connectedWallet.network
  ) {
    return undefined;
  }
  return connectedWallet;
};
//
// const validateTransaction = (connectedWallet?: IConnectedWallet) => {
//   if (
//     !connectedWallet ||
//     !connectedWallet.account ||
//     !connectedWallet.provider ||
//     !connectedWallet.network
//   ) {
//     return undefined;
//   }
//   return connectedWallet;
// };
