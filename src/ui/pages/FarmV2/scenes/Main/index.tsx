import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FARM_V2_STAKE_POSITIONS_PATH } from "../../../../../consts";
import StakingPairCard from "./StakingPairCard";
import { useWallet } from "../../../../../packages/provider";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import ErrorNotificationWithRefresh from "../../../../components/ErrorNotificationWithRefresh";
import { FarmV2Contract } from "../../../../../packages/neo/contracts/ftw/farm-v2";
import { RestAPI } from "../../../../../packages/neo/api";
import { MAINNET } from "../../../../../packages/neo/consts";

const StakingMain = ({ onRefresh }) => {
  const { network } = useWallet();
  const [refresh, setRefresh] = useState(0);
  const [prices, setPrices] = useState();
  const handleRefresh = () => setRefresh(refresh + 1);
  const { isLoaded, error, data } = useOnChainData(() => {
    return new FarmV2Contract(network).getPools();
  }, [network, refresh]);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await new RestAPI(MAINNET).getPrices();
        setPrices(res);
      } catch (e: any) {
        console.error(e);
      }
    }
    fetch();
  }, []);

  return (
    <div>
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-5 ">Double Farm</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="buttons">
              <Link
                to={FARM_V2_STAKE_POSITIONS_PATH}
                className="button is-light is-small is-rounded"
              >
                My positions
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        {!isLoaded ? (
          <div>Loading..</div>
        ) : error ? (
          <ErrorNotificationWithRefresh
            error={error}
            onRefresh={handleRefresh}
          />
        ) : data && data.length > 0 ? (
          <div className="table-container">
            <table className="table is-fullwidth">
	            <thead>
	            <tr>
		            <th>Pool</th>
		            <th>Reward tokens</th>
		            <th>APR</th>
		            <th></th>
	            </tr>
	            </thead>
              <tbody>
                {data.map((item, i) => (
                  <StakingPairCard key={"sc" + i} {...item} prices={prices} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default StakingMain;
