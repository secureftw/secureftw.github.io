import React, { useEffect, useState } from "react";
import { INetworkType } from "../../../../packages/neo/network";
import { IRuneMeta } from "../../../../packages/neo/contracts/ftw/nft/interfaces";
import { RestAPI } from "../../../../packages/neo/api";
// tslint:disable-next-line:no-submodule-imports
import { FaStar } from "react-icons/fa";

interface IDisplayRuneProps {
  width: string;
  height: string;
  tokenId: string;
  network: INetworkType;
  isOwner?: boolean;
  onClick: (obj) => void;
}

const DisplayRuneWithProperties = ({
  width,
  height,
  tokenId,
  network,
  isOwner,
  onClick,
}: IDisplayRuneProps) => {
  const [token, setToken] = useState<IRuneMeta>();
  useEffect(() => {
    async function fetchRune() {
      try {
        const res = await new RestAPI(network).getRune(tokenId);
        setToken(res);
        // LEAVE TO SWITCH IN CASE DB ERROR
        // const res = await new NFTContract(network).getProperties(tokenId);
        // setToken(res);
      } catch (e: any) {
        // setError(e.message);
      }
    }
    fetchRune();
  }, [tokenId]);
  if (!token) return <></>;
  return (
    <figure
      style={{ width, height }}
      className="image rune is-relative"
      onClick={() => onClick({ ...token, tokenId })}
    >
      <img src={token.image} />
      {isOwner && (
        <FaStar
          style={{ position: "absolute", top: "2px", left: "3px" }}
          className="has-text-warning"
        />
      )}
    </figure>
  );
};

export default DisplayRuneWithProperties;
