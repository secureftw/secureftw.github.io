import React, { useState } from "react";
import { useWallet } from "../../../../../packages/provider";
import { detectEmojiInString } from "../../../Smith/helpers";
import { toast } from "react-hot-toast";
import { balanceCheck } from "../../../../../packages/neo/utils";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import Modal from "../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { DEPLOY_FEE } from "../../../../../packages/neo/contracts/ftw/smith/consts";
import NumberFormat from "react-number-format";
import { IncubatorContract } from "../../../../../packages/neo/contracts/ftw/incubator";

const Form = (props) => {
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [txid, setTxid] = useState<string>();
  const [values, setValues] = useState({
    tokenHash: "",
    amount: "",
    description: "",
    website: "",
  });
  const handleValueChange = (key: string, val: string) => {
    setValues({
      ...values,
      [key]: val,
    });
  };
  const hasEmoji = detectEmojiInString(values) !== 0;
  const onMint = async () => {
    if (hasEmoji) {
      toast.error(
        "Emoji is not supported yet. Please remove emojis and try again."
      );
    } else {
      if (connectedWallet) {
        try {
        	console.log(values)
          const res = await new IncubatorContract(network).createPool(
            connectedWallet,
            values.tokenHash,
            values.amount,
            values.website,
            values.description
          );
          setTxid(res);
        } catch (e: any) {
          toast.error(e.message);
        }
      } else {
        toast.error("Please connect wallet.");
      }
    }
  };
  return (
    <div className="box">
      {txid ? (
        <AfterTransactionSubmitted
          network={network}
          txid={txid}
          onSuccess={() => setTxid("")}
          onError={() => setTxid("")}
        />
      ) : (
        <>
          <h1 className="title">Create a pool</h1>
          <div className="content">
            Please read
            <ul>
              <li>Please do not use EMOJI or Unicode.</li>
            </ul>
          </div>
          <hr />
          <div className="field">
            <label className="label">Token hash</label>
            <div className="control">
              <input
                value={values.tokenHash}
                onChange={(e) => handleValueChange("tokenHash", e.target.value)}
                className="input"
                type="text"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Amount</label>
            <div className="control">
              <NumberFormat
                allowNegative={false}
                decimalScale={0}
                inputMode="decimal"
                className="input"
                value={values.amount}
                onValueChange={(value) => {
                  handleValueChange("amount", value.value);
                }}
                allowLeadingZeros={false}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                value={values.description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
                className="input"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Website</label>
            <div className="control">
              <input
                value={values.website}
                onChange={(e) => handleValueChange("website", e.target.value)}
                className="input"
                type="text"
              />
            </div>
          </div>
          <hr />
          {hasEmoji && (
            <div className="notification is-danger">
              Emoji is not supported yet.
            </div>
          )}
          <button
            onClick={onMint}
            disabled={
              !values.tokenHash ||
              !values.amount ||
              !values.website ||
              !values.description ||
              hasEmoji
            }
            className="button is-primary"
          >
            Create
          </button>
        </>
      )}
    </div>
  );
};

export default Form;
