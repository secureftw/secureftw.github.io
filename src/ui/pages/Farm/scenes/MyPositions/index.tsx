import React, { useState } from "react";
import HeaderBetween from "../../../../components/HeaderBetween";
import { FARM_PATH } from "../../../../../consts";
import { useWallet } from "../../../../../packages/provider";
import { StakingContract } from "../../../../../packages/neo/contracts/ftw/staking";
import { toast } from "react-hot-toast";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import ConnectWalletButton from "../../../../components/ConnectWalletButton";
import PositionList from "./PositionList";

const MyPositions = () => {
  const { network, connectedWallet } = useWallet();
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

  return (
    <div>
      <HeaderBetween path={FARM_PATH} title={`My staking`} />
      <hr />
      {connectedWallet ? (
        <PositionList
          network={network}
          connectedWallet={connectedWallet}
          refresh={refresh}
          onRefresh={() => setRefresh(refresh + 1)}
          onUnStake={onUnStake}
        />
      ) : (
        <ConnectWalletButton />
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
