import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { FaExchangeAlt } from "react-icons/fa";
import { IPairInfo } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { INetworkType } from "../../../../../packages/neo/network";

interface ISwapInputsProps {
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
  isTokenAMaxGas?: any;
  isTokenBMaxGas?: any;
  setFee: (fee: number) => void;
}

interface ISearchTerm {
  type: "A" | "B";
  value: string;
}

const SwapInputs = ({
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
  isTokenAMaxGas,
  isTokenBMaxGas,
  setFee,
}: ISwapInputsProps) => {
  const [searchTerm, setSearchTerm] = useState<ISearchTerm>();
  const [isAmountALoading, setAmountALoading] = useState(false);
  const [isAmountBLoading, setAmountBLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        const no = parseFloat(searchTerm.value);
        if (no > 0) {
          if (searchTerm.type === "A") {
            setAmountBLoading(true);
          } else {
            setAmountALoading(true);
          }
          const { estimated, fee } = await new SwapContract(
            network
          ).getSwapEstimate(
            searchTerm.type === "A" ? tokenA : tokenB,
            searchTerm.type === "A" ? tokenB : tokenA,
            searchTerm.type === "A" ? tokenA : tokenB,
            searchTerm.value
          );
          if (searchTerm.type === "A") {
            setAmountBLoading(false);
            setAmountB(estimated.toString());
            setFee(fee);
          } else {
            setAmountALoading(false);
            setAmountA(estimated.toString());
            setFee(fee);
          }
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  return (
    <>
      <Input
        contractHash={tokenA}
        symbol={symbolA}
        isDisable={!tokenA || !tokenB || noLiquidity}
        // isReadOnly={!tokenA}
        heading="Sell"
        onClickAsset={() => onAssetChange("A")}
        val={amountA}
        setValue={(value) => {
          setAmountA(value);
          setSearchTerm({
            type: "A",
            value,
          });
        }}
        userBalance={userTokenABalance}
        isLoading={isAmountALoading}
        errorMessage={
          isTokenAMaxGas
            ? "You need to have GAS for transaction fee"
            : undefined
        }
      />
      <div className="pt-4 pb-4">
        <button onClick={onSwitch} className="button is-white is-fullwidth">
          <FaExchangeAlt />
        </button>
      </div>
      <Input
        contractHash={tokenB}
        symbol={symbolB}
        isDisable={!tokenA || !tokenB || noLiquidity}
        // isReadOnly={!tokenB}
        heading="Buy"
        onClickAsset={() => {
          onAssetChange("B");
        }}
        val={amountB}
        setValue={(value) => {
          setAmountB(value);
          setSearchTerm({
            type: "B",
            value,
          });
        }}
        userBalance={userTokenBBalance}
        isLoading={isAmountBLoading}
        errorMessage={
          isTokenBMaxGas
            ? "You need to have GAS for transaction fee"
            : undefined
        }
      />
    </>
  );
};

export default SwapInputs;
