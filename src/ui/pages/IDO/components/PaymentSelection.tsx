import React from "react";
import { payments } from "../../../../packages/neo/contracts/ftw/ido/consts";
import { INetworkType } from "../../../../packages/neo/network";

interface IPaymentSelectionProps {
  currentTokenHash?: string;
  network: INetworkType;
  onClick: (token) => void;
}
const PaymentSelection = ({
  network,
  onClick,
  currentTokenHash,
}: IPaymentSelectionProps) => {
  return (
    <>
      <h1 className="title is-5">Swap rates</h1>
      <p className="subtitle is-7">
        Swap rates will be determined at the launch except{" "}
        <strong>NEO/NEP</strong> and <strong>GAS/NEP</strong>.
      </p>
      <div className="columns is-multiline">
        {payments(network).map((p, i) => {
          if (currentTokenHash && currentTokenHash === p.contractHash)
            return <></>;
          return (
            <div key={`payment-select-${i}`} className="column is-3">
              <div
                onClick={() => onClick(p)}
                className="box has-text-centered is-hoverable"
                // style={{ border: "1px solid #eee" }}
              >
                <figure
                  className="image is-32x32 mb-3"
                  style={{ margin: "auto" }}
                >
                  <img src={p.logo} />
                </figure>
                <div className="title is-7 is-marginless">1 {p.symbol}</div>
                <div>=</div>
                <div className="title is-7 is-marginless">
                  <span
                    className={
                      p.symbol === "NEO" ||
                      p.symbol === "bNEO" ||
                      p.symbol === "GAS"
                        ? ""
                        : "spoiler-blurred"
                    }
                  >
                    {p.amount}
                  </span>{" "}
                  NEP
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PaymentSelection;
