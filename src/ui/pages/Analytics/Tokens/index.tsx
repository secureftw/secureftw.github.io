import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import PageLayout from "../../../components/PageLayout";
import { useWallet } from "../../../../packages/provider";
import {MAINNET, UNKNOWN_TOKEN_IMAGE} from "../../../../packages/neo/consts";
import { RestAPI } from "../../../../packages/neo/api";
import { numberTrim } from "../../../../packages/neo/utils";
import LogoIcon from "../../../components/LogoIcon";
import { ASSET_LIST } from "../../../../packages/neo/contracts/ftw/swap/consts";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    cell: (row) => {
			const hash = row.id.substring(2);
			const logo = ASSET_LIST[MAINNET][hash] ? ASSET_LIST[MAINNET][hash].logo : UNKNOWN_TOKEN_IMAGE;
      return (
        <div className="is-flex is-center">
	        <LogoIcon
		        img={logo}
	        />
          <span className="ml-2">{row.name}</span>
        </div>
      );
    },
  },
  {
    name: "Price",
    selector: (row) => (row.price > 0 ? "$" + numberTrim(row.price, 5) : "-"),
  },
  {
    name: "Liquidity",
    selector: (row) =>
      row.liquidity > 0 ? numberTrim(row.liquidity, 2) + " " + row.symbol : "-",
  },
  {
    name: "Volume",
    selector: (row) =>
      row.volume > 0 ? numberTrim(row.volume, 2) + " " + row.symbol : "-",
  },
  // {
  //   name: "Fees",
  //   selector: (row) => "$" + (row.fees > 0 ? numberTrim(row.fees) : 0),
  // },
];

const TokensAnalytics = (props) => {
  const { network } = useWallet();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
    <div>
      <section className="hero is-white is-small">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Token Analytics</h1>
            {/*<p className="subtitle is-6">*/}
            {/*  Click on the column name to sort pairs by its TVL, volume, fees or*/}
            {/*  APY.*/}
            {/*</p>*/}
          </div>
        </div>
      </section>
      <PageLayout>
        <div className="box is-shadowless">
          <DataTable
            columns={columns}
            data={data}
            progressPending={isLoading}
          />
        </div>
      </PageLayout>
    </div>
  );
};

export default TokensAnalytics;
