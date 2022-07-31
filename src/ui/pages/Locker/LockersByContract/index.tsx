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
import { FaLock, FaPlus, FaUnlock } from "react-icons/fa";
import toast from "react-hot-toast";
import { LOCKER_CREATE_PATH } from "../../../../consts";
import LockerCard from "./LockerCard";

const LockersByContract = () => {
  const { network } = useWallet();
  const params = useParams();
  const { contractHash } = params as any;
  const [data, setData] = useState<{
    contract: ILockerContract;
    items: ILockersByToken;
  }>();

  useEffect(() => {
    async function fetch() {
      try {
        const contract = await new LockerContract(network).getContract(
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
  }, [network]);
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
                    <th>Amount</th>
                    <th>Release at</th>
                    <th>Created at</th>
                    <th>Time left</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.items.items.map((locker) => (
                      <LockerCard contract={data.contract} locker={locker} />
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/*{txid && (*/}
      {/*  <Modal onClose={() => setTxid("")}>*/}
      {/*    <AfterTransactionSubmitted*/}
      {/*      txid={txid}*/}
      {/*      network={network}*/}
      {/*      onSuccess={handleAfterTx}*/}
      {/*      onError={() => setTxid("")}*/}
      {/*    />*/}
      {/*  </Modal>*/}
      {/*)}*/}
    </div>
  );
};

export default LockersByContract;
