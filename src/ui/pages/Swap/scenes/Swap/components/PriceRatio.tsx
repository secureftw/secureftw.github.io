import React, { useState } from "react";
interface IPriceRationProps {
  amountA: string;
  amountB: string;
  symbolA: string;
  symbolB: string;
}
const PriceRatio = ({
  amountA,
  amountB,
  symbolA,
  symbolB,
}: IPriceRationProps) => {
  console.log(amountA);
  console.log(amountB);
  const [isReversed, setReversed] = useState(false);
  let ratio = parseFloat(amountA) / parseFloat(amountB);
  if (isReversed) {
    ratio = parseFloat(amountB) / parseFloat(amountA);
  }
  return (
    <p
      onClick={() => setReversed(!isReversed)}
      className="is-size-7 has-text-weight-semibold"
    >
      {`1 ${isReversed ? symbolA : symbolB} = ${ratio.toFixed(2).replace(/[.,]00$/, "")} ${
        isReversed ? symbolB : symbolA
      }`}
    </p>
  );
};

export default PriceRatio;
