import React, { useState } from "react";
import { wallet } from "@cityofzion/neon-core";
import { toast } from "react-hot-toast";
import {
  FTW_SCRIPT_HASH,
  NUDES_SCRIPT_HASH,
  SwapContract,
} from "../../../../../../../packages/neo/contracts";
import { useWallet } from "../../../../../../../packages/provider";
import { useHistory } from "react-router-dom";
import { SWAP_PATH_LIQUIDITY } from "../../../../../../../consts";

const CreatePool = (props) => {
  const { network } = useWallet();
  const history = useHistory();
  const [tokenA, setTokenA] = useState<string | undefined>();
  const [tokenB, setTokenB] = useState<string | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const handleSubmit = async () => {
    setErrors([]);
    setLoading(true);
    const _errors: string[] = [];

    if (
      !wallet.isScriptHash(tokenA as string) ||
      !wallet.isScriptHash(tokenB as string)
    ) {
      _errors.push("Check contract hashes");
    }

    if (tokenA === tokenB) {
      _errors.push("Token A and Token B cannot be the same.");
    }

    if (_errors.length === 0) {
      const res = await new SwapContract(network).getContractHashes(
        // @ts-ignore
        tokenA,
        tokenB
      );

      if (res.tokenA.decimals !== "8" || res.tokenB.decimals !== "8") {
        _errors.push("We only can support tokens with 8 decimals.");
      }

      if (res.reserve.amountA === 0 || res.reserve.amountB !== 0) {
        _errors.push("There is existing pool.");
      }
    }

    if (_errors.length === 0) {
      history.push(`${SWAP_PATH_LIQUIDITY}?tokenA=${tokenA}&tokenB=${tokenB}`);
    } else {
      setLoading(false);
      setErrors(_errors);
    }
  };
  return (
    <div>
      <h1 className="title">Create a new swap pool</h1>
      {errors.length > 0 ? (
        <div className="notification is-danger content">
          <strong>Please check following messages</strong>
          <br />
          <ul>
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="notification is-info">
          <strong>Liquidity Provider Rewards</strong>
          <br />
          Liquidity providers earn a 0.25% fee on all trades proportional to
          their share of the pool. Fees are added to the pool, accrue in real
          time and can be claimed by withdrawing your liquidity.
        </div>
      )}

      <hr />
      <div className="field">
        <label className="label">Token A</label>
        <input
          value={tokenA}
          onChange={(e: any) => setTokenA(e.target.value)}
          className="input"
        />
      </div>
      <div className="field">
        <label className="label">Token B</label>
        <input
          value={tokenB}
          onChange={(e: any) => setTokenB(e.target.value)}
          className="input"
        />
      </div>
      <hr />
      <button
        onClick={handleSubmit}
        disabled={!tokenA || !tokenB}
        className={`button is-primary ${isLoading ? "is-loading" : ""}`}
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePool;
