import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../components/PageLayout";
import { useWallet } from "../../../packages/provider";
import { SmithContract } from "../../../packages/neo/contracts/ftw/smith";
import ActionModal from "./ActionModal";
import ContractCard from "./ContractCard";

const Smith = () => {
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState<any>([]);
  const [isActionModalActive, setActionModalActive] = useState(false);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();
  const myRef = useRef(null);

  useEffect(() => {
    async function fetchContractStatus() {
      setError("");
      try {
        const res = await new SmithContract(network).getStatus();
        setStatus(res);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
      }
    }
    fetchContractStatus();
  }, [connectedWallet, network]);

  return (
    <>
      <section className="hero is-white" ref={myRef}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Forthewin Smith</h1>
            <p className="subtitle">
              Mint your NEP-17 tokens without any codes
            </p>
            <button
              onClick={() => setActionModalActive(true)}
              className="button is-primary press-font"
            >
              Mint Tokens
            </button>
          </div>
        </div>
      </section>
      <PageLayout>
        {isLoading ? (
          <div>Loading..</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="box">
            {status && status.records.items.length > 0 ? (
              status.records.items.map((item) => <ContractCard data={item} />)
            ) : (
              <div></div>
            )}
          </div>
        )}
        {isActionModalActive && (
          <ActionModal onClose={() => setActionModalActive(false)} />
        )}
      </PageLayout>
    </>
  );
};

export default Smith;
