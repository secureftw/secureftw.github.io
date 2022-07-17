import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { SwapContract } from "../../../packages/neo/contracts";
import { useWallet } from "../../../packages/provider";
import { RestAPI } from "../../../packages/neo/api";
import { u } from "@cityofzion/neon-core";
import { numberTrim } from "../../../packages/neo/utils";
import { SpinnerRoundFilled } from "spinners-react";

const LPTokens = (props) => {
  const { network } = useWallet();
  const [id, setId] = useState();
  const [info, setInfo] = useState<any>();
  const [error, setError] = useState("");
  const [isSearching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (id) {
      try {
        setSearching(true);
        setError("");
        const info: any = await new SwapContract(network).getProperties(id);
        const reserve = await new SwapContract(network).getReserve(
          info.tokenA,
          info.tokenB
        );
        const prices = await new RestAPI(network).getPrices();
        const tokenAPrice = prices["0x" + info.tokenA];
        const tokenBPrice = prices["0x" + info.tokenB];
        let tokenAReserve = reserve.pair[info.tokenA].reserveAmount;
        let tokenBReserve = reserve.pair[info.tokenB].reserveAmount;
        let tokenAAmount = parseFloat(
          u.BigInteger.fromNumber(tokenAReserve)
            .mul(info.amount)
            .div(reserve.totalShare)
            .toDecimal(reserve.pair[info.tokenA].decimals)
        );
        let tokenBAmount = parseFloat(
          u.BigInteger.fromNumber(tokenBReserve)
            .mul(info.amount)
            .div(reserve.totalShare)
            .toDecimal(reserve.pair[info.tokenB].decimals)
        );
        setInfo({
          tokenASymbol: reserve.pair[info.tokenA].symbol,
          tokenBSymbol: reserve.pair[info.tokenB].symbol,
          tokenAAmount,
          tokenBAmount,
          tokenAUSD: tokenAAmount * tokenAPrice,
          tokenBUSD: tokenBAmount * tokenBPrice,
        });
        setSearching(false);
      } catch (e: any) {
        setSearching(false);
        setError(e.message);
      }
    }
  };
  return (
    <PageLayout>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box is-shadowless">
            <h1 className="title is-5">LP token calculator</h1>
	          <p className="subtitle is-7">FTWSwap LP tokens are NFT. Enter LP token ID to find the token value.</p>
            <div className="field has-addons">
              <div className="control  is-expanded">
                <input
                  value={id}
                  onChange={(e: any) => setId(e.target.value)}
                  className="input"
                  type="text"
                  placeholder="Enter LP token ID"
                />
                {error ? <p className="help is-danger">{error}</p> : <></>}
              </div>
              <div className="control">
                <button
                  onClick={handleSearch}
                  disabled={!id}
                  className={`button is-primary ${
                    isSearching ? "is-loading" : ""
                  }`}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {isSearching ? (
            <div className="box is-shadowless">
              <div className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <SpinnerRoundFilled size={15} color="#ccc" />
                  </div>
                  <div className="level-item">Searching..</div>
                </div>
              </div>
            </div>
          ) : info ? (
            <div className="box is-shadowless">
              <h1 className="title is-5">{id}</h1>
              <div className="columns">
                <div className="column">
                  <div className="heading">{info.tokenASymbol}</div>
                  <p>
                    {numberTrim(info.tokenAAmount)} {info.tokenASymbol}
                  </p>
                  <p>${numberTrim(info.tokenAUSD)}</p>
                </div>
                <div className="column">
                  <div className="level-item is-block">
                    <div className="heading">{info.tokenBSymbol}</div>
                    <p>
                      {numberTrim(info.tokenBAmount)} {info.tokenBSymbol}
                    </p>
                    <p>${numberTrim(info.tokenBUSD)}</p>
                  </div>
                </div>
                <div className="column">
                  <div className="level-item is-block">
                    <div className="heading">Total</div>
                    <p>
                      <strong>
                        ${numberTrim(info.tokenBUSD + info.tokenAUSD)}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LPTokens;
