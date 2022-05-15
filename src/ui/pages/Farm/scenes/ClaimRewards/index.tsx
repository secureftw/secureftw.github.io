import React, { useEffect, useState } from "react";
import { StakingContract } from "../../../../../packages/neo/contracts/ftw/staking";
import { useWallet } from "../../../../../packages/provider";
import { IClaimableRewards } from "../../../../../packages/neo/contracts/ftw/staking/interfaces";
import { FaCoins, FaStar } from "react-icons/all";
import ClaimModal from "./ClaimModal";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { toast } from "react-hot-toast";
import { useApp } from "../../../../../common/hooks/use-app";

const ClaimRewards = () => {
  const { toggleWalletSidebar } = useApp();
  const { network, connectedWallet } = useWallet();
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [items, setItems] = useState<IClaimableRewards[]>([]);
  const [isLoading, setLoading] = useState(!!connectedWallet);
  const [isClaimModalOpen, setClaimModalOpen] = useState(false);

  const handleRefresh = () => {
    setRefresh(refresh + 1);
    setTxid("");
  };

  const onClaim = async (selectedItems) => {
    if (connectedWallet) {
      try {
        const res = await new StakingContract(network).claimMulti(
          connectedWallet,
          selectedItems
        );
        setClaimModalOpen(false);
        setTxid(res);
      } catch (e: any) {
        console.error(e);
        toast.error(e.description ? e.description : e.message);
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  useEffect(() => {
    async function fetch(w) {
      setLoading(true);
      try {
        const res = await new StakingContract(network).getClaimable(w);
        setLoading(false);
        setItems(res);
      } catch (e: any) {
        console.error(e);
        setLoading(false);
      }
    }
    if (connectedWallet) {
      fetch(connectedWallet);
    } else {
      setItems([]);
    }
  }, [connectedWallet, network, refresh]);

  return (
    <div>
      <h3 className="title is-6">
        <span className="icon">
          <FaCoins />
        </span>
        <span>Rewards</span>
      </h3>
      <div className="mb-3">
        {items.map((item, i) => {
          return (
            <div key={`claim-${i}`} className="media">
              <div className="media-content content is-small">
                {item.tokenASymbol}-{item.tokenBSymbol}
                <br /> {item.claimable}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if (connectedWallet) {
            setClaimModalOpen(true);
          } else {
            toggleWalletSidebar();
          }
        }}
        className="button is-fullwidth is-primary mt-4"
      >
        {connectedWallet ? "Claim" : "Connect wallet"}
      </button>
      {isClaimModalOpen && (
        <ClaimModal
          items={items}
          onClose={() => setClaimModalOpen(false)}
          onClaim={onClaim}
        />
      )}

      {txid && (
        <Modal onClose={() => setTxid("")}>
          <AfterTransactionSubmitted
            txid={txid}
            network={network}
            onSuccess={handleRefresh}
            onError={() => setTxid("")}
          />
        </Modal>
      )}
    </div>
  );
};

export default ClaimRewards;
