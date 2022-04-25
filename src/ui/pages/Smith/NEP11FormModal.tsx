import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import { useWallet } from "../../../packages/provider";
import { toast } from "react-hot-toast";
import { SmithContract } from "../../../packages/neo/contracts/ftw/smith";
import { DEPLOY_FEE } from "../../../packages/neo/contracts/ftw/smith/consts";
import { detectEmojiInString } from "./helpers";
import AfterTransactionSubmitted from "../../../packages/ui/AfterTransactionSubmitted";
import { balanceCheck } from "../../../packages/neo/utils";
import SmithModalHeader from "./components/Header";

interface IActionModal {
  onClose: () => void;
}
const NEP11FormModal = ({ onClose }: IActionModal) => {
  const { network, connectedWallet } = useWallet();
  const [txid, setTxid] = useState<string>();
  const [values, setValues] = useState({
    name: "",
    symbol: "",
    author: "",
    description: "",
    email: "",
  });
  const hasEmoji = detectEmojiInString(values) !== 0;
  const handleValueChange = (key: string, val: string) => {
    setValues({
      ...values,
      [key]: val,
    });
  };
  const onMint = async () => {
    if (hasEmoji) {
      toast.error(
        "Emoji is not supported yet. Please remove emojis and try again."
      );
    } else {
      if (connectedWallet) {
        if (balanceCheck(connectedWallet.balances, 20)) {
          try {
            const res = await new SmithContract(network).createNEP11(
              connectedWallet,
              values.name,
              values.symbol,
              values.author,
              values.description,
              values.email
            );
            setTxid(res);
          } catch (e: any) {
            toast.error(e.message);
          }
        } else {
          toast.error("You must have more than 20 GAS.");
        }
      } else {
        toast.error("Please connect wallet.");
      }
    }
  };
  const firstInput = useRef(null);

  useEffect(() => {
    // @ts-ignore
    firstInput.current.focus();
  }, []);

  return (
    <Modal onClose={onClose}>
      {txid ? (
        <AfterTransactionSubmitted
          network={network}
          txid={txid}
          onSuccess={onClose}
          onError={() => setTxid("")}
        />
      ) : (
        <>
          <SmithModalHeader title={"NFT Smart Contract"} />
          <hr />
          <div className="field">
            <label className="label">NFT Contract Name</label>
            <div className="control">
              <input
                ref={firstInput}
                value={values.name}
                onChange={(e) => handleValueChange("name", e.target.value)}
                className="input"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">NFT Symbol</label>
            <div className="control">
              <input
                value={values.symbol}
                onChange={(e) => handleValueChange("symbol", e.target.value)}
                className="input"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Author</label>
            <div className="control">
              <input
                value={values.author}
                onChange={(e) => handleValueChange("author", e.target.value)}
                className="input"
                type="text"
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
            <label className="label">Email</label>
            <div className="control">
              <input
                value={values.email}
                onChange={(e) => handleValueChange("email", e.target.value)}
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
              !values.name ||
              !values.symbol ||
              !values.author ||
              !values.description ||
              !values.email ||
              hasEmoji
            }
            className="button is-primary"
          >
            Create
          </button>
        </>
      )}
    </Modal>
  );
};

export default NEP11FormModal;
