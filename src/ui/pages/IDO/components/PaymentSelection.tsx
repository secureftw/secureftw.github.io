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
      <h1 className="title is-5 is-spaced">Swap rates</h1>
      {/*<p className="subtitle is-6">*/}
      {/*  Due to the current market condition, NEO/GAS rates are better than*/}
      {/*  others. Please swap accordingly.*/}
      {/*</p>*/}
      <div className="columns is-multiline is-mobile">
        {payments(network).map((p, i) => {
          if (currentTokenHash && currentTokenHash === p.contractHash)
            return <></>;
          return (
            <div key={`payment-select-${i}`} className="column is-3-desktop is-6-mobile">
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
                <small>1 {p.symbol}</small>
                <div>=</div>
                <small>{p.amount} NEP</small>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PaymentSelection;
