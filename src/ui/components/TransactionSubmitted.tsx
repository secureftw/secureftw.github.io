import React from "react";

/**
 * TODO: Better ux needed
 * @param props
 * @constructor
 */
interface ITransactionSuccessProps {
  txid: string;
  onClick: () => void;
}
const TransactionSubmitted = ({ txid, onClick }: ITransactionSuccessProps) => {
  return (
    <div className="has-text-centered">
      <h1 className="title is-5">Transaction submitted!</h1>
      <p className="subtitle is-7">{txid}</p>
      <button onClick={onClick} className="button is-black">
        Close
      </button>
    </div>
  );
};

export default TransactionSubmitted;
