import React, { useEffect, useRef, useState } from "react";
import { wallet } from "@cityofzion/neon-core";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { INetworkType } from "../../../../../packages/neo/network";
import { IContractInfo } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
import {FaAngleLeft, FaAngleRight, FaQuestion } from "react-icons/fa";

interface ContractSearchInputProps {
  network: INetworkType;
  onAssetClick: (assetHash: string, symbol: string, decimals: number) => void;
}
const ContractSearchInput = ({
  network,
  onAssetClick,
}: ContractSearchInputProps) => {
  const [customContractHash, setContractHash] = useState("");
  const [contractInfo, setContractInfo] = useState<IContractInfo | undefined>();
  const [error, setError] = useState<string | undefined>();
  const firstInput = useRef(null);

  const onAddContractHash = async () => {
    setError(undefined);
    let hash = customContractHash;
    const ox = customContractHash.substring(0, 2);
    if (ox === "0x") {
      hash = customContractHash.substring(2);
    }
    if (wallet.isScriptHash(hash)) {
      try {
        const res = await new SwapContract(network).getContractInfo(hash);
        if (res.decimals === 0) {
          setError(`FTWSwap cannot support tokens with 0 decimals.`);
        } else {
          setContractInfo(res);
          // onAssetClick(hash, symbol, decimals);
        }
      } catch (e: any) {
        setError(e.message);
      }
    } else {
      setError("Please enter a valid contract script hash.");
    }
  };

  const handleSubmit = () => {
    if (contractInfo) {
      onAssetClick(
        contractInfo.contractHash,
        contractInfo.symbol,
        contractInfo.decimals
      );
    }
  };

  useEffect(() => {
    // @ts-ignore
    firstInput.current.focus();
  }, []);

  return (
    <>
      {contractInfo ? (
        <>
          <h1 className="title is-5 is-marginless">We've found the contract</h1>
          <hr />
          <div className="content">
            <h6>Contract Hash</h6>
            <p>{contractInfo.contractHash}</p>
            <h6>Symbol</h6>
            <p>{contractInfo.symbol}</p>
            <h6>Decimals</h6>
            <p>{contractInfo.decimals}</p>
            <h6>
              Is whitelist by FTWSmith?
              <div
                className="dropdown is-up ml-3 is-hoverable"
                style={{ marginTop: "-5px" }}
              >
                <div className="dropdown-trigger">
                  <button
                    className="button is-small is-info"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu7"
                  >
                    <span className="icon is-small">
                      <FaQuestion />
                    </span>
                    <span>Learn more</span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu7" role="menu">
                  <div className="dropdown-content">
                    <div className="dropdown-item">
                      FTWSmith verifies contracts minted from Smith.
                    </div>
                  </div>
                </div>
              </div>
            </h6>
            <p
              className={
                contractInfo.isWhitelisted
                  ? "has-text-info"
                  : "has-text-warning"
              }
            >
              {contractInfo.isWhitelisted ? "Yes" : "No"}
            </p>
          </div>
          <div className="buttons">
            <button
              onClick={() => setContractInfo(undefined)}
              className="button is-light"
            >
              <FaAngleLeft />
              Back
            </button>
            <button onClick={handleSubmit} className="button is-primary">
              <span>Next</span>
              <FaAngleRight />
            </button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1 className="title is-5">Enter a contract hash</h1>
          <p className="subtitle is-7 has-text-grey">
            Example: 0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5
          </p>
          <hr />
          <div className="field">
            <input
              placeholder={"0x..."}
              ref={firstInput}
              className="input"
              value={customContractHash}
              onChange={(e) => setContractHash(e.target.value)}
            />
            {error && <p className="help is-danger">{error}</p>}
          </div>
          <hr />
          <button
            onClick={onAddContractHash}
            disabled={!customContractHash}
            className="button is-primary"
          >
            Submit
          </button>
        </>
      )}
    </>
  );
};

export default ContractSearchInput;
