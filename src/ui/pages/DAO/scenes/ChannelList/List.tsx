import React from "react";
import { Link } from "react-router-dom";
import { DAO_CHANNEL_PATH } from "../../../../../consts";
import ChannelCard from "../../components/ChannelCard";
import { DaoContract } from "../../../../../packages/neo/contracts/ftw/dao";

interface IListProps {
  isLoaded: boolean;
  error?: string;
  data: any;
}

const List = ({ isLoaded, error, data }: IListProps) => {
  return (
    <div>
      {!isLoaded ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="columns">
          {data.items.map((item) => {
            const metadata = DaoContract.getMetadata(item.meta);
            return (
              <div key={item.contractHash} className="column is-6">
                <Link
                  to={`${DAO_CHANNEL_PATH}/${item.contractHash}`}
                  className="d"
                >
                  <ChannelCard symbol={item.symbol} logo={metadata.logo} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default List;
