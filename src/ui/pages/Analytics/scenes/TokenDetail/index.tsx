import React, { useEffect, useState } from "react";
import PageLayout from "../../../../components/PageLayout";
import { useWallet } from "../../../../../packages/provider";
import { RestAPI } from "../../../../../packages/neo/api";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import {
  MAINNET,
  UNKNOWN_TOKEN_IMAGE,
} from "../../../../../packages/neo/consts";
import TokenPriceChart from "./PriceChart";

interface ITokenDetailProps {
  tokenId: string;
}
const TokenDetail = ({ tokenId }: ITokenDetailProps) => {
  const { network } = useWallet();
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch() {
      setError("");
      setLoading(true);
      try {
        const res = await new RestAPI(network).getToken(tokenId);
        setData(res);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    }
    fetch();
  }, [network]);
  console.log(data);
  if (!data) return <div></div>;
  const hash = tokenId.substring(2);
  const logo = ASSET_LIST[MAINNET][hash]
    ? ASSET_LIST[MAINNET][hash].logo
    : UNKNOWN_TOKEN_IMAGE;
  return (
    <div>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <img width={"64px"} src={logo} alt={`${data.name} logo`} />
          </div>
          <div className="level-item">
            <h1 className="title is-5 is-marginless">{data.name}</h1>
          </div>
        </div>
      </div>

      <div className="columns is-multiline">
        <div className="column is-6">
          <TokenPriceChart tokenId={tokenId} />
        </div>
	      <div className="column is-6">

	      </div>
	      <div className="column is-6">

	      </div>
	      <div className="column is-6">

	      </div>

      </div>
    </div>
  );
};

export default TokenDetail;
