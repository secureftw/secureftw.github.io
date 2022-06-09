import React from "react";
import { IFarmContractStatus } from "../../../packages/neo/contracts/ftw/gas-fi/interfaces";
import SnapshotCountdown from "./SnapshotCountdown";

interface IClaimsProps {
  contractStatus?: IFarmContractStatus;
  onClaim: () => void;
}
const Claims = ({ contractStatus, onClaim }: IClaimsProps) => {
  if (!contractStatus) return <div></div>;
  if (!contractStatus.claims) return <div></div>;
  if (!contractStatus.deposit) return <div></div>;
  const lastClaimNo = contractStatus.deposit.lastClaimNo
    ? parseFloat(contractStatus.deposit.lastClaimNo)
    : 0;
  const isClaimable =
    parseFloat(contractStatus.snapshots.totalItems) > lastClaimNo;
  return (
    <div className="">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-4 is-marginless">My Claims</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            {isClaimable && (
              <button
                onClick={onClaim}
                className="button is-primary is-fullwidth"
              >
                Claim Reward
              </button>
            )}
          </div>
        </div>
      </div>
      {contractStatus.claims.items.length > 0 ? (
        contractStatus.claims.items.map((item) => {
          return (
            <div key={item.createdAt} className="media">
              <div className="media-left">#{item.no}</div>
              <div className="media-content">
                Snapshots: {`${item.from} ~ ${item.end}`}
                <br />
                GAS: {item.GAS}
                <br />
                FTW: {item.FTW}
                <br />
                {item.createdAt}
              </div>
            </div>
          );
        })
      ) : (
        <div>No claims to display</div>
      )}
    </div>
  );
};

export default Claims;
