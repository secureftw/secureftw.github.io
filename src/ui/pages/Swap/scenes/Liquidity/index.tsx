import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { GAS_SCRIPT_HASH } from "../../../../../packages/neo/consts";
import { useWallet } from "../../../../../packages/provider";
import {
  FTW_SCRIPT_HASH,
  SwapContract,
} from "../../../../../packages/neo/contracts";
import AssetListModal from "../../components/AssetListModal";
import { toast } from "react-hot-toast";
import { getEstimate } from "../../../../../packages/neo/contracts/ftw/swap/helpers";
// tslint:disable-next-line:no-submodule-imports
import { FaExchangeAlt } from "react-icons/all";
import { toDecimal } from "../../../../../packages/neo/utils";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";

const Liquidity = (props) => {
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [isAssetChangeModalActive, setAssetChangeModalActive] = useState<
    "A" | "B" | ""
  >("");
  const [tokenA, setTokenA] = useState<any>(FTW_SCRIPT_HASH[network]);
  const [amountA, setAmountA] = useState("");
  const [tokenB, setTokenB] = useState<any>();
  const [amountB, setAmountB] = useState("");
  const [reserve, setReserve] = useState<any>();
  const [isPairLoading, setPairLoading] = useState(false);

  const onAssetChange = (type: "A" | "B" | "") => {
    setAssetChangeModalActive(type);
  };
  const onAssetClick = (assetHash) => {
    if (isAssetChangeModalActive === "A") {
      setTokenA(assetHash);
    } else {
      setTokenB(assetHash);
    }
    setAssetChangeModalActive("");
  };

  const onAddLiquidity = async () => {
    if (connectedWallet) {
      if (tokenA && tokenB && amountA && amountB) {
        try {
          const res = await new SwapContract(network).provide(
            connectedWallet,
            tokenA,
            amountA,
            tokenB,
            amountB
          );
        } catch (e: any) {
          toast.error(e.description ? e.description : e.message);
        }
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const onTokenAAmountChange = (type: "A" | "B", val: string) => {
    if (type === "A") {
      if (tokenB && reserve && reserve[tokenA] !== 0 && reserve[tokenB] !== 0) {
        const estimated = getEstimate(val, reserve[tokenA], reserve[tokenB]);
        setAmountB(estimated.toString());
      }
      setAmountA(val);
    } else {
      if (
        tokenA &&
        tokenB &&
        reserve &&
        reserve[tokenA] !== 0 &&
        reserve[tokenB] !== 0
      ) {
        const estimated = getEstimate(val, reserve[tokenB], reserve[tokenA]);
        setAmountA(estimated.toString());
      }
      setAmountB(val);
    }
  };

  const onSwitch = () => {
    setTokenB(tokenA);
    setTokenA(tokenB ? tokenB : "");
    setAmountB(amountA);
    setAmountA(amountB);
  };

  useEffect(() => {
    async function fetchPair(A, B) {
      try {
        setPairLoading(true);
        const res = await new SwapContract(network).getPair(
          A,
          B,
          connectedWallet
        );
        setPairLoading(false);
        setReserve(res);
        console.log(res);
        if (
          tokenA &&
          tokenB &&
          amountA &&
          !amountB &&
          res[tokenA] !== 0 &&
          res[tokenB] !== 0
        ) {
          // @ts-ignore
          const estimated = getEstimate(amountA, res[tokenA], res[tokenB]);
          console.log(estimated);
          setAmountB(estimated.toString());
        }
        if (
          tokenA &&
          tokenB &&
          amountB &&
          !amountA &&
          res[tokenA] !== 0 &&
          res[tokenB] !== 0
        ) {
          // @ts-ignore
          const estimated = getEstimate(amountB, res[tokenB], res[tokenA]);
          setAmountA(estimated.toString());
        }
      } catch (e: any) {
        console.log(e);
        // setError(e.message);
      }
    }
    if (tokenA && tokenB) {
      fetchPair(tokenA, tokenB);
    }
  }, [tokenA, tokenB]);

  // let tokenBofA = 0;
  // let tokenAofB = 0;
  //
  // if (tokenA && tokenB && amountA && amountB && pairInfo) {
  //   const reservedA = pairInfo[tokenA];
  //   const reservedB = pairInfo[tokenB];
  //   tokenBofA =
  //     (parseFloat("100000000") * parseFloat(reservedB)) / parseFloat(reservedA);
  //   tokenBofA = Math.floor(tokenBofA);
  //   tokenBofA = toDecimal(tokenBofA.toString());
  //
  //   tokenAofB =
  //     (parseFloat("100000000") * parseFloat(reservedA)) / parseFloat(reservedB);
  //   tokenAofB = Math.floor(tokenAofB);
  //   tokenAofB = toDecimal(tokenAofB.toString());
  // }
  const noLiquidity = reserve && reserve[tokenA] === 0 && reserve[tokenB] === 0;
  return (
    <>
      {noLiquidity && (
        <div className="notification is-info">
          <strong>Liquidity Provider Rewards</strong>
          <br />
          Liquidity providers earn a 0.25% fee on all trades proportional to
          their share of the pool. Fees are added to the pool, accrue in real
          time and can be claimed by withdrawing your liquidity.
        </div>
      )}
      <div className="is-relative">
        <Input
          heading="Pair A"
          onClickAsset={() => onAssetChange("A")}
          asset={tokenA ? ASSET_LIST[network][tokenA] : undefined}
          val={amountA}
          setValue={(val, e) => onTokenAAmountChange("A", val)}
          userBalance={reserve ? reserve.balances[tokenA] : undefined}
        />

        <div className="pt-3 pb-3">
          <button onClick={onSwitch} className="button is-white">
            <FaExchangeAlt />
          </button>
        </div>

        <Input
          heading="Pair B"
          // isReadOnly={
          //   pairInfo &&
          //   tokenB &&
          //   pairInfo[tokenA] !== "0" &&
          //   pairInfo[tokenB] !== "0"
          // }
          isLoading={isPairLoading}
          onClickAsset={() => onAssetChange("B")}
          asset={tokenB ? ASSET_LIST[network][tokenB] : undefined}
          val={amountB}
          setValue={(val, e) => onTokenAAmountChange("B", val)}
          userBalance={reserve && tokenB ? reserve.balances[tokenB] : undefined}
        />

        {connectedWallet ? (
          tokenA && tokenB && amountA && amountB ? (
            <>
              <hr />
              {/*<div className="box">*/}
              {/*  {`${tokenBofA} ${ASSET_LIST[tokenB].symbol} per ${ASSET_LIST[tokenA].symbol}`}*/}
              {/*  <br />*/}
              {/*  {`${tokenAofB} ${ASSET_LIST[tokenA].symbol} per ${ASSET_LIST[tokenB].symbol}`}*/}
              {/*</div>*/}
              <button
                disabled={
                  reserve.balances[tokenA] < parseFloat(amountA) ||
                  reserve.balances[tokenB] < parseFloat(amountB)
                }
                onClick={onAddLiquidity}
                className="button is-fullwidth is-primary"
              >
                Add Liquidity
              </button>
            </>
          ) : (
            <div />
          )
        ) : (
          <>
            <hr />
            <button
              onClick={openWalletModal}
              className="button is-fullwidth is-primary"
            >
              Connect wallet
            </button>
          </>
        )}

        {isAssetChangeModalActive && (
          <AssetListModal
            tokenA={tokenA}
            tokenB={tokenB}
            onAssetClick={onAssetClick}
            onClose={() => setAssetChangeModalActive("")}
          />
        )}
      </div>
    </>
  );
};

export default Liquidity;
