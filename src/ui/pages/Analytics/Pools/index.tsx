import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import PageLayout from "../../../components/PageLayout";
import { useWallet } from "../../../../packages/provider";
import { MAINNET } from "../../../../packages/neo/consts";
import PairIcons from "../../../components/PairIcons";
import { RestAPI } from "../../../../packages/neo/api";
import { numberTrim } from "../../../../packages/neo/utils";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    cell: (row) => {
      return (
        <div className="is-flex is-center">
          <PairIcons
            network={MAINNET}
            tokenA={row.token_A_id.slice(2)}
            tokenB={row.token_B_id.slice(2)}
          />
          <span className="ml-2">{row.name}</span>
        </div>
      );
    },
  },
  {
    name: "TVL",
    selector: (row) =>
      row.tvlInUSD > 0 ? "$" + numberTrim(row.tvlInUSD) : "-",
  },
  {
    name: "Volume",
    selector: (row) => (row.volume > 0 ? "$" + numberTrim(row.volume) : "-"),
  },
  // {
  //   name: "Fees",
  //   selector: (row) => "$" + (row.fees > 0 ? numberTrim(row.fees) : 0),
  // },
];

const PoolAnalytics = (props) => {
  const { network } = useWallet();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const res = await new RestAPI(network).getPools();
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
    <div>
      <DataTable columns={columns} data={data} progressPending={isLoading} />
    </div>
  );
};

export default PoolAnalytics;
