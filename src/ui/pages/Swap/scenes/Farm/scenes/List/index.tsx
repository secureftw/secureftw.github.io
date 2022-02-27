import React, { useEffect, useState } from "react";
import { ASSET_LIST } from "../../../../../../../packages/neo/contracts/ftw/swap/consts";
import { Link } from "react-router-dom";
import {
  SWAP_PATH_HISTORY,
  SWAP_PATH_LIQUIDITY,
} from "../../../../../../../consts";
import Modal from "../../../../../../components/Modal";
import FarmDetail from "../Detail";
import { useWallet } from "../../../../../../../packages/provider";
import { SwapContract } from "../../../../../../../packages/neo/contracts";
import CreatePool from "../CreatePool";

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
            <button
              onClick={() => setCreateModalActive(true)}
              className="button is-light"
            >
              Create
            </button>
          </div>
        </div>
      </div>

      <hr />

      {list.map((item, i) => {
        return (
          <div
            style={{ alignItems: "center" }}
            className="media"
            key={"pairs" + i}
          >
            <div className="media-left">
              <strong>TVL</strong>
            </div>
            <div className="media-content is-vcentered">
              {ASSET_LIST[network][item.tokenA].symbol} /{" "}
              {ASSET_LIST[network][item.tokenB].symbol}
              <br />
              <small>
                {item.amountA} / {item.amountB}
              </small>
              <br />
              <Link
                to={{
                  pathname: `${SWAP_PATH_HISTORY}`,
                  search: `?tokenA=${item.tokenA}&tokenB=${item.tokenB}`,
                }}
              >
                Swap history
              </Link>
              <br />
              <Link
                to={{
                  pathname: `${SWAP_PATH_LIQUIDITY}`,
                  search: `?tokenA=${item.tokenA}&tokenB=${item.tokenB}`,
                }}
              >
                Add liquidity
              </Link>
            </div>
            <div className="media-right">
              <button
                onClick={() => setDetail(item)}
                className="button is-light"
              >
                Detail
              </button>
            </div>
          </div>
        );
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
