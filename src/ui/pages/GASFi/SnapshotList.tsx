import React, { useState } from "react";
import { IFarmContractStatus } from "../../../packages/neo/contracts/ftw/gas-fi/interfaces";
import { useWallet } from "../../../packages/provider";
import { FarmContract } from "../../../packages/neo/contracts";
import { toast } from "react-hot-toast";
import SnapshotCountdown from "./SnapshotCountdown";
import SnapshotCard from "./SnapshotCard";

interface ISnapshotListProps {
  contractStatus?: IFarmContractStatus;
}
const SnapshotList = ({ contractStatus }: ISnapshotListProps) => {
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [txid, setTxid] = useState<string>();
  const onCreateSnapshot = async () => {
    if (connectedWallet) {
      try {
        const res = await new FarmContract(network).createSnapshot(
          connectedWallet
        );
        setTxid(res);
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      openWalletModal();
    }
  };
  if (!contractStatus) return <div></div>;
  return (
    <div className="">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-4 is-marginless">Snapshots</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <SnapshotCountdown
              timeLeft={parseFloat(contractStatus.timeLeft)}
              onCreateSnapshot={onCreateSnapshot}
            />
          </div>
        </div>
      </div>

      {contractStatus.snapshots.items.map((item) => (
        <SnapshotCard key={item.no} item={item} />
      ))}
    </div>
  );
};

export default SnapshotList;
