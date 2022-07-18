import React from "react";
import { numberTrim } from "../../../packages/neo/utils";

const MyLPTokenCard = ({
  tokenId,
  tokenASymbol,
  tokenAAmount,
  tokenAUSD,
  tokenBSymbol,
  tokenBAmount,
  tokenBUSD,
}) => {
  return (
    <>
      <h1 className="title is-7">Token id: {tokenId}</h1>
      <div className="columns">
        <div className="column">
          <div className="heading">{tokenASymbol}</div>
          <p>${numberTrim(tokenAUSD)}</p>
          <p>
            <small>
              ({numberTrim(tokenAAmount)} {tokenASymbol})
            </small>
          </p>
        </div>
        <div className="column">
          <div className="level-item is-block">
            <div className="heading">{tokenBSymbol}</div>
            <p>${numberTrim(tokenBUSD)}</p>
            <p>
              <small>
                ({numberTrim(tokenBAmount)} {tokenBSymbol})
              </small>
            </p>
          </div>
        </div>
        <div className="column">
          <div className="level-item is-block">
            <div className="heading">Total</div>
            <p>
              <strong>${numberTrim(tokenBUSD + tokenAUSD)}</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyLPTokenCard;
