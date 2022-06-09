import React from "react";
import Modal from "../../../../../../components/Modal";
import NumberFormat from "react-number-format";
import { IProposal } from "../../../../../../../packages/neo/contracts/ftw/dao/interfaces";
import { parseEnum } from "@cityofzion/neon-core/lib/internal";
import { withDecimal } from "../../../../../../../packages/neo/utils";
interface IVoteModalProps {
  onClose: () => void;
  data: IProposal;
  voteObj: {
    vote: string;
    amount: string;
    voteIndex: string;
  };
  onVoteAmountChange: (val: string) => void;
  onVoteSubmit: () => void;
}
const VoteModal = ({
  onClose,
  data,
  voteObj,
  onVoteSubmit,
  onVoteAmountChange,
}: IVoteModalProps) => {
  const balanceWithDecimal =
  data.balance > 0
    ? parseFloat(withDecimal(data.balance, data.channel.decimals))
    : 0;
  return (
    <Modal onClose={onClose}>
      <div>
        <h1 className="title is-5">You are voting: {voteObj.vote}</h1>
        <div className="notification is-info">
          <div className="content">
            You can withdraw your tokens back when proposal expires.
          </div>
        </div>
        <div className="field">
          <label className="label">Vote Amount</label>
          <div className="control">
            <NumberFormat
              allowLeadingZeros={false}
              suffix={" " + data.channel.symbol}
              thousandSeparator={true}
              allowNegative={false}
              decimalScale={0}
              inputMode="decimal"
              className="input"
              placeholder={`${data.channel.symbol}`}
              value={voteObj.amount}
              onValueChange={(value) => {
                onVoteAmountChange(value.value);
              }}
            />
          </div>
          <div className="level is-mobile mt-1">
            <div className="level-left">
              <div className="level-item">
                <small className="is-size-7">Your balance</small>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <small>
                  {balanceWithDecimal} {data.channel.symbol}
                </small>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <button
          disabled={
            voteObj.amount === "" ||
            voteObj.amount === "0" ||
            parseFloat(voteObj.amount) > balanceWithDecimal
          }
          onClick={onVoteSubmit}
          className="button is-primary"
        >
          Vote
        </button>
      </div>
    </Modal>
  );
};

export default VoteModal;
