import React from "react";
import { Link } from "react-router-dom";
import {DAO_CHANNEL_PATH, DAO_PATH} from "../../../../../consts";

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
            return (
              <div key={item.contractHash} className="column is-6">
                <Link
                  to={`${DAO_CHANNEL_PATH}/${item.contractHash}`}
                  className="box is-shadowless has-text-centered"
                >
                  {item.symbol}
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
