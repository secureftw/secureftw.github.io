import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { toast } from "react-hot-toast";
import AssetListModal from "../../components/AssetListModal";
import {
  FaHistory,
  FaListAlt,
  FaMinus,
  FaPlus,
  FaUserAlt,
} from "react-icons/fa";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { Link, useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { LocalStorage } from "../../../../../packages/neo/local-storage";
import { IPairInfo } from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
import NoLPInfo from "./NoLPInfo";
import ErrorNotificationWithRefresh from "../../../../components/ErrorNotificationWithRefresh";
import SwapInputs from "./SwapInputs";
import Pools from "../Pools";
import {
  SWAP_PATH_HISTORY,
  SWAP_PATH_LIQUIDITY_ADD,
  SWAP_PATH_LIQUIDITY_REMOVE,
  SWAP_PATH_LP_LIST,
} from "../../../../../consts";
import ReactTooltip from "react-tooltip";
import { useApp } from "../../../../../common/hooks/use-app";
import Providers from "../Providers";
import History from "../History";

const Swap = () => {
  const location = useLocation();
  const history = useHistory();
  const params = queryString.parse(location.search);
  const { network, connectedWallet } = useWallet();
  const { toggleWalletSidebar } = useApp();
  const [isAssetChangeModalActive, setAssetChangeModalActive] = useState<
    "A" | "B" | ""
  >("");
  const [isPoolListModalActive, setPoolListModalActive] = useState(false);
  const [isSwapHistoryModalActive, setSwapHistoryModalActive] = useState(false);
  const [isLPListModalActive, setLPListModalActive] = useState(false);
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
      setTokenA(assetHash);
      setSymbolA(symbol);
      if (tokenB) {
        let search = `?tokenA=${assetHash}&tokenB=${tokenB}`;
        history.push(search);
      }
    } else {
      LocalStorage.setSwapTokenB(assetHash);
      setTokenB(assetHash);
      setSymbolB(symbol);
      if (tokenA) {
        let search = `?tokenA=${tokenA}&tokenB=${assetHash}`;
        history.push(search);
      }
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
    if (tokenA || tokenB) {
      if (tokenA && tokenB) {
        let search = `?tokenA=${tokenB}&tokenB=${tokenA}`;
        history.push(search);
      }
      setTokenB(tokenA);
      setTokenA(tokenB ? tokenB : "");
      setAmountB(amountA);
      setAmountA(amountB);
      setSymbolA(symbolB);
      setSymbolB(symbolA);
    }
  };

  const onPairClick = (_tokenA, _tokenB) => {
    let search = `?tokenA=${_tokenA}&tokenB=${_tokenB}`;
    history.push(search);
    setTokenA(_tokenA);
    setTokenB(_tokenB);
    setAmountA("");
    setAmountB("");
    setPoolListModalActive(false);
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
      setSymbolA(res.reserve.tokenASymbol);
      setSymbolB(res.reserve.tokenBSymbol);
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

  // const symbolA = data ? data.reserve.tokenASymbol : "";
  // const symbolB = data ? data.reserve.tokenBSymbol : "";
  return (
    <div>
      {/* <HeaderBetween
        path={SWAP_PATH}
        title={"Swap"}
        isLoading={isPairLoading}
      /> */}
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-5 is-marginless">Swap</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="buttons">
              <div className="level-item">
                <Link
                  // to={SWAP_PATH_LIQUIDITY_ADD}
                  to={{
                    pathname: `${SWAP_PATH_LIQUIDITY_ADD}`,
                    search:
                      tokenA && tokenB
                        ? `?tokenA=${tokenA}&tokenB=${tokenB}`
                        : "",
                  }}
                  // onClick={() => setCreateModalActive(true)}
                  data-tip
                  data-for="addLiquidity"
                  className="button is-small is-white"
                >
                  <ReactTooltip
                    id="addLiquidity"
                    type="info"
                    effect="solid"
                    place="bottom"
                  >
                    <span>Add liquidity</span>
                  </ReactTooltip>
                  <FaPlus />
                </Link>
                <Link
                  to={SWAP_PATH_LIQUIDITY_REMOVE}
                  data-tip
                  data-for="removeLiquidity"
                  className="button is-small is-white"
                >
                  <ReactTooltip
                    id="removeLiquidity"
                    type="info"
                    effect="solid"
                    place="bottom"
                  >
                    <span>Remove liquidity</span>
                  </ReactTooltip>
                  <FaMinus />
                </Link>
              </div>
              <button
                onClick={() => setPoolListModalActive(true)}
                data-tip
                data-for="showPools"
                className="button is-small is-white"
              >
                <ReactTooltip
                  id="showPools"
                  type="info"
                  effect="solid"
                  place="bottom"
                >
                  <span>Show pools</span>
                </ReactTooltip>
                <FaListAlt />
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr />

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

      {tokenA && tokenB && data ? (
        <>
          <hr />
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                {/*<div>*/}
                {/*  {`1 ${symbolB} = ${(*/}
                {/*    parseFloat(amountA) / parseFloat(amountB)*/}
                {/*  ).toFixed(8)} ${symbolA}`}*/}
                {/*</div>*/}
                <div>
                  {`1 ${symbolB} = ${(
                    data.pair[tokenA] / data.pair[tokenB]
                  ).toFixed(8)} ${symbolA}`}
                </div>
              </div>
            </div>

            <div className="level-right">
              <div className="level-item">
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      <div className="buttons">
                        <button
                          onClick={() => setSwapHistoryModalActive(true)}
                          className="button is-white is-small"
                          data-tip
                          data-for="swapHistory"
                          // to={{
                          //   pathname: `${SWAP_PATH_HISTORY}`,
                          //   search: `?tokenA=${tokenA}&tokenB=${tokenB}`,
                          // }}
                        >
	                        <ReactTooltip
		                        id="swapHistory"
		                        type="info"
		                        effect="solid"
		                        place="bottom"
	                        >
		                        <span>Swap history</span>
	                        </ReactTooltip>
                          <FaHistory />
                        </button>

                        <button
                          onClick={() => setLPListModalActive(true)}
                          className="button is-white is-small"
                          data-tip
                          data-for="LPList"
                          // to={{
                          //   pathname: `${SWAP_PATH_LP_LIST}`,
                          //   search: `?tokenA=${tokenA}&tokenB=${tokenB}`,
                          // }}
                        >
	                        <ReactTooltip
		                        id="LPList"
		                        type="info"
		                        effect="solid"
		                        place="bottom"
	                        >
		                        <span>LP list</span>
	                        </ReactTooltip>
                          <FaUserAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <hr />
      <button
        disabled={
          !amountA ||
          !amountB ||
          (data && data.balances[tokenA] < parseFloat(amountA)) ||
          (data && data.pair[tokenB] < parseFloat(amountB)) ||
          priceImpact > 10
        }
        onClick={connectedWallet ? onSwap : toggleWalletSidebar}
        className={`button is-fullwidth is-primary ${
          priceImpact > 10 ? "is-danger" : ""
        }`}
      >
        {connectedWallet
          ? priceImpact > 10
            ? "Price impact is too high"
            : "Swap"
          : "Connect wallet"}
      </button>

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

      {isPoolListModalActive && (
        <Modal onClose={() => setPoolListModalActive(false)}>
          <Pools onPairClick={onPairClick} />
        </Modal>
      )}

      {isLPListModalActive && (
        <Modal onClose={() => setLPListModalActive(false)}>
          <Providers
            tokenA={tokenA}
            tokenB={tokenB}
            // symbolA={symbolA}
            // symbolB={symbolB}
          />
        </Modal>
      )}

      {isSwapHistoryModalActive && (
        <Modal onClose={() => setSwapHistoryModalActive(false)}>
          <History tokenA={tokenA} tokenB={tokenB} />
        </Modal>
      )}
    </div>
  );
};

export default Swap;
