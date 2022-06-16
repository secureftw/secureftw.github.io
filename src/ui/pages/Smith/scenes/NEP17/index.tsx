import React, { useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import ContractCard from "./ContractCard";
import Pagination from "bulma-pagination-react";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import Banner from "../../Banner";
import PageLayout from "../../../../components/PageLayout";

const NEP17Smith = () => {
  const [page, setPage] = useState(1);
  const { connectedWallet, network } = useWallet();
  const { isLoaded, error, data } = useOnChainData(() => {
    return new SmithContract(network).getNEP17Records(page);
  }, [connectedWallet, network, page]);
  return (
    <>
      <Banner />
      <PageLayout>
        {!isLoaded ? (
          <div>Loading..</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="">
            {data && (
              <>
                <div className="columns is-multiline">
                  {data.items.map((item, i) => (
                    <div key={"contact17" + i} className="column is-3">
                      <div className="box is-hoverable ">
                        <ContractCard data={item} />
                      </div>
                    </div>
                  ))}
                </div>

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
      </PageLayout>
    </>
  );
};

export default NEP17Smith;
