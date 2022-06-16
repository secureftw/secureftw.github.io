import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import { useWallet } from "../../../../../packages/provider";
import { SWAP_ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import { FaPlus } from "react-icons/fa";

import ContractSearchInput from "./ContractSearchInput";
interface IAssetListModalProps {
  activeTokenInput: "A" | "B";
  tokenAHash?: string;
  tokenBHash?: string;
  onClose: () => void;
  onAssetClick: (assetHash: string, symbol: string, decimals: number) => void;
}

const AssetListModal = ({
  tokenAHash,
  tokenBHash,
  onAssetClick,
  onClose,
  activeTokenInput,
}: IAssetListModalProps) => {
  const { network } = useWallet();
  const [isCustomInputMode, setCustomInputMode] = useState(false);

  let assets = SWAP_ASSET_LIST(network);
  // if ((tokenAHash && !tokenBHash) || (!tokenAHash && tokenBHash))
  assets = assets.filter((asset) => {
    if (
      activeTokenInput === "A" &&
      tokenBHash &&
      asset.contractHash === tokenBHash
    ) {
      return false;
    }
    if (
      activeTokenInput === "B" &&
      tokenAHash &&
      asset.contractHash === tokenAHash
    ) {
      return false;
    }
    return true;

    // return (
    //   asset.contractHash !== tokenAHash && asset.contractHash !== tokenBHash
    // );
  });

  return (
    <Modal onClose={onClose}>
      {isCustomInputMode ? (
        <ContractSearchInput onAssetClick={onAssetClick} network={network} />
      ) : (
        <div>
          <h5 className="title is-6 ">Select a token</h5>
          <nav className="panel">
            {assets.length > 0 ? (
              assets.map(({ contractHash, logo, symbol, decimals }) => {
                return (
                  <a
                    onClick={() => onAssetClick(contractHash, symbol, decimals)}
                    className="panel-block"
                    key={`assets-${contractHash}`}
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
            <a onClick={() => setCustomInputMode(true)} className="panel-block">
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
