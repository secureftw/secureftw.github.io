import React, { useState } from "react";
import { truncateAddress } from "../../packages/neo/utils";
interface ITruncatedAddressProps {
  address: string;
}
const TruncatedAddress = ({ address }: ITruncatedAddressProps) => {
  const [isFiltered, setFilter] = useState(true);
  return (
    <span onClick={() => setFilter(!isFiltered)}>
      {isFiltered ? truncateAddress(address) : address}
    </span>
  );
};

export default TruncatedAddress;
