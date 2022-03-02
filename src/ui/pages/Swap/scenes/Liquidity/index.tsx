import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import AssetListModal from "../../components/AssetListModal";
import { toast } from "react-hot-toast";
import { getEstimate } from "../../../../../packages/neo/contracts/ftw/swap/helpers";
// tslint:disable-next-line:no-submodule-imports
import { FaExchangeAlt } from "react-icons/all";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { useLocation } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import queryString from "query-string";

const Liquidity = (props) => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const isNewPoolMode = !params.tokenA && !params.tokenBv;
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [isAssetChangeModalActive, setAssetChangeModalActive] = useState<
    "A" | "B" | ""
  >("");

  const [tokenA, setTokenA] = useState<any>("");
  const [tokenB, setTokenB] = useState<any>("");
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [symbolA, setSymbolA] = useState("");
  const [symbolB, setSymbolB] = useState("");
  const [reserve, setReserve] = useState<any>();
  const [isPairLoading, setPairLoading] = useState(false);
  const [txid, setTxid] = useState("");

  const onAssetChange = (type: "A" | "B" | "") => {
    if (isNewPoolMode) {
      setAssetChangeModalActive(type);
    }
  };

  const onAssetClick = (assetHash, symbol) => {
    if (isAssetChangeModalActive === "A") {
      setTokenA(assetHash);
      setSymbolA(symbol);
    } else {
      setTokenB(assetHash);
      setSymbolB(symbol);
    }
    setAssetChangeModalActive("");
  };

  const onSuccess = () => {
    setAmountA("");
    setAmountB("");
    setTxid("");
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
          setTxid(res);
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
      if (
        tokenB &&
        reserve &&
        reserve.pair[tokenA] !== 0 &&
        reserve.pair[tokenB] !== 0
      ) {
        const estimated = getEstimate(
          val,
          reserve.pair[tokenA],
          reserve.pair[tokenB]
        );
        setAmountB(estimated.toString());
      }
      setAmountA(val);
    } else {
      if (
        tokenA &&
        tokenB &&
        reserve &&
        reserve.pair[tokenA] !== 0 &&
        reserve.pair[tokenB] !== 0
      ) {
        const estimated = getEstimate(
          val,
          reserve.pair[tokenB],
          reserve.pair[tokenA]
        );
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
    setSymbolA(symbolB);
    setSymbolB(symbolA);
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
        if (
          tokenA &&
          tokenB &&
          amountA &&
          !amountB &&
          res[tokenA] !== 0 &&
          res[tokenB] !== 0
        ) {
          const estimated = getEstimate(amountA, res[tokenA], res[tokenB]);
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
        // setError(e.message);
      }
    }
    if (tokenA && tokenB) {
      fetchPair(tokenA, tokenB);
    }
  }, [tokenA, tokenB]);

  const noLiquidity =
    reserve && reserve.pair[tokenA] === 0 && reserve.pair[tokenB] === 0;
  return (
    <>
      <h1 className="title is-5">
        {noLiquidity ? "Create a new pool" : "Add liquidity"}
      </h1>
      <hr />
      {noLiquidity && (
        <div className="notification is-info">
          <strong>You are providing liquidity into the pool</strong>
          <br />
          FTW Swap is not the same as traditional DeFi swap protocols. You
          cannot withdraw your liquidity back.
        </div>
      )}

      <div className="is-relative">
        <Input
          heading="Pair A"
          onClickAsset={() => {
            onAssetChange("A");
          }}
          contractHash={tokenA}
          symbol={symbolA}
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
          isLoading={isPairLoading}
          onClickAsset={() => {
            onAssetChange("B");
          }}
          contractHash={tokenB}
          symbol={symbolB}
          val={amountB}
          setValue={(val, e) => onTokenAAmountChange("B", val)}
          userBalance={reserve && tokenB ? reserve.balances[tokenB] : undefined}
        />
        {connectedWallet ? (
          tokenA && tokenB && amountA && amountB ? (
            <>
              <hr />
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
      </div>

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
    </>
  );
};

export default Liquidity;
