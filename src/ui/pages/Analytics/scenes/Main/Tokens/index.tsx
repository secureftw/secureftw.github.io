import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import PageLayout from "../../../../../components/PageLayout";
import { useWallet } from "../../../../../../packages/provider";
import { MAINNET, UNKNOWN_TOKEN_IMAGE } from "../../../../../../packages/neo/consts";
import { RestAPI } from "../../../../../../packages/neo/api";
import { numberTrim } from "../../../../../../packages/neo/utils";
import LogoIcon from "../../../../../components/LogoIcon";
import { ASSET_LIST } from "../../../../../../packages/neo/contracts/ftw/swap/consts";
import TokenItem from "./TokenItem";

// const columns = [
//   {
//     name: "Name",
//     selector: (row) => row.name,
//     cell: (row) => {
//       const hash = row.id.substring(2);
//       const logo = ASSET_LIST[MAINNET][hash]
//         ? ASSET_LIST[MAINNET][hash].logo
//         : UNKNOWN_TOKEN_IMAGE;
//       return (
//         <div className="is-flex is-center">
//           <LogoIcon img={logo} />
//           <span className="ml-2">{row.name}</span>
//         </div>
//       );
//     },
//   },
//   {
//     name: "Price",
//     selector: (row) => (row.price > 0 ? "$" + numberTrim(row.price, 5) : "-"),
//   },
//   {
//     name: "Liquidity",
//     selector: (row) =>
//       row.liquidity > 0 ? numberTrim(row.liquidity, 2) + " " + row.symbol : "-",
//   },
//   {
//     name: "Volume",
//     selector: (row) =>
//       row.volume > 0 ? numberTrim(row.volume, 2) + " " + row.symbol : "-",
//   },
//   // {
//   //   name: "Fees",
//   //   selector: (row) => "$" + (row.fees > 0 ? numberTrim(row.fees) : 0),
//   // },
// ];

const TokensAnalytics = (props) => {
  const { network } = useWallet();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function fetch() {
  //     try {
  //       setLoading(true);
  //       const res = await new RestAPI(network).getTokens();
  //       setData(res);
  //       setLoading(false);
  //     } catch (e: any) {
  //       setLoading(false);
  //       // setError(e.message);
  //     }
  //   }
  //   fetch();
  // }, []);
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
      <table className="table is-fullwidth">
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
        {data.map(token => <TokenItem key={token.id} id={token.id} network={network} symbol={token.symbol} />)}
        </tbody>
      </table>
      {/*<DataTable columns={columns} data={data} progressPending={isLoading} />*/}
    </div>
  );
};

export default TokensAnalytics;
