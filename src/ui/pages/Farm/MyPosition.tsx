import React from "react";
import {
  IFarmDepositRecord,
  IFarmSnapshot,
} from "../../../packages/neo/contracts/ftw/farm/interfaces";
import { useWallet } from "../../../packages/provider";
import { FarmContract } from "../../../packages/neo/contracts";

interface IMyPositionProps {
  deposit?: IFarmDepositRecord;
  // lastClaim?: string;
  lastSnapshotNo: string;
  onCancel: () => void;
  onClaim: () => void;
}
const MyPosition = ({
  deposit,
  // lastClaim,
  lastSnapshotNo,
  onCancel,
  onClaim,
}: IMyPositionProps) => {
  // const { connectedWallet, network } = useWallet();
  if (!deposit) return <div></div>;
  const lastClaimNo = deposit.lastClaimNo ? parseFloat(deposit.lastClaimNo) : 0;
  let isClaimable = parseFloat(lastSnapshotNo) > lastClaimNo;
  return (
    <>
      <div className="level">
        <div className="level-left">
          <div className="level-item is-block">
            <div className="has-text-grey-lighter">
              My position
              <br />
              <span className="is-capitalized">
                {deposit.position} / {deposit.amount} NEO
              </span>
            </div>
          </div>
        </div>

        <div className="level-right">
          <button
            onClick={onCancel}
            className="button is-black is-outlined is-inverted"
          >
            Close
          </button>
        </div>
      </div>
      {isClaimable && (
        <button onClick={onClaim} className="button is-primary is-fullwidth">
          Claim Reward
        </button>
      )}
    </>
  );
};

export default MyPosition;
