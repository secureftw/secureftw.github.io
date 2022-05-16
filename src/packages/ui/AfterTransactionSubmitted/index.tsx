import React, { useEffect, useState } from "react";
import { INetworkType, Network } from "../../neo/network";
import RuneLoading from "./RuneLoading";
import CheckMark from "../../../ui/pages/Tournament/scenes/Arena/Players/components/CheckMark";
// tslint:disable-next-line:no-submodule-imports
import { FaExclamationCircle } from "react-icons/fa";
import { TESTNET } from "../../neo/consts";

interface IAfterTransactionSubmittedProps {
  txid: string;
  network: INetworkType;
  onSuccess: () => void;
  onError: () => void;
}
const AfterTransactionSubmitted = ({
  txid,
  network,
  onSuccess,
  onError,
}: IAfterTransactionSubmittedProps) => {
  const [isDone, setDone] = useState(false);
  const [hasError, setError] = useState("");

  useEffect(() => {
    async function checkTxid() {
      try {
        const res = await Network.getRawTx(txid, network);
        if (res) {
          setDone(true);
        }
      } catch (e: any) {
        setError(e.message);
      }
    }
    checkTxid();
  }, [txid]);

  return (
    <div>
      <div
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className=""
      >
        {hasError ? (
          <FaExclamationCircle size={90} className="has-text-danger" />
        ) : isDone ? (
          <CheckMark />
        ) : (
          <RuneLoading />
        )}
      </div>
      <div className="has-background  has-text-centered mt-5">
        {hasError ? (
          <div style={{ marginTop: "-40px" }}>
            <h1 className="title is-5">Error occurred</h1>
            <p className="subtitle is-7">{hasError}</p>
            <button onClick={onError} className="button is-black">
              Close
            </button>
          </div>
        ) : isDone ? (
          <div style={{ marginTop: "-40px" }}>
            <h1 className="title is-5">Submitted</h1>
            <p className="subtitle is-7">Your transaction accepted</p>
            <div className="block">
              <a
                target="_blank"
                href={`https://${
                  network === TESTNET ? "testnet." : ""
                }explorer.onegate.space/transactionInfo/${txid}`}
              >
                View txid on explorer
              </a>
            </div>
            <div className="block">
              <button onClick={onSuccess} className="button is-black">
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="title is-5">Submitting..</h1>
            <p className="subtitle is-7">
              Please wait until your transaction accepted
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AfterTransactionSubmitted;
