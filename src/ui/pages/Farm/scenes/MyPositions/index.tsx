import React, { useEffect, useState } from "react";
import HeaderBetween from "../../../../components/HeaderBetween";
import { FARM_PATH } from "../../../../../consts";
import { useWallet } from "../../../../../packages/provider";
import { useLocation } from "react-router-dom";
import queryString from "querystring";
import { StakingContract } from "../../../../../packages/neo/contracts/ftw/staking";
import { toast } from "react-hot-toast";
import StakingPairCard from "../../components/StakingPairCard";
import PositionCard from "./PositionCard";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";

const MyPositions = () => {
  const { network, connectedWallet } = useWallet();
  const [isLoading, setLoading] = useState<any>(!!connectedWallet);
  const [tokens, setTokens] = useState<any>([]);
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);

  const onUnStake = async (tokenId) => {
    if (connectedWallet) {
      try {
        const res = await new StakingContract(network).remove(
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
    async function fetchTokens(w) {
      const res = await new StakingContract(network).getStakedLPTokens(w);
      setLoading(false);
      setTokens(res);
    }
    if (connectedWallet) {
      fetchTokens(connectedWallet);
    }
  }, [connectedWallet, refresh]);
  return (
    <div>
      <HeaderBetween path={FARM_PATH} title={`My staking`} />
      <hr />
      {connectedWallet ? (
        isLoading ? (
          <div>Loading</div>
        ) : tokens.length > 0 ? (
          <div>
            {tokens.map((item, i) => (
              <PositionCard
                key={"position" + i}
                {...item}
                onUnStake={onUnStake}
              />
            ))}
          </div>
        ) : (
          <div>No staking found</div>
        )
      ) : (
        <div>Connect your wallet to see your staking.</div>
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

export default MyPositions;
