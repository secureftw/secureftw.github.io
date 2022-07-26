import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useWallet } from "../../../../packages/provider";
import { LockerContract } from "../../../../packages/neo/contracts/ftw/locker";
import {
  ILockerContract,
  ILockersByToken,
} from "../../../../packages/neo/contracts/ftw/locker/interface";
import { u } from "@cityofzion/neon-core";
import moment from "moment";
import TruncatedAddress from "../../../components/TruncatedAddress";
import { FaPlus } from "react-icons/fa";
import { LOCKER_CREATE_PATH } from "../../../../consts";
import toast from "react-hot-toast";
import Modal from "../../../components/Modal";
import AfterTransactionSubmitted from "../../../../packages/ui/AfterTransactionSubmitted";

const LockersByContract = () => {
  const { network, connectedWallet } = useWallet();
  const params = useParams();
  const { contractHash } = params as any;
  const [data, setData] = useState<{
    contract: ILockerContract;
    items: ILockersByToken;
  }>();
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
    setRefresh(refresh + 1);
    setTxid("");
  };

  useEffect(() => {
    async function fetch() {
      try {
        const contract = await new LockerContract(network).getToken(
          contractHash
        );
        const items = await new LockerContract(network).getLockersByContract(
          contractHash
        );
        setData({
          contract,
          items,
        });
      } catch (e: any) {
        console.error(e);
      }
    }
    fetch();
  }, [network, refresh]);
  return (
    <div>
      <div className="columns is-centered">
        <div className="column is-8">
          <div className="box is-shadowless">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h1 className="title is-5 is-marginless">
                    {data ? `${data.contract.symbol} lockers` : ""}
                  </h1>
                </div>
              </div>
              {data ? (
                <div className="level-right">
                  <div className="level-item">
                    <div className="buttons">
                      <Link
                        to={`${LOCKER_CREATE_PATH}?contractHash=${data.contract.contractHash}`}
                        className="button is-white"
                      >
                        <FaPlus />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="table-container">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Locker no</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Amount</th>
                    <th>Release at</th>
                    <th>Created at</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.items.items.map((locker) => {
                      const releaseAt = moment.unix(locker.releaseAt / 1000);
                      const now = moment().valueOf();
                      const releaseAtValueOf = releaseAt.valueOf();
                      const isActive =
                        now > releaseAtValueOf &&
                        connectedWallet &&
                        connectedWallet.account.address === locker.receiver;
                      return (
                        <tr key={locker.lockerNo}>
                          <td>{locker.lockerNo}</td>
                          <td>
                            <TruncatedAddress address={locker.owner} />
                          </td>
                          <td>
                            <TruncatedAddress address={locker.receiver} />
                          </td>
                          <td>
                            {parseFloat(
                              u.BigInteger.fromNumber(locker.amount).toDecimal(
                                data.contract.decimals
                              )
                            )}{" "}
                            {data.contract.symbol}
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
                        </tr>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default LockersByContract;
