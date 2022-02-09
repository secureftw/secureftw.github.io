import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { NFTContract } from "../../../../packages/neo/contracts";
import { useWallet } from "../../../../packages/provider";

interface INFTListModalModal {
  onClick: (data: any) => void;
  onClose: () => void;
}
const RuneListModal = ({ onClick, onClose }: INFTListModalModal) => {
  const [tokens, setTokens] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();

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
        <div>
          <div className="block">
            <h5 className="title is-5">Select a Rune</h5>
          </div>
          <div>
            {isLoading ? (
              <div>Loading..</div>
            ) : error ? (
              <div>{error}</div>
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
                      onClick={() => onClick(token)}
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
        </div>
      </>
    </Modal>
  );
};

export default RuneListModal;
