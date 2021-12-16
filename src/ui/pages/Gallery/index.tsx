import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import PropertiesModal from "./PropertiesModal";
import toast from "react-hot-toast";
import { useWallet } from "../../../packages/provider";
import { NFTContract } from "../../../packages/neo/contracts";
import DisplayRune from "./DisplayRune";
import { IRuneMeta } from "../../../packages/neo/contracts/ftw/nft/interfaces";
import Banner from "./Banner";

const Gallery = () => {
  const [tokens, setTokens] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [propertiesModalActive, setPropertiesModalActive] =
    useState<IRuneMeta>();
  const { connectedWallet, network, addPendingTransaction } = useWallet();
  const onPropertiesModalActive = (obj: IRuneMeta) => {
    setPropertiesModalActive(obj);
  };
  const onMint = async () => {
    if (connectedWallet) {
      try {
        const res = await new NFTContract(network).mint(connectedWallet);
        addPendingTransaction(res);
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
        const res = await new NFTContract(network).getTokens();
        setTokens(res);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContractStatus();
  }, [connectedWallet, network]);
  return (
    <section id="Rune">
      <Banner onMint={onMint} />
      {isLoading ? (
        <PageLayout>
          <div>Loading..</div>
        </PageLayout>
      ) : error ? (
        <PageLayout>
          <div>{error}</div>
        </PageLayout>
      ) : (
        <div
          style={{
            flexFlow: "wrap",
          }}
          className="is-flex"
        >
          {tokens.map((tokenId) => (
            <DisplayRune
              key={tokenId}
              width={"10%"}
              height={"10%"}
              tokenId={tokenId}
              network={network}
              onClick={onPropertiesModalActive}
            />
          ))}
        </div>
      )}
      {propertiesModalActive && (
        <PropertiesModal
          properties={propertiesModalActive}
          onClose={() => setPropertiesModalActive(undefined)}
        />
      )}
    </section>
  );
};

export default Gallery;
