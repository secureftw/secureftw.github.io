import React, { useState } from "react";
import { IFarmContractStatus } from "../../../packages/neo/contracts/ftw/farm/interfaces";
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
    <div className="box">
	    <h1 className="title is-4">About</h1>

	    <h4 className="title is-6">Current settings</h4>
	    <p className="subtitle is-6">
		    Range: {contractStatus.range}
		    <br />
		    Interval: {contractStatus.interval}
	    </p>
    </div>
  );
};

export default SnapshotList;
