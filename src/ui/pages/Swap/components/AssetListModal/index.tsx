import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../../components/Modal";
import { useWallet } from "../../../../../packages/provider";
import { ASSETS } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import { FaPlus } from "react-icons/fa";
import { wallet } from "@cityofzion/neon-core";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { INetworkType } from "../../../../../packages/neo/network";
interface IAssetListModalProps {
  tokenA?: string;
  tokenB?: string;
  onClose: () => void;
  onAssetClick: (assetHash: string, symbol: string) => void;
}

interface IHashInputProp {
  network: INetworkType;
  onAssetClick: (assetHash: string, symbol: string) => void;
}
const HashInput = ({ network, onAssetClick }: IHashInputProp) => {
  const [customContractHash, setContractHash] = useState("");
  const [error, setError] = useState<string | undefined>();
  const firstInput = useRef(null);
  const onAddContractHash = async () => {
    setError(undefined);
    let hash = customContractHash;
    const ox = customContractHash.substring(0, 2);
    if (ox === "0x") {
      hash = customContractHash.substring(2);
    }
    if (wallet.isScriptHash(hash)) {
      try {
        const symbol = await new SwapContract(network).getContractSymbol(hash);
        onAssetClick(hash, symbol);
      } catch (e: any) {
        setError(e.message);
      }
    } else {
      setError("Please enter a valid contract script hash.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    firstInput.current.focus();
  }, []);

  return (
    <>
      <label className="label is-marginless">Enter a contract hash</label>
      <p className="help has-text-grey">
        Example: 0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5
      </p>
      <hr />
      <div className="field">
        <input
          ref={firstInput}
          className="input"
          value={customContractHash}
          onChange={(e) => setContractHash(e.target.value)}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>

      <hr />
      <button
        onClick={onAddContractHash}
        disabled={!customContractHash}
        className="button is-primary"
      >
        Submit
      </button>
    </>
  );
};

const AssetListModal = ({
  tokenA,
  tokenB,
  onAssetClick,
  onClose,
}: IAssetListModalProps) => {
  const { network } = useWallet();
  const [isCustomInputMode, setCustomInputMode] = useState(false);
  const assets = ASSETS(network).filter((asset) => {
    return asset.contractHash !== tokenA && asset.contractHash !== tokenB;
  });

  return (
    <Modal onClose={onClose}>
      {isCustomInputMode ? (
        <HashInput network={network} onAssetClick={onAssetClick} />
      ) : (
        <div>
          <h5 className="title is-6">Select a token</h5>
          <nav className="panel">
            {assets.length > 0 ? (
              assets.map(({ contractHash, logo, symbol }) => {
                return (
                  <a
                    onClick={() => onAssetClick(contractHash, symbol)}
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
