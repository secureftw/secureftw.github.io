import { u } from "@cityofzion/neon-core";
import React from "react";
import LogoIcon from "../../../components/LogoIcon";
import { ASSET_LIST } from "../../../../packages/neo/contracts/ftw/swap/consts";
import { useHistory } from "react-router-dom";
import { LOCKER_PATH } from "../../../../consts";
interface ILockerTokenCardProps {
  lockedAmount: number;
  decimals: number;
  contractHash: string;
  symbol: string;
  network: string;
}
const LockerTokenCard = ({
  network,
  lockedAmount,
  decimals,
  contractHash,
  symbol,
}: ILockerTokenCardProps) => {
  const history = useHistory();
  const logo = ASSET_LIST[network][contractHash]
    ? ASSET_LIST[network][contractHash].logo
    : undefined;
  const amount = parseFloat(
    u.BigInteger.fromNumber(lockedAmount).toDecimal(decimals)
  );
  return (
    <div
      onClick={() => {
        history.push(`${LOCKER_PATH}/contracts/${contractHash}`);
      }}
      className="box has-text-centered is-hoverable"
    >
      <LogoIcon width="50px" height="50px" img={logo} />
      <br />
      Total locked
      <br />
      {`${amount.toLocaleString()} ${symbol}`}
    </div>
  );
};

export default LockerTokenCard;
