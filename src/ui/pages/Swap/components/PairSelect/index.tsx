import React from "react";
import Select from "react-select";
import { PAIR_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import { useWallet } from "../../../../../packages/provider";
interface IPairSelectProps {
  onSelect: (val: { tokenA: string; tokenB: string }) => void;
}
const PairSelect = ({ onSelect }: IPairSelectProps) => {
  const { network } = useWallet();
  return (
    <Select
      onChange={(target) => {
        if (target) {
          onSelect(target.value);
        }
      }}
      options={PAIR_LIST[network]}
    />
  );
};

export default PairSelect;
