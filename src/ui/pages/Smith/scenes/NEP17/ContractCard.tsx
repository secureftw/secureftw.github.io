import React from "react";
import { ISmithNEP17Record } from "../../../../../packages/neo/contracts/ftw/smith/interfaces";
import {
  MAINNET,
  UNKNOWN_TOKEN_IMAGE,
} from "../../../../../packages/neo/consts";
import { useWallet } from "../../../../../packages/provider";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import { Link } from "react-router-dom";
import { SMITH_CONTRACT_NEP17_PATH } from "../../../../../consts";

interface IContractCardProps {
  data: ISmithNEP17Record;
}
const ContractCard = ({ data }: IContractCardProps) => {
  const manifest = data.manifest ? JSON.parse(data.manifest) : {};
  return (
    <div>
      <Link to={`${SMITH_CONTRACT_NEP17_PATH}/${data.contractHash}`}>
        <div className="has-text-centered">
          <div
            className="image mb-3"
            style={{ margin: "auto", borderRadius: "50%", width: "40px" }}
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
          <p className="heading">{data.symbol}</p>
        </div>
      </Link>

      {/*<div className="media">*/}
      {/*  <div className="media-content">*/}
      {/*    <div className="level">*/}
      {/*      <div className="level-left">*/}
      {/*        {logo && (*/}
      {/*          <div className="level-item">*/}
      {/*            <div className="image is-64x64">*/}
      {/*              <img src={logo} />*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        )}*/}

      {/*        <div className="level-item">*/}
      {/*          <h5 className="title is-5 is-marginless">*/}
      {/*            #{data.no} {data.name}*/}
      {/*          </h5>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    <div className="content">*/}
      {/*      <strong>Contract Hash</strong>*/}
      {/*      <br />*/}
      {/*      0x{data.contractHash}{" "}*/}
      {/*      <a*/}
      {/*        target="_blank"*/}
      {/*        href={`https://${*/}
      {/*          network === MAINNET*/}
      {/*            ? "explorer.onegate.space"*/}
      {/*            : "testnet.explorer.onegate.space"*/}
      {/*        }/contractinfo/0x${data.contractHash}`}*/}
      {/*      >*/}
      {/*        <FaExternalLinkAlt />*/}
      {/*      </a>*/}
      {/*      <br />*/}
      {/*      <strong>Contract Owner</strong>*/}
      {/*      <br />*/}
      {/*      {data.contractOwner}*/}
      {/*    </div>*/}
      {/*    <div className="field is-grouped is-grouped-multiline">*/}
      {/*      <div className="control">*/}
      {/*        <div className="tags has-addons">*/}
      {/*          <span className="tag is-dark">Symbol</span>*/}
      {/*          <span className="tag is-info">{data.symbol}</span>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      <div className="control">*/}
      {/*        <div className="tags has-addons">*/}
      {/*          <span className="tag is-dark">Decimals</span>*/}
      {/*          <span className="tag is-info">{data.decimals}</span>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      <div className="control">*/}
      {/*        <div className="tags has-addons">*/}
      {/*          <span className="tag is-dark">Total supply</span>*/}
      {/*          <span className="tag is-info">*/}
      {/*            {parseFloat(data.totalSupply).toLocaleString()}*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div className="media-right">*/}
      {/*    <Link*/}
      {/*      to={`${SMITH_CONTRACT_NEP17_PATH}/${data.contractHash}`}*/}
      {/*      className="button is-light"*/}
      {/*    >*/}
      {/*      Info*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default ContractCard;
