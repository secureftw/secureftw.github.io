import React, { useEffect, useRef, useState } from "react";
import { detectEmojiInString } from "../../../Smith/helpers";
import NumberFormat from "react-number-format";
import { DaoContract } from "../../../../../packages/neo/contracts/ftw/dao";
import toast from "react-hot-toast";
import { useWallet } from "../../../../../packages/provider";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { Link, useHistory } from "react-router-dom";
import { DAO_PATH } from "../../../../../consts";
import PageLayout from "../../../../components/PageLayout";
import VerifyContract from "./VerifyContract";

interface IAddChannelProps {
  onAdd: (values) => void;
}
const CreateChannel = ({ onAdd }: IAddChannelProps) => {
  const history = useHistory();
  const { network, connectedWallet } = useWallet();
  const [txid, setTxid] = useState<string>();
  const [values, setValues] = useState({
    symbol: "",
    contractHash: "",
    minTokens: "",
    logo: "",
  });

  const hasEmoji = detectEmojiInString(values) !== 0;

  const handleValueChange = (key: string, val: string) => {
    setValues({
      ...values,
      [key]: val,
    });
  };

  const handleVerifiedContract = (contractHash: string, symbol: string) => {
    setValues({
      ...values,
      contractHash,
      symbol,
    });
  };

  const handleAddChannel = async () => {
    if (connectedWallet) {
      const manifest = JSON.stringify({
        logo: values.logo,
      });
      const txid = await new DaoContract(network).createChannel(
        connectedWallet,
        values.contractHash,
        values.minTokens,
        manifest
      );
      setTxid(txid);
    } else {
      toast.error("Connect your wallet");
    }
  };

  const handleTxSuccess = () => {
    setTxid("");
    history.push(DAO_PATH);
  };

  return (
    <PageLayout>
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <Link to={DAO_PATH} className="button is-rounded is-small mb-3">
            Back to list
          </Link>

          <div className="columns">
            <div className="column is-8">
              <div className="box is-shadowless">
                <h1 className="title is-5 is-marginless">Add a new channel</h1>
                <hr />
                {values.contractHash ? (
                  <div>
                    <div className="field">
                      <label className="label">
                        Token amount to create a proposal
                      </label>
                      <div className="control">
                        <NumberFormat
                          placeholder={values.symbol}
                          suffix={" " + values.symbol}
                          thousandSeparator={true}
                          allowNegative={false}
                          decimalScale={0}
                          inputMode="decimal"
                          className="input"
                          value={values.minTokens}
                          onValueChange={(value) => {
                            handleValueChange("minTokens", value.value);
                          }}
                          // allowLeadingZeros={false}
                        />
                      </div>
                    </div>

                    <div className="columns">
                      <div className="column">
                        <div className="field">
                          <label className="label">Logo</label>
                          <div className="control">
                            <input
                              placeholder="https://"
                              value={values.logo}
                              onChange={(e) =>
                                handleValueChange("logo", e.target.value)
                              }
                              className="input"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      disabled={
                        values.minTokens === "" || values.minTokens === "0" || !values.logo
                      }
                      onClick={handleAddChannel}
                      className="button is-primary"
                    >
                      Create a channel
                    </button>
                  </div>
                ) : (
                  <VerifyContract
                    onVerify={handleVerifiedContract}
                    network={network}
                    connectedWallet={connectedWallet}
                  />
                )}

                {txid && (
                  <Modal onClose={() => setTxid("")}>
                    <AfterTransactionSubmitted
                      network={network}
                      txid={txid}
                      onSuccess={handleTxSuccess}
                      onError={() => setTxid("")}
                    />
                  </Modal>
                )}
              </div>
            </div>

            <div className="column is-4">
              <div className="box is-shadowless content is-small">
                <li>
                  You need to be the contract owner to create DAO channel.
                </li>
                <li>
                  We automatically detect your contract ownership if your
                  contract deployed with FTWSmith.
                </li>
                <li>
                  Please contact FTW team for whitelisting if your contract
                  didn't launch by FTWSmith.
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CreateChannel;
