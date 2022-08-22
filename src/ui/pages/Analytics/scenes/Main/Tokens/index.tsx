import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../../packages/provider";
import { RestAPI } from "../../../../../../packages/neo/api";
import TokenItem from "./TokenItem";
import ModalCard from "../../../../../components/Modal";
import TokenDetail from "../../TokenDetail";

const TokensAnalytics = (props) => {
  const { network } = useWallet();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalActive, setModalActive] = useState(
    "0x48c40d4666f93408be1bef038b6722404d9a4c2a"
  );

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const res = await new RestAPI(network).getTokens();
        setData(res);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        // setError(e.message);
      }
    }
    fetch();
  }, []);
  return (
    <div className="table-container">
      <table className="table is-fullwidth is-narrow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Liquidity</th>
            <th>Volume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((token) => (
            <TokenItem
              key={token.id}
              id={token.id}
              network={network}
              symbol={token.symbol}
            />
          ))}
        </tbody>
      </table>
      {isModalActive !== "" ? (
        <ModalCard isLarge={true} onClose={() => setModalActive("")}>
          <>
            <TokenDetail tokenId={isModalActive} />
          </>
        </ModalCard>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TokensAnalytics;
