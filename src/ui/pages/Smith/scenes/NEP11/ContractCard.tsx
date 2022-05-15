import React, { useState } from "react";
import { ISmithNEP11Record } from "../../../../../packages/neo/contracts/ftw/smith/interfaces";
import { MAINNET } from "../../../../../packages/neo/consts";
import { useWallet } from "../../../../../packages/provider";
import NEP11MintFormModal from "../PageView/NEP11MintFormModal";
import { FaExternalLinkAlt } from "react-icons/all";
import Tokens from "./Tokens";
import { SMITH_CONTRACT_NEP11_PATH } from "../../../../../consts";
import { Link } from "react-router-dom";

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
      <div className="media-right">
        <Link
          to={`${SMITH_CONTRACT_NEP11_PATH}/${data.contractHash}`}
          className="button is-light"
        >
          Info
        </Link>
      </div>
    </div>
  );
};

export default ContractCard;
