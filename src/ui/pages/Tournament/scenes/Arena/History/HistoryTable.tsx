import React, { useEffect, useState } from "react";
// tslint:disable-next-line:no-submodule-imports
import { FaPlay } from "react-icons/fa";
import { NFTContract } from "../../../../../../packages/neo/contracts";
import { IRuneMeta } from "../../../../../../packages/neo/contracts/ftw/nft/interfaces";
import { INetworkType } from "../../../../../../packages/neo/network";
import { IHistoryGame } from "../../../../../../packages/neo/contracts/ftw/tournament/interfaces";
import ClaimButton from "../../../components/ClaimButton";
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
      const res = await new NFTContract(network).getProperties(
        history.champion
      );
      if (res) {
        setToken(res);
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
          {history.champOwner && (
            <>
              Champ address: {history.champOwner} <br />
            </>
          )}
          Total supports: {toDecimal(history.totalBets)}GAS
          <br />
          Rollover: {toDecimal(history.rollover)}GAS
          <br />
          Total supports on champ: {toDecimal(history.betsOnChampion)}GAS
          <br />
          Champ reward: {toDecimal(history.championPrize)}GAS
          <br />
          Operation reward: {toDecimal(history.fee)}GAS
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
