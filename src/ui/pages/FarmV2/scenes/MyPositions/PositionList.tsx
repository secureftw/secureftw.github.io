import React, { useEffect, useState } from "react";
import PositionCard from "./PositionCard";
import { INetworkType } from "../../../../../packages/neo/network";
import { IConnectedWallet } from "../../../../../packages/neo/wallet/interfaces";
import { FarmV2Contract } from "../../../../../packages/neo/contracts/ftw/farm-v2";
import { RestAPI } from "../../../../../packages/neo/api";

interface IPositionListProps {
  network: INetworkType;
  connectedWallet: IConnectedWallet;
  refresh: number;
  onUnStake: (tokenId: string) => void;
}
const PositionList = ({
  network,
  connectedWallet,
  refresh,
  onUnStake,
}: IPositionListProps) => {

  const [data, setData] = useState<any>();

  useEffect(() => {
    async function getData(wallet) {
      try {
        const tokens = await new FarmV2Contract(network).getStakedLPTokens(
          wallet
        );
        const prices = await new RestAPI(network).getPrices();
        setData({
          tokens,
          prices,
        });
      } catch (e: any) {
        console.log(e);
        console.log(e);
      }
    }
    if (connectedWallet) {
      getData(connectedWallet);
    }
  }, [connectedWallet, refresh, network]);

  return (
    <div>
      {!data ? (
        <></>
      ) : data.tokens.length > 0 ? (
        <div>
          {data.tokens.map((item, i) => {
            return (
              <PositionCard
                network={network}
                key={"position" + i}
                prices={data.prices}
                {...item}
                onUnStake={onUnStake}
              />
            );
          })}
        </div>
      ) : (
        <div>No staking found</div>
      )}
    </div>
  );
};

export default PositionList;
