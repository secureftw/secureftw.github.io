import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import ActionModal from "./ActionModal";
import toast from "react-hot-toast";
import { useWallet } from "../../../packages/provider";
import { NFTContract } from "../../../packages/neo/contracts";
import DisplayRune from "../Gallery/DisplayRune";
import DisplayRandomRune from "../../components/DisplayRandomRune";
import PropertiesModal from "../Gallery/PropertiesModal";
import { IRuneMeta } from "../../../packages/neo/contracts/ftw/nft/interfaces";

const MyCollection = (props) => {
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
        <div className="columns is-multiline">
          {tokens.map((tokenId) => (
            <div className="column is-3">
              <DisplayRune
                width="100%"
                height="100%"
                tokenId={tokenId}
                network={network}
                onClick={onPropertiesModalActive}
              />
            </div>
          ))}
        </div>
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
