import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FARM_STAKE_POSITIONS_PATH } from "../../../../../consts";
import StakingPairCard from "../../components/StakingPairCard";
import { useWallet } from "../../../../../packages/provider";
import { StakingContract } from "../../../../../packages/neo/contracts/ftw/staking";

const StakingMain = () => {
  const { network } = useWallet();
  const [list, setList] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await new StakingContract(network).getStakingPairs();
        setLoading(false);
        setList(res);
      } catch (e: any) {
        console.error(e.message);
        setLoading(false);
      }
    }
    fetch();
  }, []);
  return (
    <div>
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-5">Farm</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="buttons">
              <Link
                to={FARM_STAKE_POSITIONS_PATH}
                // onClick={() => setCreateModalActive(true)}
                className="button is-primary is-small is-rounded"
              >
                My positions
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        {isLoading ? (
          <div>Loading</div>
        ) : list.length > 0 ? (
          <div>
            {list.map((item, i) => (
              <StakingPairCard key={"sc" + i} {...item} />
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default StakingMain;
