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
                <small className="has-text-weight-medium">1 {p.symbol}</small>
                <br />
                <small>=</small>
                <br />
                <small className="has-text-weight-medium">{p.amount} NEP</small>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PaymentSelection;
