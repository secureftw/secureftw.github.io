import React from "react";
import PositionCard from "./PositionCard";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import { StakingContract } from "../../../../../packages/neo/contracts/ftw/staking";
import { INetworkType } from "../../../../../packages/neo/network";
import { IConnectedWallet } from "../../../../../packages/neo/wallet/interfaces";
import ErrorNotificationWithRefresh from "../../../../components/ErrorNotificationWithRefresh";

interface IPositionListProps {
  network: INetworkType;
  connectedWallet: IConnectedWallet;
  refresh: number;
  onRefresh: () => void;
  onUnStake: (tokenId: string) => void;
}
const PositionList = ({
  network,
  connectedWallet,
  refresh,
  onRefresh,
  onUnStake,
}: IPositionListProps) => {
  const { isLoaded, error, data } = useOnChainData(() => {
    return new StakingContract(network).getStakedLPTokens(connectedWallet);
  }, [connectedWallet, refresh, network]);
  return (
    <div>
      {!isLoaded ? (
        <div>Loading</div>
      ) : error ? (
        <ErrorNotificationWithRefresh error={error} onRefresh={onRefresh} />
      ) : data && data.length > 0 ? (
        <div>
          {data.map((item, i) => {
	          return <PositionCard
		          key={"position" + i}
		          {...item}
		          onUnStake={onUnStake}
	          />
          })}
        </div>
      ) : (
        <div>No staking found</div>
      )}
    </div>
  );
};

export default PositionList;
