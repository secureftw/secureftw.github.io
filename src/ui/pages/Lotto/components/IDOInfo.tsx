import React from "react";
import { TOTAL_TOKENS_FOR_SALE } from "../../../../packages/neo/contracts/ftw/ido/consts";
import LogoIcon from "../../../components/LogoIcon";
import { NEP_LOGO } from "../../../../packages/neo/contracts/ftw/farm/consts";
import moment from "moment";

interface IIDOInfoProps {
  launchAt: number;
  totalSales: string;
  totalSalesInPercentage: number;
}
const IDOInfo = ({
  launchAt,
  totalSales,
  totalSalesInPercentage,
}: IIDOInfoProps) => {
  const launchDateFormat = `${moment(launchAt).utc().format("llll")} UTC`;
  return (
    <div className="box is-shadowless">
      <div className="is-block mb-4">
        <img src={"/assets/IDO-1200x600.png"} />
      </div>
      <p className=" ">
        FTWSwap is opening its first IDO with NEP tokens. NEP is the governance
        token used to vote on Forthewin platform development, and it can also be
        used as utility tokens of Forthewin ecosystem, the hub of NEP-17, such
        as Smith, Swap, Farm, DAO, Raffle and future platforms.
      </p>

      <hr />

      <div className="block">
        <p className="has-text-weight-bold heading">
          Sale progress: {totalSales} NEP
        </p>
        <progress
          className="progress is-info"
          value={totalSalesInPercentage === 0 ? 0 : totalSalesInPercentage}
          max="100"
        >
          {totalSalesInPercentage}%
        </progress>
      </div>

      <div className="level">
        <div className="level-left">
          <div className="level-item is-block">
            <p className="has-text-weight-bold heading">Open at</p>
            <small>{launchDateFormat}</small>
          </div>
        </div>

        <div className="level-right">
          <div className="level-item is-block has-text-right">
            <p className="has-text-weight-bold heading">Tokens for sale</p>
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <LogoIcon img={NEP_LOGO} />
                </div>
                <div className="level-item">
                  <small>{TOTAL_TOKENS_FOR_SALE.toLocaleString()} NEP</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDOInfo;
