import React, { useEffect, useState } from "react";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import { INetworkType } from "../../../../../packages/neo/network";

interface IDisplayRuneProps {
  contractHash: string;
  tokenId: string;
  network: INetworkType;
}

const DisplayRune = ({ contractHash, tokenId, network }: IDisplayRuneProps) => {
  const [token, setToken] = useState<any>();
  useEffect(() => {
    async function fetchContractStatus() {
      try {
        const res = await new SmithContract(network).getProperties(
          contractHash,
          tokenId
        );
        setToken(res);
      } catch (e: any) {
        // setError(e.message);
      }
    }
    fetchContractStatus();
  }, [tokenId]);
  if (!token) return <></>;
  return <img width="100%" height="100%" src={token.image} />;
};

export default DisplayRune;
