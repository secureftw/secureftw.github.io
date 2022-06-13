import React, { useState } from "react";
import { ISmithNEP11Record } from "../../../../../packages/neo/contracts/ftw/smith/interfaces";
import {
  MAINNET,
  UNKNOWN_TOKEN_IMAGE,
} from "../../../../../packages/neo/consts";
import { useWallet } from "../../../../../packages/provider";
import { FaExternalLinkAlt } from "react-icons/fa";
import Tokens from "./Tokens";
import {
  SMITH_CONTRACT_NEP11_PATH,
  SMITH_CONTRACT_NEP17_PATH,
} from "../../../../../consts";
import { Link } from "react-router-dom";

interface IContractCardProps {
  data: ISmithNEP11Record;
}
const ContractCard = ({ data }: IContractCardProps) => {
  console.log(data.manifest);
  const manifest = data.manifest ? JSON.parse(data.manifest) : {};
  return (
    <div>
      <Link to={`${SMITH_CONTRACT_NEP11_PATH}/${data.contractHash}`}>
        <div className="has-text-centered">
          <div
            className="image is-64x64 mb-2"
            style={{ margin: "auto", borderRadius: "50%" }}
          >
            <img
              onError={(e) => {
                // @ts-ignore
                e.target.src = UNKNOWN_TOKEN_IMAGE;
              }}
              src={
                manifest && manifest.logo ? manifest.logo : UNKNOWN_TOKEN_IMAGE
              }
            />
          </div>
          <div className="heading"> #{data.no}</div>

          <strong className="has-text-dark">{data.symbol}</strong>
        </div>
      </Link>
    </div>
  );
};

export default ContractCard;
