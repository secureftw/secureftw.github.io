import React, { useState } from "react";
import { ISmithNEP11Record } from "../../../../../packages/neo/contracts/ftw/smith/interfaces";
import { MAINNET } from "../../../../../packages/neo/consts";
import { useWallet } from "../../../../../packages/provider";
import NEP11MintFormModal from "../../NEP11MintFormModal";
// tslint:disable-next-line:no-submodule-imports
import { FaExternalLinkAlt } from "react-icons/all";
import Tokens from "./Tokens";

interface IContractCardProps {
  data: ISmithNEP11Record;
}
const ContractCard = ({ data }: IContractCardProps) => {
  const { network, connectedWallet } = useWallet();
  const [isMintModalActive, setMintModalActive] = useState("");
  return (
    <div className="media">
      <div className="media-content">
        <h5 className="title is-5">
          #{data.no} {data.name}
        </h5>
        <div className="content">
          <strong>Contract Hash</strong>
          <br />
          0x{data.contractHash}{" "}
          <a
            target="_blank"
            href={`https://${
              network === MAINNET
                ? "explorer.onegate.space"
                : "testnet.explorer.onegate.space"
            }/NFTtokeninfo/0x${data.contractHash}`}
          >
            <FaExternalLinkAlt />
          </a>
          <br />
          <strong>Contract Owner</strong>
          <br />
          {data.contractOwner}
          <br />
          <Tokens contractHash={data.contractHash} />
        </div>
      </div>
      {connectedWallet &&
        connectedWallet.account.address === data.contractOwner && (
          <div className="media-right">
            <div className="block">
              <button
                onClick={() => setMintModalActive(data.contractHash)}
                className="button is-primary press-font"
              >
                Mint
              </button>
            </div>
          </div>
        )}

      {isMintModalActive && (
        <NEP11MintFormModal
          contractHash={isMintModalActive}
          onClose={() => setMintModalActive("")}
        />
      )}
    </div>
  );
};

export default ContractCard;
