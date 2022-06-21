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
          <div className="columns is-multiline is-mobile">
            {assets.length > 0 ? (
              assets.map(({ contractHash, logo, symbol, decimals }) => {
                return (
                  <div
                    className="column is-2-desktop is-3-mobile"
                    onClick={() => onAssetClick(contractHash, symbol, decimals)}
                    // className="panel-block"
                    key={`assets-${contractHash}`}
                  >
                    <div className="box is-hoverable has-text-centered">
                      <figure
                        className="image is-32x32"
                        style={{ margin: "auto" }}
                      >
                        <img src={logo} />
                      </figure>

                      <span className="is-size-7">{symbol}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}

            <a onClick={() => setCustomInputMode(true)} className="button is-fullwidth is-light">
              <span className="icon">
                <FaPlus />
              </span>
              <span>Custom contract hash</span>
            </a>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AssetListModal;
