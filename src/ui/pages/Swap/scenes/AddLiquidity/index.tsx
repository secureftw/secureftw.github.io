import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import AssetListModal from "../../components/AssetListModal";
import { toast } from "react-hot-toast";
import { getEstimate } from "../../../../../packages/neo/contracts/ftw/swap/helpers";
// tslint:disable-next-line:no-submodule-imports
import { FaAngleLeft, FaExchangeAlt } from "react-icons/all";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { Link, useLocation } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import queryString from "query-string";
import { SWAP_PATH } from "../../../../../consts";
import HeaderBetween from "../../../../components/HeaderBetween";
import Switch from "react-switch";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useApp } from "../../../../../common/hooks/use-app";
import { SWAP_FEE } from "../../../../../packages/neo/contracts/ftw/swap/consts";
// import "react-datepicker/dist/react-datepicker.css";

const Liquidity = (props) => {
  const { toggleWalletSidebar } = useApp();
  const location = useLocation();
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
  const [reserve, setReserve] = useState<any>();
  const [isPairLoading, setPairLoading] = useState(false);
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);

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
        const res = await new SwapContract(network).getReserve(
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
        console.error(e);
        // setError(e.message);
      }
    }
    if (tokenA && tokenB) {
      fetchPair(tokenA, tokenB);
    }
  }, [connectedWallet, tokenA, tokenB, refresh]);

  const noLiquidity =
    reserve && reserve.pair[tokenA] === 0 && reserve.pair[tokenB] === 0;
  return (
    <>
      <HeaderBetween
        path={SWAP_PATH}
        title={noLiquidity ? "Create a new pool" : "Provide liquidity"}
      />
      <hr />
      {noLiquidity && (
        <div className="notification is-info">
          <strong>Liquidity Provider Rewards</strong>
          <br />
          Liquidity providers earn a {SWAP_FEE}% fee on all trades proportional
          to their share of the pool. Fees are added to the pool, accrue in real
          time and can be claimed by withdrawing your liquidity.
        </div>
      )}

      <div className="is-relative">
        <Input
          isDisable={!tokenA}
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
        <div className="pt-4 pb-4">
          <button onClick={onSwitch} className="button is-white is-fullwidth">
            <FaExchangeAlt />
          </button>
        </div>
        <Input
          isDisable={!tokenA}
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
              <div className="mb-4">
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      <label style={{ display: "flex", alignItems: "center" }}>
                        <span className="mr-3">Lock liquidity</span>
                        <Switch
                          onChange={() => setSelectedLock(!selectedLock)}
                          checked={selectedLock}
                        />
                      </label>
                    </div>
                  </div>
                  {selectedLock && (
                    <div className="level-right">
                      <div className="level-item">
                        <DatePicker
                          selected={lockUntil}
                          onChange={(date) => setUntil(date)}
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                          showTimeInput
                          minDate={lockUntil}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
              onClick={toggleWalletSidebar}
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
