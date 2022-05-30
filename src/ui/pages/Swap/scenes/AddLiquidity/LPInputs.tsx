import React from "react";
import Input from "../../components/Input";
import { FaPlusSquare } from "react-icons/fa";
import { INetworkType } from "../../../../../packages/neo/network";
import { IReserveData } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { ITokenState } from "./index";
import { IConnectedWallet } from "../../../../../packages/neo/wallet/interfaces";

interface ILPInputsProps {
  network: INetworkType;
  tokenA?: ITokenState;
  tokenB?: ITokenState;
  amountA?: number;
  amountB?: number;
  onAssetChange: (type: "A" | "B") => void;
  onSwitch: () => void;
  setAmountA: (val?: number) => void;
  setAmountB: (val?: number) => void;
  data?: IReserveData;
  noLiquidity?: boolean;
  connectedWallet?: IConnectedWallet;
  isTokenAMaxGas?: any;
  isTokenBMaxGas?: any;
}

const LPInputs = ({
  network,
  tokenA,
  tokenB,
  onAssetChange,
  amountA,
  amountB,
  setAmountA,
  setAmountB,
  noLiquidity,
  data,
  connectedWallet,
  isTokenAMaxGas,
  isTokenBMaxGas,
}: ILPInputsProps) => {
  const handleChangeAmountA = (val) => {
    setAmountA(val);
    if (val !== undefined) {
      if (!noLiquidity && data && tokenA && tokenB) {
        const estimated = new SwapContract(network).getLPEstimate(
          val,
          tokenA.decimals,
          tokenB.decimals,
          data.pair[tokenA.hash].reserveAmount,
          data.pair[tokenB.hash].reserveAmount
        );
        setAmountB(parseFloat(estimated));
      }
    } else {
      if (!noLiquidity) {
        setAmountB(undefined);
      }
    }
  };
  const handleChangeAmountB = (val) => {
    setAmountB(val);
    if (val !== undefined) {
      if (!noLiquidity && data && tokenA && tokenB) {
        const estimated = new SwapContract(network).getLPEstimate(
          val,
          tokenB.decimals,
          tokenA.decimals,
          data.pair[tokenB.hash].reserveAmount,
          data.pair[tokenA.hash].reserveAmount
        );
        setAmountA(parseFloat(estimated));
      }
    } else {
      if (!noLiquidity) {
        setAmountA(undefined);
      }
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
        contractHash={tokenA ? tokenA.hash : ""}
        symbol={tokenA ? tokenA.symbol : ""}
        decimals={tokenA ? tokenA.decimals : undefined}
        val={amountA}
        setValue={handleChangeAmountA}
        userBalance={
          connectedWallet && tokenA && data
            ? data.userBalances[tokenA.hash]
            : undefined
        }
        errorMessage={
          isTokenAMaxGas
            ? "You need to have GAS for transaction fee"
            : undefined
        }
      />
      <div className="pt-4 pb-4 has-text-centered">
        <FaPlusSquare size={16} />
      </div>
      <Input
        isDisable={!tokenB}
        heading="Pair B"
        onClickAsset={() => {
          onAssetChange("B");
        }}
        contractHash={tokenB ? tokenB.hash : ""}
        symbol={tokenB ? tokenB.symbol : ""}
        decimals={tokenB ? tokenB.decimals : undefined}
        val={amountB}
        setValue={handleChangeAmountB}
        userBalance={
          connectedWallet && tokenB && data
            ? data.userBalances[tokenB.hash]
            : undefined
        }
        errorMessage={
          isTokenBMaxGas
            ? "You need to have GAS for transaction fee"
            : undefined
        }
      />
    </>
  );
};

export default LPInputs;
