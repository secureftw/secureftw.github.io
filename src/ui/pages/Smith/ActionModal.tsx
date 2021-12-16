import React, { useState } from "react";
import Modal from "../../components/Modal";
import { useWallet } from "../../../packages/provider";
import { toast } from "react-hot-toast";
import TransactionSubmitted from "../../components/TransactionSubmitted";
import NumberFormat from "react-number-format";
import { SmithContract } from "../../../packages/neo/contracts/ftw/smith";

interface IActionModal {
  onClose: () => void;
}
const ActionModal = ({ onClose }: IActionModal) => {
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [txid, setTxid] = useState<string>();
  const [values, setValues] = useState({
    name: "",
    symbol: "",
    decimals: "8",
    totalSupply: "",
    author: "",
    description: "",
  });
  const handleValueChange = (key: string, val: string) => {
    setValues({
      ...values,
      [key]: val,
    });
  };
  const onMint = async () => {
    if (connectedWallet) {
      try {
        const res = await new SmithContract(network).create(
          connectedWallet,
          values.name,
          values.symbol,
          values.decimals,
          values.totalSupply,
          values.author,
          values.description
        );
        setTxid(res);
      } catch (e) {
        console.error(e);
        // @ts-ignore
        toast.error(e.message);
      }
    } else {
      openWalletModal();
    }
  };
  return (
    <Modal onClose={onClose}>
      {txid ? (
        <TransactionSubmitted txid={txid} onClick={onClose} />
      ) : (
        <>
          <h1 className="title">NEP-17 Token Mint</h1>

          <div className="field is-grouped is-grouped-multiline">
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-dark">Deploy fee</span>
                <span className="tag is-primary">10 GAS</span>
              </div>
            </div>

            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-dark">Mint fee</span>
                <span className="tag is-primary">1 GAS</span>
              </div>
            </div>
          </div>

          <hr />
          <div className="field">
            <label className="label">Token Name</label>
            <div className="control">
              <input
                value={values.name}
                onChange={(e) => handleValueChange("name", e.target.value)}
                className="input"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Token Symbol</label>
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
            <label className="label">Token Decimals</label>
            <div className="control">
              <NumberFormat
                decimalScale={0}
                inputMode="decimal"
                className="input"
                value={values.decimals}
                onValueChange={(value) => {
                  handleValueChange("decimals", value.value);
                }}
                max={18}
                allowNegative={false}
                allowLeadingZeros={false}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Total supply</label>
            <div className="control">
              <NumberFormat
                allowNegative={false}
                decimalScale={0}
                inputMode="decimal"
                className="input"
                value={values.totalSupply}
                onValueChange={(value) => {
                  handleValueChange("totalSupply", value.value);
                }}
                allowLeadingZeros={false}
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
          <hr />
          <button
	          onClick={onMint}
            disabled={
              !values.name ||
              !values.symbol ||
              !values.decimals ||
              parseFloat(values.decimals) > 18 ||
              parseFloat(values.totalSupply) < 1 ||
              !values.author ||
              !values.description
            }
            className="button is-primary"
          >
            Mint
          </button>
        </>
      )}
    </Modal>
  );
};

export default ActionModal;
