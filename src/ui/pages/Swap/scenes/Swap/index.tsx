import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import {
  FTW_SCRIPT_HASH,
  SwapContract,
} from "../../../../../packages/neo/contracts";
import { toast } from "react-hot-toast";
import Input from "../../components/Input";
import AssetListModal from "../../components/AssetListModal";
// tslint:disable-next-line:no-submodule-imports
import { FaAngleLeft, FaExchangeAlt } from "react-icons/all";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { Link, useLocation } from "react-router-dom";
import { SWAP_PATH, SWAP_PATH_LIQUIDITY_ADD } from "../../../../../consts";
// tslint:disable-next-line:no-implicit-dependencies
import queryString from "query-string";
import { LocalStorage } from "../../../../../packages/neo/local-storage";
import PairSelect from "../../components/PairSelect";
import { IPairInfo } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";

const Swap = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);

  const { network, connectedWallet, openWalletModal } = useWallet();
  const [isAssetChangeModalActive, setAssetChangeModalActive] = useState<
    "A" | "B" | ""
  >("");
  // Temporary disabled
  // const cachedTokenA = LocalStorage.getSwapTokenA();
  // const cachedTokenB = LocalStorage.getSwapTokenB();

  const [tokenA, setTokenA] = useState<any>(
    params.tokenA ? params.tokenA : undefined
  );
  const [tokenB, setTokenB] = useState<any>(
    params.tokenB ? params.tokenB : undefined
  );
  const [symbolA, setSymbolA] = useState<any>(
    params.symbolA ? params.symbolA : undefined
  );
  const [symbolB, setSymbolB] = useState<any>(
    params.symbolB ? params.symbolB : undefined
  );
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [data, setData] = useState<IPairInfo | undefined>();
  const [isPairLoading, setPairLoading] = useState(false);
  const [txid, setTxid] = useState("");
  const onAssetChange = (type: "A" | "B" | "") => {
    // Temporary disable
    // setAssetChangeModalActive(type);
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

  const onPairSelect = (pair: { tokenA: string; tokenB: string }) => {
    loadPair(pair.tokenA, pair.tokenB);
    setTokenA(pair.tokenA);
    setTokenB(pair.tokenB);
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
    setSymbolA(symbolB);
    setSymbolB(symbolA);
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
      setAmountB(estimated ? estimated.toString() : "");
    } else {
      setTokenB(tokenA);
      setTokenA(tokenB ? tokenB : "");
      setAmountB(amountA);
      setAmountA(amountB);
    }
  };

  const loadPair = async (A, B) => {
    setPairLoading(true);
    const res = await new SwapContract(network).getReserve(
      A,
      B,
      connectedWallet
    );
    setData(res);
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
      setAmountB(estimated ? estimated.toString() : "");
    } else {
      setAmountB("");
    }
  };

  useEffect(() => {
    if (params.tokenA && params.tokenB) {
      loadPair(params.tokenA, params.tokenB);
    }
  }, [location]);

  const noLiquidity =
    data && data.pair[tokenA] === 0 && data.pair[tokenB] === 0;

  const priceImpact =
    data && amountB ? (parseFloat(amountB) / data.pair[tokenB]) * 100 : 0;
  return (
    <div>
      <Link className="button is-white" to={SWAP_PATH}>
        <span className="icon">
          <FaAngleLeft />
        </span>
        <span>Pools</span>
      </Link>
      <hr />
      <>
        {noLiquidity && (
          <div className="notification is-info">
            No liquidity with the pairs. Provide liquidity and earn fees.
            <br />
            <br />
            <Link
              className="button is-small is-light"
              to={
                tokenA && tokenB && symbolA && symbolB
                  ? `${SWAP_PATH_LIQUIDITY_ADD}?tokenA=${tokenA}&tokenB=${tokenB}&symbolA=${symbolA}&symbolB=${symbolB}`
                  : SWAP_PATH_LIQUIDITY_ADD
              }
            >
              Go to liquidity page
            </Link>
          </div>
        )}

        {tokenA && tokenB ? (
          <>
            <Input
              contractHash={tokenA}
              symbol={symbolA}
              heading="Swap From"
              onClickAsset={() => onAssetChange("A")}
              val={amountA}
              setValue={(val, e) => onTokenAAmountChange(val)}
              userBalance={
                connectedWallet && data ? data.balances[tokenA] : undefined
              }
            />
            <div className="pt-4 pb-4">
              <button
                onClick={onSwitch}
                className="button is-white is-fullwidth"
              >
                <FaExchangeAlt />
              </button>
            </div>
            <Input
              contractHash={tokenB}
              symbol={symbolB}
              isReadOnly={true}
              heading="Swap To"
              isLoading={isPairLoading}
              onClickAsset={() => {
                onAssetChange("B");
              }}
              val={amountB}
              // setValue={(val, e) => onTokenAAmountChange("B", val, e)}
              setValue={(val, e) => {
                return false;
              }}
              userBalance={
                connectedWallet && data ? data.balances[tokenB] : undefined
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
                      (data && data.balances[tokenA] < parseFloat(amountA)) ||
                      (data && data.pair[tokenB] < parseFloat(amountB)) ||
                      priceImpact > 10
                    }
                    onClick={onSwap}
                    className={`button is-fullwidth is-primary ${
                      priceImpact > 10 ? "is-danger" : ""
                    }`}
                  >
                    {priceImpact > 10 ? "Price impact is too high" : "Swap"}
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
        ) : (
          <>
            <label className="label">Select a pair</label>
            <PairSelect onSelect={onPairSelect} />
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
