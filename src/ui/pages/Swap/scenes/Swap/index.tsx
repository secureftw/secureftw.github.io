import React, { useEffect, useMemo, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { GAS_SCRIPT_HASH } from "../../../../../packages/neo/consts";
import {
  FTW_SCRIPT_HASH,
  SwapContract,
} from "../../../../../packages/neo/contracts";
import { toast } from "react-hot-toast";
import { getEstimate } from "../../../../../packages/neo/contracts/ftw/swap/helpers";
import Input from "../../components/Input";
import AssetListModal from "../../components/AssetListModal";
// tslint:disable-next-line:no-submodule-imports
import { FaExchangeAlt } from "react-icons/all";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { Link, useLocation } from "react-router-dom";
import { SWAP_PATH_LIQUIDITY } from "../../../../../consts";
import queryString from "query-string";
import store from "store2";
import { LocalStorage } from "../../../../../packages/neo/local-storage";

const Swap = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [isAssetChangeModalActive, setAssetChangeModalActive] = useState<
    "A" | "B" | ""
  >("");
  const cachedTokenA = LocalStorage.getSwapTokenA();
  const [tokenA, setTokenA] = useState<any>(
    params.tokenA
      ? params.tokenA
      : cachedTokenA
      ? cachedTokenA
      : FTW_SCRIPT_HASH[network]
  );
  const cachedTokenB = LocalStorage.getSwapTokenB();
  const [tokenB, setTokenB] = useState<any>(
    params.tokenB ? params.tokenB : cachedTokenB ? cachedTokenB : undefined
  );
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [reserve, setReserve] = useState<any>();
  const [isPairLoading, setPairLoading] = useState(false);
  const [txid, setTxid] = useState("");
  const onAssetChange = (type: "A" | "B" | "") => {
    setAssetChangeModalActive(type);
  };

  const onAssetClick = (assetHash) => {
    if (isAssetChangeModalActive === "A") {
      LocalStorage.setSwapTokenA(assetHash);
      setTokenA(assetHash);
      if (tokenB) {
        loadPair(assetHash, tokenB);
      }
    } else {
      LocalStorage.setSwapTokenB(assetHash);
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
  const onSwitch = async () => {
    setTokenB(tokenA);
    setTokenA(tokenB ? tokenB : "");
    setAmountB(amountA);
    setAmountA(amountB);
    if (tokenB && amountB && amountB !== "0" && tokenA) {
      const estimated = await new SwapContract(network).getEstimate(
        tokenB,
        tokenA,
        tokenB,
        amountB
      );
      setTokenB(tokenA);
      setTokenA(tokenB ? tokenB : "");
      setAmountA(amountB);
      setAmountB(estimated ? estimated.toString() : "0");
    } else {
      setTokenB(tokenA);
      setTokenA(tokenB ? tokenB : "");
      setAmountB(amountA);
      setAmountA(amountB);
    }
  };

  const loadPair = async (A, B) => {
    setPairLoading(true);
    const res = await new SwapContract(network).getPair(A, B, connectedWallet);
    setReserve(res);
    setPairLoading(false);
    if (amountA && res.pair[tokenA] !== 0) {
      const estimated = await new SwapContract(network).getEstimate(
        A,
        B,
        A,
        amountA
      );
      // @ts-ignore
      // const estimated = getEstimate(amountA, res[A], res[B]);
      setAmountB(estimated ? estimated.toString() : "0");
    } else {
      setAmountB("0");
    }
  };

  useEffect(() => {
    if (params.tokenA && params.tokenB) {
      loadPair(params.tokenA, params.tokenB);
    }
  }, [location]);

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
  const noLiquidity =
    reserve && reserve.pair[tokenA] === 0 && reserve.pair[tokenB] === 0;
  return (
    <div>
      <>
        {noLiquidity && (
          <div className="notification is-info">
            No liquidity with the pairs. Provide liquidity and earn fees.
            <br />
            <br />
            <Link className="button is-small is-light" to={SWAP_PATH_LIQUIDITY}>
              Go to liquidity page
            </Link>
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
                  reserve.pair[tokenB] < parseFloat(amountB)
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
