import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { GAS_SCRIPT_HASH } from "../../../../../packages/neo/consts";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { toast } from "react-hot-toast";
import { getEstimate } from "../../../../../packages/neo/contracts/ftw/swap/helpers";
import { toDecimal } from "../../../../../packages/neo/utils";
import Input from "../../components/Input";
import AssetListModal from "../../components/AssetListModal";
import Modal from "../../../../components/Modal";
import FarmDetail from "./scenes/Detail";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";

const Farm = (props) => {
  const { network, connectedWallet } = useWallet();
  const [list, setList] = useState<any[]>([]);
  const [detail, setDetail] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await new SwapContract(network).getPairs();
        console.log(res);
        setLoading(false);
        setList(res);
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
      }
    }
    fetch();
  }, []);
  if (isLoading) return <div>Loading pairs..</div>;
  return (
    <div>
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

export default Farm;
