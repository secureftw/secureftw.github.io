import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { toast } from "react-hot-toast";
import Input from "../../components/Input";
import AssetListModal from "../../components/AssetListModal";
import { FaExchangeAlt } from "react-icons/all";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { useHistory, useLocation } from "react-router-dom";
import { SWAP_PATH } from "../../../../../consts";
// tslint:disable-next-line:no-implicit-dependencies
import queryString from "query-string";
import { LocalStorage } from "../../../../../packages/neo/local-storage";
import { IPairInfo } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
import { useApp } from "../../../../../common/hooks/use-app";
import NoLPInfo from "./NoLPInfo";
import ErrorNotificationWithRefresh from "../../../../components/ErrorNotificationWithRefresh";
import HeaderBetween from "../../../../components/HeaderBetween";
import ConnectWalletButton from "../../../../components/ConnectWalletButton";
import SwapInputs from "./SwapInputs";

const Swap = () => {
  const location = useLocation();
  const history = useHistory();
  const params = queryString.parse(location.search);
  const { network, connectedWallet } = useWallet();
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
  const [amountA, setAmountA] = useState<string>("");
  const [amountB, setAmountB] = useState<string>("");
  const [data, setData] = useState<IPairInfo | undefined>();
  const [isPairLoading, setPairLoading] = useState(false);
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState(undefined);

  const onAssetChange = (type: "A" | "B" | "") => {
    // Temporary disable
    setAssetChangeModalActive(type);
  };

  const onAssetClick = (assetHash, symbol) => {
    if (isAssetChangeModalActive === "A") {
      LocalStorage.setSwapTokenA(assetHash);
      history.push(location.search.replace(tokenA, assetHash));
      setTokenA(assetHash);
    } else {
      LocalStorage.setSwapTokenB(assetHash);
      history.push(location.search.replace(tokenB, assetHash));
      setTokenB(assetHash);
    }
    setAmountA("");
    setAmountB("");
    setAssetChangeModalActive("");
  };

  const onRefresh = () => {
    setRefresh(refresh + 1);
  };

  const onSuccess = () => {
    setAmountA("");
    setAmountB("");
    setRefresh(refresh + 1);
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
  };

  const getReserve = async () => {
    try {
      setError(undefined);
      setPairLoading(true);
      const res = await new SwapContract(network).getReserve(
        tokenA,
        tokenB,
        connectedWallet
      );
      setData(res);
      setPairLoading(false);
    } catch (e: any) {
      setError(e.message);
      setPairLoading(false);
    }
  };

  useEffect(() => {
    async function load() {
      await getReserve();
    }
    if (tokenA && tokenB) {
      load();
    }
  }, [location, refresh, tokenA, tokenB]);
  const noLiquidity =
    (data && data.pair[tokenA] === 0) || (data && data.pair[tokenB] === 0);

  const priceImpact =
    data && amountB ? (parseFloat(amountB) / data.pair[tokenB]) * 100 : 0;

  const symbolA = data ? data.reserve.tokenASymbol : "";
  const symbolB = data ? data.reserve.tokenBSymbol : "";
  return (
    <div>
      <HeaderBetween
        path={SWAP_PATH}
        title={"Swap"}
        isLoading={isPairLoading}
      />
      <hr />
      <>
        {noLiquidity && (
          <NoLPInfo
            tokenA={tokenA}
            tokenB={tokenB}
            // symbolA={symbolA}
            // symbolB={symbolB}
          />
        )}

        {error && (
          <ErrorNotificationWithRefresh onRefresh={onRefresh} error={error} />
        )}

        <SwapInputs
          noLiquidity={noLiquidity}
          network={network}
          tokenA={tokenA}
          tokenB={tokenB}
          symbolA={symbolA}
          symbolB={symbolB}
          amountA={amountA}
          amountB={amountB}
          onAssetChange={onAssetChange}
          userTokenABalance={
            connectedWallet && data ? data.balances[tokenA] : undefined
          }
          userTokenBBalance={
            connectedWallet && data ? data.balances[tokenB] : undefined
          }
          onSwitch={onSwitch}
          setAmountA={setAmountA}
          setAmountB={setAmountB}
          reserve={data}
        />

        {connectedWallet ? (
          tokenA && tokenB && amountA && amountB ? (
            <>
              <hr />
              <div>
                {`1 ${symbolB} = ${(
                  parseFloat(amountA) / parseFloat(amountB)
                ).toFixed(8)} ${symbolA}`}
              </div>
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
            <ConnectWalletButton />
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
