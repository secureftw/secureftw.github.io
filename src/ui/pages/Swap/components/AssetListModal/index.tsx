import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../../components/Modal";
import { useWallet } from "../../../../../packages/provider";
import { ASSETS } from "../../../../../packages/neo/contracts/ftw/swap/consts";
// tslint:disable-next-line:no-submodule-imports
import { FaPlus } from "react-icons/all";
import { wallet } from "@cityofzion/neon-core";
import { toast } from "react-hot-toast";
import { SwapContract } from "../../../../../packages/neo/contracts/ftw/swap";
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
  const firstInput = useRef(null);
  const onAddContractHash = async () => {
    let hash = customContractHash;
    const ox = customContractHash.substring(0, 2);
    if (ox === "0x") {
      hash = customContractHash.substring(2);
    }
    if (wallet.isScriptHash(hash)) {
      try {
        const res = await new SwapContract(network).getContractSymbol(hash);
        if (res) {
          onAssetClick(hash, res);
        } else {
          toast.error("We cannot find token info with the given hash.");
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please enter a valid contract script hash.");
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
      <input
        ref={firstInput}
        className="input"
        value={customContractHash}
        onChange={(e) => setContractHash(e.target.value)}
      />
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
  const [customContractHash, setContractHash] = useState("");
  const assets = ASSETS(network).filter((asset) => {
    return asset.contractHash !== tokenA && asset.contractHash !== tokenB;
  });
  const onAddContractHash = async () => {
    let hash = customContractHash;
    const ox = customContractHash.substring(0, 2);
    if (ox === "0x") {
      hash = customContractHash.substring(2);
    }
    if (wallet.isScriptHash(hash)) {
      try {
        const res = await new SwapContract(network).getContractSymbol(hash);
        if (res) {
          onAssetClick(hash, res);
        } else {
          toast.error("We cannot find token info with the given hash.");
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please enter a valid contract script hash.");
    }
  };

  return (
    <Modal onClose={onClose}>
      {isCustomInputMode ? (
        <HashInput network={network} onAssetClick={onAssetClick} />
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
