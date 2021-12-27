import React, { useEffect, useState } from "react";
import { NFTContract } from "../../../packages/neo/contracts";
import { useWallet } from "../../../packages/provider";
import { INetworkType } from "../../../packages/neo/network";
import { IRuneMeta } from "../../../packages/neo/contracts/ftw/nft/interfaces";

interface IDisplayRuneProps {
  width: string;
  height: string;
  tokenId: string;
  network: INetworkType;
  onClick: (obj) => void;
}

const DisplayRune = ({
  width,
  height,
  tokenId,
  network,
  onClick,
}: IDisplayRuneProps) => {
  const [token, setToken] = useState<IRuneMeta>();
  useEffect(() => {
    async function fetchContractStatus() {
      try {
        const res = await new NFTContract(network).getProperties(tokenId);
        setToken(res);
      } catch (e: any) {
        // setError(e.message);
      }
    }
    fetchContractStatus();
  }, [tokenId]);
  if (!token) return <></>;
  return (
    <figure
      style={{ width, height }}
      className="image rune"
      onClick={() => onClick({ ...token, tokenId })}
    >
      <img src={token.image} />
    </figure>
  );
};

export default DisplayRune;
