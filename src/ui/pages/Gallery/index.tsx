import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import PropertiesModal from "./PropertiesModal";
import toast from "react-hot-toast";
import { useWallet } from "../../../packages/provider";
import { FarmContract, NFTContract } from "../../../packages/neo/contracts";
import DisplayRune from "./DisplayRune";
import { IRuneMeta } from "../../../packages/neo/contracts/ftw/nft/interfaces";
import DisplayRandomRune from "../../components/DisplayRandomRune";

const Gallery = (props) => {
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
  const onMint = async () => {
    if (connectedWallet) {
      try {
        const txid = await new NFTContract(network).mint(connectedWallet);
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
            <h1 className="title">Forthewin Runes</h1>
            <p className="subtitle">
              FTW Rune is unique. Purely generated in the smart contract with
              random pixels and attributes.
            </p>
            <button onClick={onMint} className="button is-primary">
              Mint: 10 GAS
            </button>
          </div>
        </div>
      </section>
      <PageLayout>
        <div
          style={{
            flexFlow: "wrap",
            // width: "640px",
            // margin: "0 auto"
          }}
          className="is-flex"
        >
          <DisplayRandomRune width="20%" height="20%" />
          {tokens.map((tokenId) => (
            <DisplayRune
              width={"20%"}
              height={"20%"}
              tokenId={tokenId}
              network={network}
              onClick={onPropertiesModalActive}
            />
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

export default Gallery;
