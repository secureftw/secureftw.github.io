import moment from "moment";
import React from "react";
import { toDecimal } from "../../../../../packages/neo/utils";
import {
  ILPTokens,
  IPair,
} from "../../../../../packages/neo/contracts/ftw/swap/interfaces";
interface ILPTokenListProps extends ILPTokens {
  onRemove: (tokenId: string) => void;
}
const LPTokenList = ({
  name,
  amount,
  lockUntil,
  onRemove,
  tokenId,
}: ILPTokenListProps) => {
  const now = moment.utc().valueOf();
  const expired = lockUntil === "None" ? 0 : moment(lockUntil).valueOf();
  return (
    <div className="media">
      <div className="media-content">
        {name} / {amount}
        <br />
        {lockUntil}
      </div>
      <div className="media-right">
        <button
          disabled={now < expired}
          onClick={() => onRemove(tokenId)}
          className="button is-light is-small"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default LPTokenList;
