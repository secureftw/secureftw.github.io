import React from "react";
import { ISmithRecord } from "../../../../../packages/neo/contracts/ftw/smith/interfaces";
import { MAINNET } from "../../../../../packages/neo/consts";
import { useWallet } from "../../../../../packages/provider";
import { FaExternalLinkAlt } from "react-icons/all";

interface IContractCardProps {
  data: ISmithRecord;
}
const ContractCard = ({ data }: IContractCardProps) => {
  const { network } = useWallet();
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
            }/contractinfo/0x${data.contractHash}`}
          >
            <FaExternalLinkAlt />
          </a>
          <br />
          <strong>Contract Owner</strong>
          <br />
          {data.contractOwner}
        </div>
        <div className="field is-grouped is-grouped-multiline">
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark">Symbol</span>
              <span className="tag is-info">{data.symbol}</span>
            </div>
          </div>

          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark">Decimals</span>
              <span className="tag is-info">{data.decimals}</span>
            </div>
          </div>

          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark">Total supply</span>
              <span className="tag is-info">
                {parseFloat(data.totalSupply).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark">Author</span>
              <span className="tag is-info">{data.author}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractCard;