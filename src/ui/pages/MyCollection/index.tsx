import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import { useWallet } from "../../../packages/provider";
import { NFTContract } from "../../../packages/neo/contracts";
import PropertiesModal from "../Gallery/PropertiesModal";
import { IRuneMeta } from "../../../packages/neo/contracts/ftw/nft/interfaces";
import { GALLERY_PATH } from "../../../consts";
import { Link } from "react-router-dom";

const MyCollection = () => {
  const [tokens, setTokens] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [propertiesModalActive, setPropertiesModalActive] =
    useState<IRuneMeta>();
  const { connectedWallet, network } = useWallet();
  const onPropertiesModalActive = (obj: IRuneMeta) => {
    setPropertiesModalActive(obj);
  };

  useEffect(() => {
    async function fetchContractStatus(address: string) {
      setError("");
      try {
        const res = await new NFTContract(network).getTokensOf(address);
        setTokens(res);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
      }
    }
    if (connectedWallet) {
      fetchContractStatus(connectedWallet.account.address);
    }
  }, [connectedWallet, network]);
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
            {tokens.length > 0 ? (
              tokens.map((token) => (
                <div className="column is-3">
                  <figure
                    className="image"
                    onClick={() => onPropertiesModalActive(token)}
                  >
                    <img src={token.image} />
                  </figure>
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
