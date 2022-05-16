import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWallet } from "../../../../../packages/provider";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import { MAINNET } from "../../../../../packages/neo/consts";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import Tokens from "../NEP11/Tokens";
import NEP11MintFormModal from "./NEP11MintFormModal";
import { toast } from "react-hot-toast";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import Modal from "../../../../components/Modal";

const NEP11InfoPage = () => {
  const params = useParams();
  const { contractHash } = params as any;
  const { connectedWallet, network } = useWallet();
  const [isMintModalActive, setMintModalActive] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [txid, setTxid] = useState<string>();

  const { isLoaded, error, data } = useOnChainData(() => {
    return new SmithContract(network).getNep11ContractInfo(contractHash);
  }, [connectedWallet, network, refresh]);

  const onClickMint = () => {
    if (connectedWallet) {
      if (connectedWallet.account.address === data.owner) {
        setMintModalActive(contractHash);
      } else {
        toast.error("Only contract owner can mint");
      }
    } else {
      toast.error("Please connect your wallet");
    }
  };
  const onMint = async (values) => {
    if (connectedWallet) {
      try {
        const res = await new SmithContract(network).mintNFT(
          connectedWallet,
          contractHash,
          values.name,
          values.description,
          values.image,
          JSON.stringify(values.attributes)
        );
        setMintModalActive("");
        setTxid(res);
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please connect wallet.");
    }
  };

  const onSubmitSuccess = () => {
    setRefresh(refresh + 1);
    setTxid("");
  };

  if (!isLoaded) return <div>Loading contract info..</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="box">
      <div className="media">
        <div className="media-content">
          <div className="content">
            {/*<h3>{data.contractHash}</h3>*/}
            {/*<p>{data.description}</p>*/}
            {/*{data.website ? <p>{data.website}</p> : <div></div>}*/}
            {/*<br />*/}
            <strong>Contract Hash</strong>
            <br />
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
            <br />
            <strong>Contract Owner</strong>
            <br />
            {data.owner}
            <br />
            <Tokens contractHash={contractHash} />
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
                <span className="tag is-dark">Total supply</span>
                <span className="tag is-info">{data.totalSupply}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="media-right">
          <div className="block">
            <button onClick={onClickMint} className="button is-primary">
              Mint
            </button>
          </div>
        </div>
      </div>

      {isMintModalActive && (
        <NEP11MintFormModal
          onMint={onMint}
          contractHash={isMintModalActive}
          onClose={() => setMintModalActive("")}
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
    </div>
  );
};

export default NEP11InfoPage;
