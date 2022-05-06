import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { toast } from "react-hot-toast";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import LPTokenList from "./LPTokenList";
import HeaderBetween from "../../../../components/HeaderBetween";
import { SWAP_PATH } from "../../../../../consts";

const RemoveLiquidity = () => {
  const { network, connectedWallet } = useWallet();
  const [isLoading, setLoading] = useState<any>(true);
  const [tokens, setTokens] = useState<any>([]);
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);

  const onRemoveLiquidity = async (tokenId) => {
    if (connectedWallet) {
      try {
        const res = await new SwapContract(network).remove(
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
      const res = await new SwapContract(network).getLPTokens(w);
      setLoading(false);
      setTokens(res);
    }
    if (connectedWallet) {
      fetchTokens(connectedWallet);
    }
  }, [connectedWallet, refresh]);

  return (
    <>
      <HeaderBetween path={SWAP_PATH} title={"Remove liquidity"} />
      <hr />
      {connectedWallet ? (
        <div>
          {isLoading ? (
            <div>Loading your LP tokens</div>
          ) : (
            <div>
              {tokens.length > 0 ? (
                tokens.map((item, i) => (
                  <LPTokenList
                    {...item}
                    onRemove={onRemoveLiquidity}
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
        <div>Please connect your wallet to see your LP tokens.</div>
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
    </>
  );
};

export default RemoveLiquidity;
