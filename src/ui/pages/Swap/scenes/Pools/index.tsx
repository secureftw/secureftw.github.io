import React, { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import FarmDetail from "../Farm/scenes/Detail";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import CreatePool from "../Farm/scenes/CreatePool";
import PoolCard from "../../components/PoolCard";
import PoolHeader from "./PoolHeader";

const PairList = () => {
  const { network, connectedWallet } = useWallet();
  const [list, setList] = useState<any[]>([]);
  const [detail, setDetail] = useState();
  const [isCreateModalActive, setCreateModalActive] = useState(false);
  const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await new SwapContract(network).getPairs();
        setLoading(false);
        setList(res);
      } catch (e: any) {
        console.error(e);
        setLoading(false);
      }
    }
    fetch();
  }, []);
  return (
    <div>
      <PoolHeader />
      <hr />
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        list.map((item, i) => {
          return <PoolCard key={`pool-${i}`} {...item} />;
        })
      )}
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
