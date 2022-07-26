import React, { useEffect, useState } from "react";
import moment from "moment";
import TruncatedAddress from "../../../components/TruncatedAddress";
import { u } from "@cityofzion/neon-core";
import { useWallet } from "../../../../packages/provider";
import { LockerContract } from "../../../../packages/neo/contracts/ftw/locker";
import {
  ILocker,
  ILockerContract,
} from "../../../../packages/neo/contracts/ftw/locker/interface";
import toast from "react-hot-toast";
import Modal from "../../../components/Modal";
import AfterTransactionSubmitted from "../../../../packages/ui/AfterTransactionSubmitted";

interface ILockerByUserCardProps extends ILocker {}

const LockerByUserCard = (locker: ILockerByUserCardProps) => {
  const { network, connectedWallet } = useWallet();
  const [data, setData] = useState<ILockerContract | undefined>();
  const releaseAt = moment.unix(locker.releaseAt / 1000);
  const now = moment().valueOf();
  const releaseAtValueOf = releaseAt.valueOf();
  const isActive =
    now > releaseAtValueOf &&
    connectedWallet &&
    connectedWallet.account.address === locker.receiver;

	const [txid, setTxid] = useState("");
	const [refresh, setRefresh] = useState(0);
	const handleUnLock = async (lockerNo: string | number) => {
		if (connectedWallet) {
			try {
				const res = await new LockerContract(network).unLock(
					connectedWallet,
					lockerNo
				);
				setTxid(res);
			} catch (e: any) {
				toast.error(e.message);
			}
		} else {
			toast.error("Connect your wallet");
		}
	};
	const handleAfterTx = () => {
		setRefresh(refresh + 1)
		setTxid("")
	}
  useEffect(() => {
    async function fetch() {
      try {
        const contract = await new LockerContract(network).getToken(
          locker.contractHash
        );
        setData(contract);
      } catch (e: any) {
        console.error(e);
      }
    }
    fetch();
  }, [network, refresh]);
  return (
    <tr key={locker.lockerNo}>
      <td>{locker.lockerNo}</td>
      <td>{locker.contractHash}</td>
      <td>{data ? data.symbol : ""}</td>
      <td>
        <TruncatedAddress address={locker.owner} />
      </td>
      <td>
        <TruncatedAddress address={locker.receiver} />
      </td>
      <td>
        {data
          ? parseFloat(
              u.BigInteger.fromNumber(locker.amount).toDecimal(data.decimals)
            )
          : ""}{" "}
        {data ? data.symbol : ""}
      </td>
      <td>{releaseAt.format("lll")}</td>
      <td>{locker.createdAt}</td>
      <td>
	      {locker.releasedAt !== 0 ? (
		      <>Unlocked</>
	      ) : (
		      <button
			      onClick={() => handleUnLock(locker.lockerNo)}
			      disabled={!isActive}
			      className="button is-primary is-small is-outlined"
		      >
			      Unlock
		      </button>
	      )}
      </td>
	    {txid && (
		    <Modal onClose={() => setTxid("")}>
			    <AfterTransactionSubmitted
				    txid={txid}
				    network={network}
				    onSuccess={handleAfterTx}
				    onError={() => setTxid("")}
			    />
		    </Modal>
	    )}
    </tr>
  );
};

export default LockerByUserCard;
