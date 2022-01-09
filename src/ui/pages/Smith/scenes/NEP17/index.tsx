import React, { useEffect, useRef, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import ContractCard from "./ContractCard";

const NEP17Smith = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState<any>([]);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();

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
      {isLoading ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="box">
          {status && status.records.items.length > 0 ? (
            status.records.items.map((item, i) => (
              <ContractCard key={"contact17" + i} data={item} />
            ))
          ) : (
            <div></div>
          )}
        </div>
      )}
      {/*{isActionModalActive && (*/}
      {/*  <ActionModal onClose={() => setActionModalActive(false)} />*/}
      {/*)}*/}
    </>
  );
};

export default NEP17Smith;
