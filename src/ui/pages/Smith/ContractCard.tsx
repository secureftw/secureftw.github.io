import React from "react";
import { ISmithRecord } from "../../../packages/neo/contracts/ftw/smith/interfaces";

interface IContractCardProps {
  data: ISmithRecord;
}
const ContractCard = ({ data }: IContractCardProps) => {
  return (
    <div className="media">
      <div className="media-content">
        <h5 className="title is-5">#{data.no} {data.name}</h5>
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
              <span className="tag is-info">{data.totalSupply}</span>
            </div>
          </div>

	        <div className="control">
		        <div className="tags has-addons">
			        <span className="tag is-dark">Hash</span>
			        <span className="tag is-info">0x{data.contractHash}</span>
		        </div>
	        </div>
        </div>
      </div>
    </div>
  );
};

export default ContractCard;
