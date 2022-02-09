import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../packages/provider";
import { FusionContract } from "../../../../packages/neo/contracts/ftw/fuse";
import { toast } from "react-hot-toast";
import ModalCard from "../../../components/Modal";
import AfterTransactionSubmitted from "../../../../packages/ui/AfterTransactionSubmitted";

const FusedList = () => {
  const [tokens, setTokens] = useState<any>([]);
  const [detail, setDetail] = useState<any>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();
  const [txid, setTxid] = useState("");

  const onRefund = async () => {
    if (connectedWallet) {
      try {
        const res = await new FusionContract(network).refund(
          connectedWallet,
          detail.tokenId
        );
        console.log(res);
        // setTxid(res);
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
        const res = await new FusionContract(network).getTokensOf(
          connectedWallet ? connectedWallet.account.address : undefined
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
    <>
      <div>
        <div>
          {isLoading ? (
            <div></div>
          ) : error ? (
            <div>{error}</div>
          ) : tokens.length > 0 ? (
            <>
              <div className="block">
                <h5 className="title is-5">Fused Cryptonaut</h5>
              </div>
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
                      onClick={() => setDetail(token)}
                    >
                      <img src={token.image} />
                    </figure>
                  );
                })}
              </div>
              {detail ? (
                <ModalCard onClose={() => setDetail(undefined)}>
                  <>
                    {txid ? (
                      <AfterTransactionSubmitted
                        network={network}
                        txid={txid}
                        onSuccess={() => {
                          setDetail(undefined);
                          setTxid("");
                        }}
                        onError={() => setTxid("")}
                      />
                    ) : (
                      <div className="card">
                        <div className="card-image">
                          <figure className="image is-4by3">
                            <img src={detail.image} />
                          </figure>
                        </div>
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <h1 className="title is-5">Fused Cryptonaut</h1>
                              <p className="subtitle is-7">
                                TokenId: {detail.tokenId}
                              </p>
                              <div className="field is-grouped is-grouped-multiline">
                                <div className="control">
                                  <div className="tags has-addons">
                                    <span className="tag is-dark">Element</span>
                                    <span className="tag is-info">
                                      {detail.element}
                                    </span>
                                  </div>
                                </div>
                                <div className="control">
                                  <div className="tags has-addons">
                                    <span className="tag is-dark">Phase</span>
                                    <span className="tag is-info">
                                      {detail.phase}
                                    </span>
                                  </div>
                                </div>
                                <div className="control">
                                  <div className="tags has-addons">
                                    <span className="tag is-dark">Luck</span>
                                    <span className="tag is-info">
                                      {detail.luck}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="media-right">
                              <button
                                onClick={onRefund}
                                className="button is-danger"
                              >
                                Un-Fuse
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                </ModalCard>
              ) : (
                <div></div>
              )}
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default FusedList;
