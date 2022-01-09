import React, { useEffect, useState } from "react";
// tslint:disable-next-line:no-submodule-imports
import { FaPlay } from "react-icons/fa";
import { NFTContract } from "../../../../../../packages/neo/contracts";
import { IRuneMeta } from "../../../../../../packages/neo/contracts/ftw/nft/interfaces";
import { INetworkType } from "../../../../../../packages/neo/network";
import { IHistoryGame } from "../../../../../../packages/neo/contracts/ftw/tournament/interfaces";
import ClaimButton from "../../../components/ClaimButton";
import { u } from "@cityofzion/neon-core";
import { toDecimal } from "../../../../../../packages/neo/utils";

interface IDisplayRuneProps {
  history: IHistoryGame;
  arenaNo: string;
  width: string;
  height: string;
  network: INetworkType;
  onClick: (obj) => void;
  onReplay: () => void;
  onClaimed: (txid: string) => void;
}

const HistoryTable = ({
  history,
  arenaNo,
  width,
  height,
  network,
  onClick,
  onReplay,
  onClaimed,
}: IDisplayRuneProps) => {
  const [token, setToken] = useState<IRuneMeta>();
  useEffect(() => {
    async function fetchContractStatus() {
      try {
        const res = await new NFTContract(network).getProperties(
          history.champion
        );
        setToken(res);
      } catch (e: any) {
        // setError(e.message);
      }
    }
    fetchContractStatus();
  }, [history]);
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
        <div className="content">
          Game #{history.gameNo}
          <br />
          Champ: {token.name} ({token.phase} / {token.luck})
          <br />
          Total bets: {toDecimal(history.totalBets)}
          <br />
          Rollover: {toDecimal(history.rollover)}
          <br />
          Total bets on champ: {toDecimal(history.betsOnChampion)}
          <br />
          Fee: {toDecimal(history.fee)}
          <br />
          Champ prize: {toDecimal(history.championPrize)}
        </div>
        <button onClick={() => onReplay()} className="button is-black is-small">
          <span className="icon">
            <FaPlay />
          </span>
          <span>Replay</span>
        </button>
      </div>
      <div className="media-right">
        <div>
          <ClaimButton
            onClaimed={onClaimed}
            arenaNo={arenaNo}
            history={history}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
