import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { NFTContract } from "../../../../../../packages/neo/contracts";
import { IRuneMeta } from "../../../../../../packages/neo/contracts/ftw/nft/interfaces";
import { INetworkType } from "../../../../../../packages/neo/network";

interface IDisplayRuneProps {
  gameNo: string;
  width: string;
  height: string;
  tokenId: string;
  network: INetworkType;
  onClick: (obj) => void;
  onReplay: () => void;
}

const DisplayRuneTable = ({
  gameNo,
  width,
  height,
  tokenId,
  network,
  onClick,
  onReplay,
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
    <div className="media">
      <div className="media-left">
        {" "}
        <figure
          style={{ width, height }}
          className="image rune"
          onClick={() => onClick(token)}
        >
          <img src={token.image} />
        </figure>
      </div>
      <div className="media-content">
        <p>
          Game #{gameNo}
          <br />
          <strong>{token.name}</strong>
          <br />
          {token.phase} / {token.luck}
        </p>
      </div>
      <div className="media-right">
        <button onClick={() => onReplay()} className="button is-black">
          <span className="icon">
            <FaPlay />
          </span>
          <span>Replay</span>
        </button>
      </div>
    </div>
  );
};

export default DisplayRuneTable;
