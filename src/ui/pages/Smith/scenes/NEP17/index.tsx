import React, { useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import ContractCard from "./ContractCard";
import Pagination from "bulma-pagination-react";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";

const NEP17Smith = () => {
  const [page, setPage] = useState(1);
  const { connectedWallet, network } = useWallet();
  const { isLoaded, error, data } = useOnChainData(() => {
    return new SmithContract(network).getNEP17Records(page);
  }, [connectedWallet, network, page]);
  return (
    <>
      {!isLoaded ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="box">
          {data && (
            <>
              {data.items.length > 0 ? (
                data.items.map((item, i) => (
                  <ContractCard key={"contact17" + i} data={item} />
                ))
              ) : (
                <div>No contracts to display</div>
              )}

              {data.totalPages > 1 && (
                <>
                  <hr />
                  <Pagination
                    pages={data.totalPages}
                    currentPage={page}
                    onChange={(v) => {
                      if (page !== v) {
                        setPage(v);
                      }
                    }}
                  />
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NEP17Smith;
