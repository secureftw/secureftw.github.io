import React from "react";
import { IFarmContractStatus } from "../../../packages/neo/contracts/ftw/farm/interfaces";
import MyPosition from "./MyPosition";

interface IPoolProps {
  contractStatus?: IFarmContractStatus;
  onDeposit: () => void;
  onCancel: () => void;
  onClaim: () => void;
}
const Pool = ({ contractStatus, onDeposit, onCancel, onClaim }: IPoolProps) => {
  return (
    <div className="">
      <div className="box">
        <div className="level">
          <div className="level-left">
            <div className="level-item is-block">
              <h1 className="title is-4 is-marginless">Total</h1>
            </div>
          </div>
          <div className="level-right">
            <div>
              {contractStatus?.neoBalance} <strong>NEO</strong>
            </div>
          </div>
        </div>
      </div>

      {contractStatus && contractStatus.deposit ? (
        <MyPosition
          deposit={contractStatus.deposit}
          lastSnapshotNo={contractStatus.snapshots.totalItems}
          onCancel={onCancel}
          onClaim={onClaim}
        />
      ) : (
        <button onClick={onDeposit} className="button is-primary is-fullwidth">
          Deposit
        </button>
      )}
    </div>
  );
};

export default Pool;
