import React, { useEffect, useState } from "react";
import { FARM_PATH } from "../../../../../consts";
import HeaderBetween from "../../../../components/HeaderBetween";
import { useWallet } from "../../../../../packages/provider";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import * as queryString from "querystring";
import LPTokenCard from "./LPTokenCard";
import { StakingContract } from "../../../../../packages/neo/contracts/ftw/staking";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";

const Stake = () => {
  const { network, connectedWallet } = useWallet();
  const [isLoading, setLoading] = useState<any>(true);
  const [tokens, setTokens] = useState<any>([]);
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);

  const location = useLocation();
  const str =
    location.search[0] === "?"
      ? location.search.substr(1, location.search.length)
      : location.search;
  const params = queryString.parse(str);

  const [symbolA] = useState<any>(
    params.tokenASymbol ? params.tokenASymbol : undefined
  );
  const [symbolB] = useState<any>(
    params.tokenBSymbol ? params.tokenBSymbol : undefined
  );

  const onStakeLP = async (tokenId) => {
    if (connectedWallet) {
      try {
        const res = await new StakingContract(network).stake(
          connectedWallet,
          tokenId
        );

        setTxid(res);
      } catch (e: any) {
        toast.error(e.description ? e.description : e.message);
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const onSuccess = () => {
    setRefresh(refresh + 1);
    setTxid("");
  };
  useEffect(() => {
    async function fetchTokens(w, a, b) {
      const res = await new StakingContract(network).getLPTokens(w, a, b);
      setLoading(false);
      setTokens(res);
    }
    if (connectedWallet) {
      fetchTokens(connectedWallet, symbolA, symbolB);
    }
  }, [connectedWallet, symbolA, symbolB, refresh]);
  return (
    <div>
      <HeaderBetween path={FARM_PATH} title={`Stake ${symbolA}-${symbolB}`} />
      <hr />
      {connectedWallet ? (
        <div>
          {isLoading ? (
            <div>Loading your LP tokens</div>
          ) : (
            <div>
              {tokens.length > 0 ? (
                tokens.map((item, i) => (
                  <LPTokenCard
                    onStakeLP={onStakeLP}
                    {...item}
                    key={`${item.name}-${i}`}
                  />
                ))
              ) : (
                <div>You don't have LP tokens in your wallet</div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>Connect your wallet to see your LP tokens.</div>
      )}
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
    </div>
  );
};

export default Stake;
