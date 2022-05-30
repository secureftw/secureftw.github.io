import React, { useState } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { DAO_CHANNEL_PATH } from "../../../../../../consts";
import { useWallet } from "../../../../../../packages/provider";
import { useOnChainData } from "../../../../../../common/hooks/use-onchain-data";
import { DaoContract } from "../../../../../../packages/neo/contracts/ftw/dao";
import Modal from "../../../../../components/Modal";
import NumberFormat from "react-number-format";
import toast from "react-hot-toast";
import AfterTransactionSubmitted from "../../../../../../packages/ui/AfterTransactionSubmitted";
import VoteList from "./VoteList";
import { toDecimal } from "../../../../../../packages/neo/utils";
import { u } from "@cityofzion/neon-core";

const ProposalView = () => {
  const params = useParams();
  const { contractHash, proposalNo } = params as any;
  const { network, connectedWallet } = useWallet();
  const [isVoteModalActive, setVoteModalActive] = useState(false);
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [vote, setVote] = useState({
    vote: "",
    voteIndex: "",
    amount: "",
  });

  const onVoteOptionClick = (op, i) => {
    setVote({
      vote: op,
      voteIndex: i,
      amount: vote.amount,
    });
    setVoteModalActive(true);
  };

  const handleVoteAmount = (v) => {
    setVote({
      ...vote,
      amount: v,
    });
  };

  const handleVote = async () => {
    if (connectedWallet) {
      const res = await new DaoContract(network).vote(
        connectedWallet,
        contractHash,
        proposalNo,
        vote.voteIndex,
        vote.amount
      );
      setVoteModalActive(false);
      setTxid(res);
    } else {
      toast.error("Connect your wallet");
    }
  };

  const onSuccess = () => {
    setRefresh(refresh + 1);
    setTxid("");
  };

  const { isLoaded, error, data } = useOnChainData(() => {
    return new DaoContract(network).getProposal(
      contractHash,
      proposalNo,
      connectedWallet
    );
  }, [refresh, network, connectedWallet]);

  if (!isLoaded) return <div></div>;
  if (error) return <div></div>;

  const now = moment().valueOf();
  const end = data.proposal.end;
  const isActive = now < end;
  return (
    <div className="columns">
      <div className="column is-8 is-offset-2">
        <Link
          to={`${DAO_CHANNEL_PATH}/${contractHash}`}
          className="button is-rounded is-small mb-3"
        >
          Back to list
        </Link>
        <div className="columns">
          <div className="column is-8">
            <div className="box is-shadowless">
              <div className="block">
                <div className="media">
                  <div className="media-content">
                    <h5 className="title is-5">
                      #{data.proposal.no} {data.proposal.title}
                    </h5>
                  </div>
                  <div className="media-right">
                    <div
                      className={`tag ${isActive ? "is-success" : "is-light"}`}
                    >
                      {isActive ? "Active" : "End"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="block">
                <p>{data.proposal.description}</p>
              </div>
            </div>
            <div className="box is-shadowless">
              {data.proposal.options.map((op, i) => {
                return (
                  <div
                    key={`op-btn--${i}`}
                    className={
                      data.proposal.options.length - 1 !== i ? "mb-2" : ""
                    }
                    onClick={() => {
                      onVoteOptionClick(op, i);
                    }}
                  >
                    <button
                      disabled={!isActive}
                      className="button is-fullwidth is-rounded"
                    >
                      {op}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="box is-shadowless">
              <VoteList
                contractHash={contractHash}
                symbol={data.channel.symbol}
                decimals={data.channel.decimals}
                proposalNo={proposalNo}
                network={network}
                options={data.proposal.options}
              />
            </div>
          </div>

          <div className="column is-4">
            <div className="box is-shadowless">
              <div className="content">
                <strong>Start date</strong>
                <br />
                <small>{moment(data.proposal.start).format("LLL")}</small>
                <br />
                <strong>End date</strong>
                <br />
                <small>{moment(data.proposal.end).format("LLL")}</small>
                <br />
              </div>
              <hr />
              <div>
                {data.proposal.options.map((op, i) => {
                  const percent =
                    (data.proposal[`option${i}`] / data.proposal.totalVotes) *
                    100;

                  const voteAmount = u.BigInteger.fromNumber(
                    data.proposal[`option${i}`]
                  ).toDecimal(data.decimals);

                  return (
                    <div key={`option-${i}`} className="mb-3">
                      <div className="level is-marginless">
                        <div className="level-left">
                          <div className="level-item">{op}</div>
                        </div>
                        <div className="level-right">
                          <div className="level-item">
                            {parseFloat(voteAmount)} {data.channel.symbol}
                          </div>
                        </div>
                      </div>
                      <progress
                        className="progress is-info"
                        value={percent}
                        max="100"
                      >
                        {percent}%
                      </progress>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isVoteModalActive && (
        <Modal onClose={() => setVoteModalActive(false)}>
          <div>
            <h1 className="title is-5">You are voting: {vote.vote}</h1>
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
                  value={vote.amount}
                  onValueChange={(value) => {
                    handleVoteAmount(value.value);
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
                      {data.balance} {data.channel.symbol}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <button
              disabled={
                vote.amount === "" ||
                vote.amount === "0" ||
                parseFloat(vote.amount) > data.balance
              }
              onClick={handleVote}
              className="button is-primary"
            >
              Vote
            </button>
          </div>
        </Modal>
      )}

      {txid && (
        <Modal onClose={() => setTxid("")}>
          <AfterTransactionSubmitted
            txid={txid}
            network={network}
            onSuccess={onSuccess}
            onError={() => setTxid("")}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProposalView;
