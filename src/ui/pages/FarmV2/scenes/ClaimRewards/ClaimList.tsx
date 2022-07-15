import React from "react";
import CounterUp from "./CounterUp";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";
import { StakingContract } from "../../../../../packages/neo/contracts/ftw/farm";
import { INetworkType } from "../../../../../packages/neo/network";
import { IConnectedWallet } from "../../../../../packages/neo/wallet/interfaces";
import { FarmV2Contract } from "../../../../../packages/neo/contracts/ftw/farm-v2";
import { u } from "@cityofzion/neon-core";
interface IClaimListProps {
  network: INetworkType;
  connectedWallet?: IConnectedWallet;
  refresh: number;
  pRefresh: number;
  isClaimNode: boolean;
  handleToggle: (item: any) => void;
  selectedItems: any[];
}
const ClaimList = ({
  network,
  connectedWallet,
  refresh,
  pRefresh,
  isClaimNode,
  handleToggle,
  selectedItems,
}: IClaimListProps) => {
  const { isLoaded, data } = useOnChainData(() => {
    return new FarmV2Contract(network).getClaimable(connectedWallet);
  }, [connectedWallet, network, refresh, pRefresh]);
  return (
    <div>
      {isLoaded &&
        data.map((item, i) => {
          let isSelected = false;
          selectedItems.forEach((_item) => {
            if (item.tokenA === _item.tokenA && item.tokenB === _item.tokenB) {
              isSelected = true;
            }
          });
          return (
            <div key={`claim-${i}`} className="media">
              {isClaimNode && (
                <div className="media-left">
                  <input
                    onClick={() => handleToggle(item)}
                    type="checkbox"
                    checked={isSelected}
                  />
                </div>
              )}
              <div className="media-content content is-small">
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      <span className="has-text-weight-medium">
                        {item.tokenASymbol}-{item.tokenBSymbol}
                      </span>
                    </div>
                  </div>

                  <div className="level-right">
                    <div className="level-item is-block has-text-right">
                      <small>
                        <CounterUp
                          symbol="NEP"
                          claimable={item.rewardsToHarvest}
                          rewardsPerSecond={item.nepTokensPerSecond}
                          tokensStaked={item.tokensStaked}
                          share={item.share}
                        />
                      </small>
                      {item.bonusTokensPerSecond > 0 ? (
                        <small>
                          <CounterUp
                            symbol={item.bonusTokenSymbol}
                            claimable={item.bonusToHarvest}
                            rewardsPerSecond={item.bonusTokensPerSecond}
                            tokensStaked={item.tokensStaked}
                            share={item.share}
                          />
                        </small>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ClaimList;
