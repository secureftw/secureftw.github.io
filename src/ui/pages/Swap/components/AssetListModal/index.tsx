import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import { useWallet } from "../../../../../packages/provider";
import { ASSETS } from "../../../../../packages/neo/contracts/ftw/swap/consts";
// tslint:disable-next-line:no-submodule-imports
import { FaPlus } from "react-icons/all";
import { wallet } from "@cityofzion/neon-core";
import { toast } from "react-hot-toast";
interface IAssetListModalProps {
  tokenA?: string;
  tokenB?: string;
  onClose: () => void;
  onAssetClick: (assetHash: string) => void;
}
const AssetListModal = ({
  tokenA,
  tokenB,
  onAssetClick,
  onClose,
}: IAssetListModalProps) => {
  const { network } = useWallet();
  const [isCustomInputMode, setCustomInputMode] = useState(false);
  const [contractHash, setContractHash] = useState("");
  const assets = ASSETS(network).filter((asset) => {
    return asset.contractHash !== tokenA && asset.contractHash !== tokenB;
  });
  const onAddContractHash = () => {
    let hash = contractHash;
    const ox = contractHash.substring(0, 2);
    if (ox === "0x") {
      hash = contractHash.substring(2);
    }
    if (wallet.isScriptHash(hash)) {
      onAssetClick(hash);
    } else {
      toast.error("Not valid hash.");
    }
  };
  return (
    <Modal onClose={onClose}>
      {isCustomInputMode ? (
        <div>
          <div className="field">
            <label className="label">Enter a contract hash</label>
            <input
              className="input"
              value={contractHash}
              onChange={(e) => setContractHash(e.target.value)}
            />
          </div>
          <button
            onClick={onAddContractHash}
            disabled={!contractHash}
            className="button is-primary"
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <h5 className="title is-6">Select a token</h5>
          <nav className="panel">
            {/*<div className="panel-block">*/}
            {/*  <p className="control has-icons-left">*/}
            {/*    <input className="input" type="text" placeholder="Search" />*/}
            {/*    <span className="icon is-left">*/}
            {/*      <i className="fas fa-search" aria-hidden="true"></i>*/}
            {/*    </span>*/}
            {/*  </p>*/}
            {/*</div>*/}

            {assets.length > 0 ? (
              assets.map(({ contractHash, logo, symbol }) => {
                return (
                  <a
                    onClick={() => onAssetClick(contractHash)}
                    className="panel-block"
                    key={contractHash}
                  >
                    <div className="panel-icon">
                      <img src={logo} />
                    </div>
                    {symbol}
                  </a>
                );
              })
            ) : (
              <div></div>
            )}
            <a
              onClick={() => setCustomInputMode(true)}
              className="panel-block"
              // key={contractHash}
            >
              <div className="panel-icon">
                <FaPlus />
              </div>
              Custom contract hash
            </a>
          </nav>
        </div>
      )}
    </Modal>
  );
};

export default AssetListModal;
