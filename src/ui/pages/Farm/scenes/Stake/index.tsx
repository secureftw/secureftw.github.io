import React, { useState } from "react";
import { FARM_PATH } from "../../../../../consts";
import HeaderBetween from "../../../../components/HeaderBetween";
import { useWallet } from "../../../../../packages/provider";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { StakingContract } from "../../../../../packages/neo/contracts/ftw/staking";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import ConnectWalletButton from "../../../../components/ConnectWalletButton";
import LPTokenList from "./LPTokenList";

const Stake = () => {
  const { network, connectedWallet } = useWallet();
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);

  const location = useLocation();
	let params = new URLSearchParams(location.search);

  // @ts-ignore
	const [symbolA] = useState<any>(
    params.get("tokenASymbol") ? params.get("tokenASymbol") : undefined
  );
  const [symbolB] = useState<any>(
	  params.get("tokenBSymbol") ? params.get("tokenBSymbol") : undefined
  );

  const onStakeLP = async (tokenId) => {
    if (connectedWallet) {
      try {
        const res = await new StakingContract(network).stake(
          connectedWallet,
          tokenId
        );
				console.log(res)
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
      <HeaderBetween path={FARM_PATH} title={`Stake ${symbolA}-${symbolB}`} />
      <hr />
      {connectedWallet ? (
        <LPTokenList
          refresh={refresh}
          connectedWallet={connectedWallet}
          network={network}
          symbolA={symbolA}
          symbolB={symbolB}
          onStakeLP={onStakeLP}
          onRefresh={() => setRefresh(refresh + 1)}
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

export default Stake;
