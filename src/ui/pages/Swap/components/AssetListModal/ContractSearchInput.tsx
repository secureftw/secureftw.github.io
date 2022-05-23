import React, { useEffect, useRef, useState } from "react";
import { wallet } from "@cityofzion/neon-core";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { INetworkType } from "../../../../../packages/neo/network";

interface ContractSearchInputProps {
  network: INetworkType;
  onAssetClick: (assetHash: string, symbol: string) => void;
}
const ContractSearchInput = ({
  network,
  onAssetClick,
}: ContractSearchInputProps) => {
  const [customContractHash, setContractHash] = useState("");
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
        const { symbol, decimals } = await new SwapContract(
          network
        ).getContractInfo(hash);
        if (decimals !== "8") {
          setError(
            `FTWSwap only supports tokens with 8 decimals. This token uses ${decimals} decimals.`
          );
        } else {
          onAssetClick(hash, symbol);
        }
      } catch (e: any) {
        setError(e.message);
      }
    } else {
      setError("Please enter a valid contract script hash.");
    }
  };
  useEffect(() => {
    // @ts-ignore
    firstInput.current.focus();
  }, []);

  return (
    <>
      <label className="label is-marginless">Enter a contract hash</label>
      <p className="help has-text-grey">
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
  );
};

export default ContractSearchInput;
