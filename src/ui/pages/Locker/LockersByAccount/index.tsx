import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../packages/provider";
import { useParams } from "react-router-dom";
import { ILockersByToken } from "../../../../packages/neo/contracts/ftw/locker/interface";
import { LockerContract } from "../../../../packages/neo/contracts/ftw/locker";
import LockerByUserCard from "./LockerByUserCard";

const LockersByAccount = () => {
  const { network } = useWallet();
  const params = useParams();
  const { address } = params as any;
  const [data, setData] = useState<{
    items: ILockersByToken;
  }>();
  useEffect(() => {
    async function fetch() {
      try {
        const items = await new LockerContract(network).getLockersByUser(
          address
        );
        setData({
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
          <div className="box  is-shadowless">
            <h1 className="title is-5">Lockers of {address}</h1>
            <div className="table-container">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Locker no</th>
                    <th>Contract hash</th>
                    <th>Symbol</th>
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
                      return <LockerByUserCard {...locker} />;
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
    </div>
  );
};

export default LockersByAccount;
