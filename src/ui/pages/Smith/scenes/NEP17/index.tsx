import React, { useEffect, useRef, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import ContractCard from "./ContractCard";
import Pagination from "bulma-pagination-react";

const NEP17Smith = (props) => {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState<any>([]);
  const [error, setError] = useState("");
  const { connectedWallet, network } = useWallet();

  useEffect(() => {
    async function fetchContractStatus() {
      setError("");
      try {
        const res = await new SmithContract(network).getStatus(page);
        setStatus(res);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
      }
    }
    fetchContractStatus();
  }, [connectedWallet, network, page]);

  return (
    <>
      {isLoading ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="box">
          {status && status.items.length > 0 ? (
            status.items.map((item, i) => (
              <ContractCard key={"contact17" + i} data={item} />
            ))
          ) : (
            <div></div>
          )}
        </div>
      )}
      {status.totalItems > 1 && (
        <Pagination
          pages={status.totalPages}
          currentPage={page}
          onChange={(v) => {
            if (page !== v) {
              setPage(v);
            }
          }}
        />
      )}
      {/*{isActionModalActive && (*/}
      {/*  <ActionModal onClose={() => setActionModalActive(false)} />*/}
      {/*)}*/}
    </>
  );
};

export default NEP17Smith;
