import React, { useEffect, useState } from "react";
import { RestAPI } from "../../../../../../packages/neo/api";
import { INetworkType } from "../../../../../../packages/neo/network";
import { numberTrim } from "../../../../../../packages/neo/utils";
import SymbolWithLogo from "./SymbolWithLogo";
import { FaChartLine } from "react-icons/fa";
import { ANALYTICS_TOKENS_PATH } from "../../../../../../consts";
import { Link } from "react-router-dom";

interface ITokenItem {
  id: string;
  network: INetworkType;
  symbol: string;
}
const TokenItem = ({ id, symbol, network }: ITokenItem) => {
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const res = await new RestAPI(network).getToken(id);
        setData(res);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        // setError(e.message);
      }
    }
    fetch();
  }, []);
  if (isLoading) return <></>;
  if (data && data.tradeVolumeUSD === 0) return <></>;
  return (
    <tr>
      <td>
        <SymbolWithLogo id={id} symbol={symbol} />
      </td>
      <td>{data ? "$" + numberTrim(data.price, 4) : ""}</td>
      <td>{data ? "$" + numberTrim(data.totalLiquidityUSD) : ""}</td>
      <td>{data ? "$" + numberTrim(data.tradeVolumeUSD) : ""}</td>
      <td style={{ textAlign: "right" }}>
        <Link
          to={`${ANALYTICS_TOKENS_PATH}/${id}`}
          className="button is-small is-white"
        >
          <FaChartLine />
        </Link>
      </td>
    </tr>
  );
};

export default TokenItem;
