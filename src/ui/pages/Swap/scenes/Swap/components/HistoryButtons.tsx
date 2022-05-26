import React from "react";
import ReactTooltip from "react-tooltip";
import { FaHistory, FaUserAlt } from "react-icons/fa";
interface IHistoryButtonsProps {
  onSwapHistory: (status: boolean) => void;
  onLPHistory: (status: boolean) => void;
}
const HistoryButtons = ({
  onSwapHistory,
  onLPHistory,
}: IHistoryButtonsProps) => {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <div className="buttons">
            <button
              onClick={() => onSwapHistory(true)}
              className="button is-white is-small"
              data-tip
              data-for="swapHistory"
            >
              <ReactTooltip
                id="swapHistory"
                type="info"
                effect="solid"
                place="bottom"
              >
                <span>Swap history</span>
              </ReactTooltip>
              <FaHistory />
            </button>

            <button
              onClick={() => onLPHistory(true)}
              className="button is-white is-small"
              data-tip
              data-for="LPList"
            >
              <ReactTooltip
                id="LPList"
                type="info"
                effect="solid"
                place="bottom"
              >
                <span>LP list</span>
              </ReactTooltip>
              <FaUserAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryButtons;
