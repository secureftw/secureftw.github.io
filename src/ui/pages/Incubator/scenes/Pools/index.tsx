import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { IncubatorContract } from "../../../../../packages/neo/contracts/ftw/incubator";
import { Link } from "react-router-dom";
import { INCUBATOR_POOL_PATH } from "../../../../../consts";

const Pools = (props) => {
  const { network, connectedWallet } = useWallet();
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await new IncubatorContract(network).pools("1");
        // tslint:disable-next-line:no-console
        console.log(res);
        setLoading(false);
        setData(res as any);
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
      }
    }
    fetch();
  }, []);
  if (isLoading) return <div>Loading pairs..</div>;
  console.log(data);
  return (
    <div className="box">
      {data &&
        data.items.map((item) => {
          const lockedPercent = (item.initialAmount / item.totalSupply) * 100;
          return (
            <div className="media">
              <div className="media-content">
                <div className="content">
                  <strong>{item.name}</strong>
                  <br />
                  {item.description}
                  <br />
                  {item.website}
                </div>
                <div className="content is-small">
                  Locked supply: {item.initialAmount} ({lockedPercent}%)
                  <br />
                  Symbol: {item.symbol}
                </div>
              </div>
              <div className="media-right">
                <Link className="button is-info" to={INCUBATOR_POOL_PATH + "/"}>
                  Trade
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Pools;
