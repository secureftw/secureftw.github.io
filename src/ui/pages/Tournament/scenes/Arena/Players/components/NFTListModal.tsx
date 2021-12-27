import React, { useEffect, useState } from "react";
import Modal from "../../../../../../components/Modal";
import { NFTContract } from "../../../../../../../packages/neo/contracts";
import { useWallet } from "../../../../../../../packages/provider";
import PageLayout from "../../../../../../components/PageLayout";
import { TournamentContract } from "../../../../../../../packages/neo/contracts/ftw/tournament";
import toast from "react-hot-toast";

interface INFTListModalModal {
  onClose: () => void;
}
const NFTListModal = ({ onClose }: INFTListModalModal) => {
  const [tokens, setTokens] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onJoin = async (tokenId: string) => {
    if (connectedWallet) {
      try {
        const res = await new TournamentContract(network).join(
          connectedWallet,
          tokenId
        );
        addPendingTransaction(res);
        // onClose();
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please connect wallet.");
    }
  };
  useEffect(() => {
    async function fetchContractStatus() {
      setError("");
      setLoading(true);
      try {
        const res = await new NFTContract(network).getTokensOf(
          connectedWallet?.account.address
        );
        setTokens(res);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (connectedWallet) {
      fetchContractStatus();
    }
  }, [connectedWallet, network]);
  return (
    <Modal onClose={onClose}>
      <>
        <h5 className="title is-5">Select NFT to sell</h5>
        <div className="box">
          {isLoading ? (
            <PageLayout>
              <div>Loading..</div>
            </PageLayout>
          ) : error ? (
            <PageLayout>
              <div>{error}</div>
            </PageLayout>
          ) : tokens.length > 0 ? (
            <div
              style={{
                flexFlow: "wrap",
              }}
              className="is-flex"
            >
              {tokens.map((token) => {
                return (
                  <figure
                    key={token.tokenId}
                    // style={{ width, height }}
                    className="image is-64x64"
                    onClick={() => onJoin(token.tokenId)}
                  >
                    <img src={token.image} />
                  </figure>
                );
              })}
            </div>
          ) : (
            <div>You don't have runes</div>
          )}
        </div>
      </>
    </Modal>
  );
};

export default NFTListModal;
