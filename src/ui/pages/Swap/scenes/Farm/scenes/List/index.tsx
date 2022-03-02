import React, { useEffect, useState } from "react";
import { ASSET_LIST } from "../../../../../../../packages/neo/contracts/ftw/swap/consts";
import { Link } from "react-router-dom";
import {
  SWAP_PATH_HISTORY,
  SWAP_PATH_LIQUIDITY,
  SWAP_PATH_TRADE,
} from "../../../../../../../consts";
import Modal from "../../../../../../components/Modal";
import FarmDetail from "../Detail";
import { useWallet } from "../../../../../../../packages/provider";
import { SwapContract } from "../../../../../../../packages/neo/contracts";
import CreatePool from "../CreatePool";
import PoolCard from "../../../../components/PoolCard";

const PairList = (props) => {
  const { network, connectedWallet } = useWallet();
  const [list, setList] = useState<any[]>([]);
  const [detail, setDetail] = useState();
  const [isCreateModalActive, setCreateModalActive] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await new SwapContract(network).getPairs();
        setLoading(false);
        setList(res);
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
      }
    }
    fetch();
  }, []);
  if (isLoading) return <div>Loading..</div>;
  return (
    <div>
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-5">Pools</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <Link
              to={SWAP_PATH_LIQUIDITY}
              // onClick={() => setCreateModalActive(true)}
              className="button is-light"
            >
              Create
            </Link>
          </div>
        </div>
      </div>

      <hr />

      {list.map((item, i) => {
        return <PoolCard key={`pool-${i}`} {...item} />;
      })}

      {isCreateModalActive && (
        <Modal onClose={() => setCreateModalActive(false)}>
          <CreatePool />
        </Modal>
      )}

      {detail && connectedWallet && (
        <Modal onClose={() => setDetail(undefined)}>
          <div>
            <FarmDetail connectedWallet={connectedWallet} {...detail} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PairList;
