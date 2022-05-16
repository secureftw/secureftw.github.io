import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import AssetListModal from "../../components/AssetListModal";
import { toast } from "react-hot-toast";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { SWAP_PATH, SWAP_PATH_LIQUIDITY_ADD } from "../../../../../consts";
import HeaderBetween from "../../../../components/HeaderBetween";
import moment from "moment";
import ErrorNotificationWithRefresh from "../../../../components/ErrorNotificationWithRefresh";
import TimeLockInput from "./TimeLockInput";
import LPRewardInfo from "./LPRewardInfo";
import ConnectWalletButton from "../../../../components/ConnectWalletButton";
import LPInputs from "./LPInputs";

const Liquidity = (props) => {
  const location = useLocation();
  const history = useHistory();
  const params = queryString.parse(location.search);

  const isNewPoolMode = !params.tokenA && !params.tokenB;
  const { network, connectedWallet } = useWallet();
  const [isAssetChangeModalActive, setAssetChangeModalActive] = useState<
    "A" | "B" | ""
  >("");

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

  const [selectedLock, setSelectedLock] = useState(false);
  const [lockUntil, setUntil] = useState(new Date());
  const [data, setData] = useState<any>();
  const [isPairLoading, setPairLoading] = useState(false);
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState<string | undefined>();

  const onAssetChange = (type: "A" | "B" | "") => {
    setAssetChangeModalActive(type);
  };

  const onAssetClick = (assetHash, symbol) => {
    if (isAssetChangeModalActive === "A") {
      setTokenA(assetHash);
      setSymbolA(symbol);
      setAmountA("");
      if (tokenB) {
        let search = `?tokenA=${assetHash}&tokenB=${tokenB}`;
        history.push(search);
      }
    } else {
      setTokenB(assetHash);
      setSymbolB(symbol);
      setAmountB("");
      if (tokenA) {
        let search = `?tokenA=${tokenA}&tokenB=${assetHash}`;
        history.push(search);
      }
    }
    setAssetChangeModalActive("");
  };

  const onSuccess = () => {
    setAmountA("");
    setAmountB("");
    setRefresh(refresh + 1);
    setTxid("");
  };

  const onAddLiquidity = async () => {
    if (connectedWallet) {
      if (tokenA && tokenB && amountA && amountB) {
        try {
          const milliseconds = selectedLock ? moment(lockUntil).valueOf() : 0;
          const res = await new SwapContract(network).provide(
            connectedWallet,
            tokenA,
            amountA,
            tokenB,
            amountB,
            milliseconds
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

  const onRefresh = () => {
    setRefresh(refresh + 1);
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
  }, [connectedWallet, refresh, tokenA, tokenB]);
  const noLiquidity =
    (data && data.pair[tokenA] === 0) || (data && data.pair[tokenB] === 0);
  return (
    <>
      <HeaderBetween
        path={{
          pathname: `${SWAP_PATH}`,
          search: tokenA && tokenB ? `?tokenA=${tokenA}&tokenB=${tokenB}` : "",
        }}
        title={noLiquidity ? "Create a new pool" : "Provide liquidity"}
        isLoading={isPairLoading}
      />
      <hr />
      {noLiquidity && <LPRewardInfo />}
      {error && (
        <ErrorNotificationWithRefresh onRefresh={onRefresh} error={error} />
      )}
      <div className="is-relative">
        <LPInputs
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
              <TimeLockInput
                setLockUntil={setUntil}
                lockUntil={lockUntil}
                toggleSwitch={() => setSelectedLock(!selectedLock)}
                isActive={selectedLock}
              />
              <button
                disabled={
                  data.balances[tokenA] < parseFloat(amountA) ||
                  data.balances[tokenB] < parseFloat(amountB)
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
            <ConnectWalletButton className="is-primary is-fullwidth" />
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
