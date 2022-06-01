import React from "react";
import {
  LAUNCH_AT,
  TOTAL_TOKENS_FOR_SALE,
} from "../../../../packages/neo/contracts/ftw/ido/consts";
import LogoIcon from "../../../components/LogoIcon";
import { NEP_LOGO } from "../../../../packages/neo/contracts/ftw/staking/consts";
import moment from "moment";
import Countdown from "react-countdown";
import CountDownButton from "./CountDownButton";
import { useWallet } from "../../../../packages/provider";

interface IIDOInfoProps {
  isSwapActive: boolean;
  totalSales: string;
  totalSalesInPercentage: number;
  onClick: () => void;
}
const IDOInfo = ({
  totalSales,
  totalSalesInPercentage,
  onClick,
  isSwapActive,
}: IIDOInfoProps) => {
  const { connectedWallet } = useWallet();
  const launchDateFormat = `${moment.unix(LAUNCH_AT).utc().format("llll")} UTC`;
  return (
    <div className="box is-shadowless">
      {/*<h1 className="title is-5 is-marginless">Initial Dex Offering</h1>*/}
      <div className="is-block mb-4">
        <img src={"/bgs/IDO.png"} />
      </div>
      <p className="has-text-weight-light heading has-text-centered">
        FTWSwap is opening its first IDO with NEP tokens. NEP is the governance
        token used to vote on Forthewin platform development, and it can also be
        used as utility tokens of Forthewin ecosystem such as FTWSmith, FTWSwap,
        FTWDAO, FTWRaffle and future platforms.
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

      {!isSwapActive && (
        <button
          // onClick={onClick}
          className="button is-primary is-fullwidth"
        >
          {/*Swap*/}
          Opens at {launchDateFormat}
        </button>
      )}
    </div>
  );
};

export default IDOInfo;
