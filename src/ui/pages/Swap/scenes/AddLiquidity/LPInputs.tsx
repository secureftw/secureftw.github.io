import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { FaExchangeAlt } from "react-icons/all";
import { INetworkType } from "../../../../../packages/neo/network";
import { IPairInfo } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
import { SwapContract } from "../../../../../packages/neo/contracts";

interface ILPInputsProps {
  network: INetworkType;
  tokenA: string;
  tokenB: string;
  symbolA: string;
  symbolB: string;
  amountA: string;
  amountB: string;
  onAssetChange: (type: "A" | "B") => void;
  userTokenABalance: any;
  userTokenBBalance: any;
  onSwitch: () => void;
  setAmountA: (val: string) => void;
  setAmountB: (val: string) => void;
  reserve?: IPairInfo;
  noLiquidity?: boolean;
}

interface ISearchTerm {
  type: "A" | "B";
  value: string;
}

const LPInputs = ({
  network,
  tokenA,
  tokenB,
  symbolA,
  symbolB,
  onAssetChange,
  amountA,
  amountB,
  onSwitch,
  userTokenABalance,
  userTokenBBalance,
  setAmountA,
  setAmountB,
  reserve,
  noLiquidity,
}: ILPInputsProps) => {
  const handleChangeAmountA = (val) => {
    setAmountA(val);
    if (!noLiquidity && reserve) {
      const estimated = new SwapContract(network).getLPEstimate(
        val,
        reserve.pair[tokenA],
        reserve.pair[tokenB]
      );
      setAmountB(estimated);
    }
  };
  const handleChangeAmountB = (val) => {
    setAmountB(val);
    if (!noLiquidity && reserve) {
      const estimated = new SwapContract(network).getLPEstimate(
        val,
        reserve.pair[tokenB],
        reserve.pair[tokenA]
      );
      setAmountA(estimated);
    }
  };

  return (
    <>
      <Input
        isDisable={!tokenA}
        heading="Pair A"
        onClickAsset={() => {
          onAssetChange("A");
        }}
        contractHash={tokenA}
        symbol={symbolA}
        val={amountA}
        setValue={handleChangeAmountA}
        userBalance={userTokenABalance}
      />
      <div className="pt-4 pb-4">
        <button onClick={onSwitch} className="button is-white is-fullwidth">
          <FaExchangeAlt />
        </button>
      </div>
      <Input
        isDisable={!tokenB}
        heading="Pair B"
        onClickAsset={() => {
          onAssetChange("B");
        }}
        contractHash={tokenB}
        symbol={symbolB}
        val={amountB}
        setValue={handleChangeAmountB}
        userBalance={userTokenBBalance}
      />
    </>
  );
};

export default LPInputs;
