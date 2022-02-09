import React, { useEffect, useMemo, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { GAS_SCRIPT_HASH } from "../../../../../packages/neo/consts";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { toast } from "react-hot-toast";
import { getEstimate } from "../../../../../packages/neo/contracts/ftw/swap/helpers";
import Input from "../../components/Input";
import AssetListModal from "../../components/AssetListModal";
// tslint:disable-next-line:no-submodule-imports
import { FaExchangeAlt } from "react-icons/all";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";

const Swap = () => {
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [isAssetChangeModalActive, setAssetChangeModalActive] = useState<
    "A" | "B" | ""
  >("");
  const [tokenA, setTokenA] = useState<any>(GAS_SCRIPT_HASH);
  const [amountA, setAmountA] = useState("");
  const [tokenB, setTokenB] = useState<any>();
  const [amountB, setAmountB] = useState("");
  const [reserve, setReserve] = useState<any>();
  const [isPairLoading, setPairLoading] = useState(false);
  const [txid, setTxid] = useState("");

  const onAssetChange = (type: "A" | "B" | "") => {
    setAssetChangeModalActive(type);
  };

  const onAssetClick = (assetHash) => {
    if (isAssetChangeModalActive === "A") {
      setTokenA(assetHash);
      if (tokenB) {
        loadPair(assetHash, tokenB);
      }
    } else {
      setTokenB(assetHash);
      if (tokenA) {
        loadPair(tokenA, assetHash);
      }
    }
    setAssetChangeModalActive("");
  };

  const onTokenAAmountChange = async (val: string) => {
    setAmountA(val);
    if (tokenB) {
      const res = await new SwapContract(network).getEstimate(
        tokenA,
        tokenB,
        tokenA,
        val
      );
      setAmountB(res as any);
    }
  };

  const onSuccess = () => {
    setAmountA("0");
    setAmountB("0");
    setTxid("");
  };

  const onSwap = async () => {
    if (connectedWallet) {
      if (tokenA && tokenB && amountA && amountB) {
        try {
          const res = await new SwapContract(network).swap(
            connectedWallet,
            tokenA,
            amountA,
            tokenB,
            amountB
          );
          setTxid(res);
        } catch (e: any) {
          toast.error(e.description ? e.description : e.message);
        }
      }
    } else {
      toast.error("Please connect wallet");
    }
  };
  const onSwitch = () => {
    setTokenB(tokenA);
    setTokenA(tokenB ? tokenB : "");
    setAmountB(amountA);
    setAmountA(amountB);
  };

  const loadPair = async (A, B) => {
    setPairLoading(true);
    const res = await new SwapContract(network).getPair(A, B, connectedWallet);
    setPairLoading(false);
    setReserve(res);
    if (amountA && res[tokenA] !== 0) {
      // @ts-ignore
      const estimated = getEstimate(amountA, res[A], res[B]);
      setAmountB(estimated.toString());
    }
  };

  // useEffect(() => {
  //   async function fetchPair(A, B) {
  //     try {
  //       setPairLoading(true);
  //       const res = await new SwapContract(network).getPair(
  //         A,
  //         B,
  //         connectedWallet
  //       );
  //       setPairLoading(false);
  //       setReserve(res);
  //       if (amountA && res[tokenA] !== 0) {
  //         // @ts-ignore
  //         const estimated = getEstimate(amountA, res[A], res[B]);
  //         setAmountB(estimated.toString());
  //       }
  //     } catch (e: any) {
  //       // setError(e.message);
  //     }
  //   }
  //   if (tokenA && tokenB) {
  //     fetchPair(tokenA, tokenB);
  //   }
  // }, [network, tokenA, tokenB]);

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
    <div>
      <>
        {noLiquidity && (
          <div className="notification is-danger">
            No liquidity with the pairs.
          </div>
        )}
        <Input
          heading="Swap From"
          onClickAsset={() => onAssetChange("A")}
          asset={tokenA ? ASSET_LIST[network][tokenA] : undefined}
          val={amountA}
          setValue={(val, e) => onTokenAAmountChange(val)}
          userBalance={
            connectedWallet && reserve ? reserve.balances[tokenA] : undefined
          }
        />
        <div className="pt-3 pb-3">
          <button onClick={onSwitch} className="button is-white">
            <FaExchangeAlt />
          </button>
        </div>
        <Input
          isReadOnly={true}
          heading="Swap To"
          isLoading={isPairLoading}
          onClickAsset={() => onAssetChange("B")}
          asset={tokenB ? ASSET_LIST[network][tokenB] : undefined}
          val={amountB}
          // setValue={(val, e) => onTokenAAmountChange("B", val, e)}
          setValue={(val, e) => {
            return false;
          }}
          userBalance={
            connectedWallet && reserve ? reserve.balances[tokenB] : undefined
          }
        />

        {connectedWallet ? (
          tokenA && tokenB && amountA && amountB ? (
            <>
              {/*<div className="box">*/}
              {/*  {`${tokenBofA} ${ASSET_LIST[tokenB].symbol} per ${ASSET_LIST[tokenA].symbol}`}*/}
              {/*  /!*<br />*!/*/}
              {/*  /!*{`${tokenAofB} ${ASSET_LIST[tokenA].symbol} per ${ASSET_LIST[tokenB].symbol}`}*!/*/}
              {/*</div>*/}
              <hr />
              <button
                disabled={
                  reserve.balances[tokenA] < parseFloat(amountA) ||
                  reserve[tokenB] < parseFloat(amountB)
                }
                onClick={onSwap}
                className="button is-fullwidth is-primary"
              >
                Swap
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
      </>

      {txid && (
        <Modal onClose={() => setTxid("")}>
          <AfterTransactionSubmitted
            txid={txid}
            network={network}
            onSuccess={onSuccess}
            onError={() => setTxid("")}
          />
        </Modal>
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
  );
};

export default Swap;
