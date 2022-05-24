import React, { useState } from "react";
import {Link, useParams} from "react-router-dom";
import { useWallet } from "../../../../../packages/provider";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import { MAINNET } from "../../../../../packages/neo/consts";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import { toast } from "react-hot-toast";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import NEP17UpdateFormModal from "./NEP17UpdateFormModal";
import PageLayout from "../../../../components/PageLayout";
import {SMITH_PATH, SMITH_PATH_NEP11} from "../../../../../consts";

const NEP17InfoPage = () => {
  const params = useParams();
  const { contractHash } = params as any;
  const { connectedWallet, network } = useWallet();
  const [isUpdateModalActive, setUpdateModalActive] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [txid, setTxid] = useState<string>();

  const { isLoaded, error, data } = useOnChainData(() => {
    return new SmithContract(network).getNep17ContractInfo(contractHash);
  }, [connectedWallet, network, refresh]);

  const onSubmitSuccess = () => {
    setRefresh(refresh + 1);
    setTxid("");
  };

  const onClickUpdate = () => {
    if (connectedWallet) {
      if (connectedWallet.account.address === data.owner) {
        setUpdateModalActive(true);
      } else {
        toast.error("Only contract owner can update");
      }
    } else {
      toast.error("Please connect your wallet");
    }
  };
  const onUpdate = async (values) => {
    if (connectedWallet) {
      try {
        const res = await new SmithContract(network).updateNEP17(
          connectedWallet,
          contractHash,
          values.logo,
          values.website
        );
        setUpdateModalActive(false);
        setTxid(res);
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please connect wallet.");
    }
  };
  return (
    <>
      <PageLayout>
	      <Link to={SMITH_PATH} className="button mb-3 is-rounded">
		      Back to Main
	      </Link>
        <div className="box">
          {!isLoaded ? (
            <div>Loading..</div>
          ) : error ? (
            <div className="content">
              <h3>Failed to load contract</h3>
              <p>Contract may have been updated.</p>
              <p>{error}</p>
            </div>
          ) : (
            <div className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img src={data.logo ? data.logo : "/symbols/unknown.png"} />
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <h3>{data.name}</h3>
                  <p>{data.description}</p>
                  <br />

                  <h6>Contract Hash</h6>
                  <p>
                    0x{contractHash}{" "}
                    <a
                      target="_blank"
                      href={`https://${
                        network === MAINNET
                          ? "explorer.onegate.space"
                          : "testnet.explorer.onegate.space"
                      }/contractinfo/0x${contractHash}`}
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </p>
                  <h6>Contract Owner</h6>
                  <p>{data.owner}</p>

                  <h6>Author</h6>
	                <p>{data.author ? data.author : "Unknown"}</p>

	                <h6>Email</h6>
	                <p>{data.email ? data.email : "Unknown"}</p>

	                <h6>Website</h6>
	                <p>{data.website ? data.website : "Unknown"}</p>

                </div>

                <div className="field is-grouped is-grouped-multiline">
                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">Symbol</span>
                      <span className="tag is-info">{data.symbol}</span>
                    </div>
                  </div>

                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">Decimals</span>
                      <span className="tag is-info">{data.decimals}</span>
                    </div>
                  </div>

                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">Total supply</span>
                      <span className="tag is-info">
                        {parseFloat(data.totalSupply).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
              <div className="media-right">
                <button onClick={onClickUpdate} className="button is-primary">
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </PageLayout>
      {isUpdateModalActive && (
        <NEP17UpdateFormModal
          onUpdate={onUpdate}
          onClose={() => setUpdateModalActive(false)}
        />
      )}

      {txid && (
        <Modal onClose={() => setTxid("")}>
          <AfterTransactionSubmitted
            network={network}
            txid={txid}
            onSuccess={onSubmitSuccess}
            onError={() => setTxid("")}
          />
        </Modal>
      )}
    </>
  );
};

export default NEP17InfoPage;
