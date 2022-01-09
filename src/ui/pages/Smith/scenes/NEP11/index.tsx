import React, { useEffect, useRef, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import ContractCard from "./ContractCard";
import { ISmithNEP11RecordPaginate } from "../../../../../packages/neo/contracts/ftw/smith/interfaces";

const NEP11Smith = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<ISmithNEP11RecordPaginate>();
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();

  useEffect(() => {
    async function fetchContractStatus() {
      setError("");
      try {
        const res = await new SmithContract(network).getNEP11Records();
        setData(res);
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
          {data && data.items.length > 0 ? (
            data.items.map((item, i) => (
              <ContractCard key={"contract" + i} data={item} />
            ))
          ) : (
            <div>No contracts to display</div>
          )}
        </div>
      )}
    </>
  );
};

export default NEP11Smith;
