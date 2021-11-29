import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import toast from "react-hot-toast";
import { useWallet } from "../../../packages/provider";
import { NFTContract } from "../../../packages/neo/contracts";
import DisplayRune from "../Gallery/DisplayRune";
import PropertiesModal from "../Gallery/PropertiesModal";
import { IRuneMeta } from "../../../packages/neo/contracts/ftw/nft/interfaces";
import DisplayRandomRune from "../../components/DisplayRandomRune";
import { GALLERY_PATH } from "../../../consts";
import { Link } from "react-router-dom";

const MyCollection = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<any>([]);
  const [error, setError] = useState("");
  const [propertiesModalActive, setPropertiesModalActive] =
    useState<IRuneMeta>();
  const { connectedWallet, network } = useWallet();
  const onPropertiesModalActive = (obj: IRuneMeta) => {
    if (connectedWallet) {
      setPropertiesModalActive(obj);
    } else {
      toast.error("Please connect wallet.");
    }
  };

  useEffect(() => {
    async function fetchContractStatus() {
      setError("");
      try {
        const res = await new NFTContract(network).getTokens();
        setTokens(res);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
      }
    }
    fetchContractStatus();
  }, [connectedWallet]);
  return (
    <>
      <section className="hero is-white">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">My collection</h1>
          </div>
        </div>
      </section>
      <PageLayout>
        {isLoading ? (
          <div>Loading..</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="columns is-multiline">
            {tokens.length === 0 ? (
              tokens.map((tokenId) => (
                <div className="column is-3">
                  <DisplayRune
                    width="100%"
                    height="100%"
                    tokenId={tokenId}
                    network={network}
                    onClick={onPropertiesModalActive}
                  />
                </div>
              ))
            ) : (
              <div className="column is-3">
                <div className="box">
                  <div className="block">
                    <p>You don't have any runes yet</p>
                  </div>

                  <Link className="button is-primary" to={GALLERY_PATH}>
                    Go Get Them
                  </Link>
                </div>
                {/*<DisplayRandomRune width="100%" height="100%" />*/}
              </div>
            )}
          </div>
        )}
      </PageLayout>
      {/*<button onClick={onMint} className="button is-black">Mint</button>*/}
      {propertiesModalActive && (
        <PropertiesModal
          properties={propertiesModalActive}
          onClose={() => setPropertiesModalActive(undefined)}
        />
      )}
    </>
  );
};

export default MyCollection;
