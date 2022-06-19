import React, { useEffect, useState } from "react";
import { StakingContract } from "../../../../../packages/neo/contracts/ftw/farm";
import { useWallet } from "../../../../../packages/provider";
import { IClaimableRewards } from "../../../../../packages/neo/contracts/ftw/farm/interfaces";
import { FaCoins } from "react-icons/fa";
import ClaimModal from "./ClaimModal";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { toast } from "react-hot-toast";
import { useApp } from "../../../../../common/hooks/use-app";
import { toDecimal } from "../../../../../packages/neo/utils";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import { SwapContract } from "../../../../../packages/neo/contracts";
import LogoIcon from "../../../../components/LogoIcon";
import { NEP_LOGO } from "../../../../../packages/neo/contracts/ftw/farm/consts";
import {handleError} from "../../../../../packages/neo/utils/errors";

const ClaimRewards = () => {
  const { toggleWalletSidebar } = useApp();
  const { network, connectedWallet } = useWallet();
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);
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
	      toast.error(handleError(e));
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const { isLoaded, error, data } = useOnChainData(() => {
    return new StakingContract(network).getClaimable(connectedWallet);
  }, [connectedWallet, network, refresh]);

  return (
    <div>
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <LogoIcon img={NEP_LOGO} />
          </div>
          <div className="level-item">
            <h1 className="title is-7 ">Rewards</h1>
          </div>
        </div>
      </div>

      <div className="mb-3">
        {isLoaded &&
          data.map((item, i) => {
            return (
              <div key={`claim-${i}`} className="media">
                <div className="media-content content is-small">
                  {item.tokenASymbol}-{item.tokenBSymbol}
                  <br /> {toDecimal(item.claimable)} <strong>NEP</strong>
                </div>
              </div>
            );
          })}
      </div>
      <button
        disabled={isLoaded && data.length === 0}
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
          items={data}
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
