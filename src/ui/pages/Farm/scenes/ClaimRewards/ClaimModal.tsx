import React, { useState } from "react";
import { IClaimableRewards } from "../../../../../packages/neo/contracts/ftw/farm/interfaces";
import ModalCard from "../../../../components/Modal";
import {toDecimal} from "../../../../../packages/neo/utils";

const ClaimModal = (props: {
  items: IClaimableRewards[];
  onClaim: (v: IClaimableRewards[]) => void;
  onClose: () => void;
}) => {
  const [selectedItems, setSelectedItems] = useState<IClaimableRewards[]>(
    props.items
  );

  const handleToggle = (v: IClaimableRewards) => {
    let index: number | null = null;
    const arr = selectedItems;
    selectedItems.forEach((item, i) => {
      if (item.tokenA === v.tokenA && item.tokenB === v.tokenB) {
        index = i;
      }
    });
    if (index != null) {
      setSelectedItems(
        arr.filter((f) => f.tokenA !== v.tokenA || f.tokenB !== v.tokenB)
      );
    } else {
      setSelectedItems([...arr, v]);
    }
  };

  return (
    <>
      <ModalCard onClose={() => props.onClose()}>
        <div>
          <h1 className="title">Claim rewards</h1>
          <nav className="panel is-primary">
            {props.items.map((item, i) => {
              let isSelected = false;
              selectedItems.forEach((_item) => {
                if (
                  item.tokenA === _item.tokenA &&
                  item.tokenB === _item.tokenB
                ) {
                  isSelected = true;
                }
              });
              return (
                <label key={`select-${i}`} className="panel-block">
                  <div className="media-left">
                    <input
                      onClick={() => handleToggle(item)}
                      type="checkbox"
                      checked={isSelected}
                    />
                  </div>
                  <div className="media">
                    <div className="media-content content is-small">
                      {item.tokenASymbol}-{item.tokenBSymbol}
                      <br /> {toDecimal(item.claimable)} NEP
                    </div>
                  </div>
                </label>
              );
            })}
            <div className="panel-block">
              <button
                onClick={() => props.onClaim(selectedItems)}
                className="button is-warning is-fullwidth"
              >
                Claim
              </button>
            </div>
          </nav>
        </div>
      </ModalCard>
    </>
  );
};

export default ClaimModal;
