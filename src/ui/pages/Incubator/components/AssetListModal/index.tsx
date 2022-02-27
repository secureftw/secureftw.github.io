import React from "react";
import Modal from "../../../../components/Modal";
import { useWallet } from "../../../../../packages/provider";
import { ASSETS } from "../../../../../packages/neo/contracts/ftw/swap/consts";
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
  const assets = ASSETS(network).filter((asset) => {
    return asset.contractHash !== tokenA && asset.contractHash !== tokenB;
  });
  return (
    <Modal onClose={onClose}>
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
            <div className="panel-block">No available token to pick</div>
          )}
        </nav>
      </div>
    </Modal>
  );
};

export default AssetListModal;
