import React, { useState } from "react";
import Modal from "../../components/Modal";
import NumberFormat from "react-number-format";
import { FarmContract } from "../../../packages/neo/contracts";
import { useWallet } from "../../../packages/provider";
import { toast } from "react-hot-toast";
import TransactionSubmitted from "../../components/TransactionSubmitted";
import _ from "underscore";
interface IActionModal {
  range: string;
  onClose: () => void;
}
const ActionModal = ({ range, onClose }: IActionModal) => {
  const [amount, setAmount] = useState("");
  const [position, setPosition] = useState("");
  const { network, connectedWallet, openWalletModal } = useWallet();
  const [txid, setTxid] = useState<string>();
  const onDeposit = async () => {
    if (connectedWallet) {
      try {
        const res = await new FarmContract(network).deposit(
          connectedWallet,
          amount,
          position
        );
        setTxid(res);
      } catch (e) {
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
          <h1 className="title is-flex">
            {/*<img src={"/neo_512_512.svg"} />*/}
            Deposit NEO
          </h1>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Your position</label>
                <div className="select is-fullwidth">
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="">Select your position</option>
                    {_.range(0, range).map((i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Amount</label>
                <NumberFormat
                  autoFocus={true}
                  // ref={this.props, inputRef}
                  decimalScale={0}
                  inputMode="decimal"
                  className="input"
                  value={amount}
                  onValueChange={(value) => {
                    setAmount(value.value);
                  }}
                  thousandSeparator={true}
                  suffix={" NEO"}
                  allowLeadingZeros={false}
                />
              </div>
            </div>
          </div>
          <button
            onClick={onDeposit}
            disabled={!position || !amount || parseFloat(amount) < 1}
            className="button is-button is-black"
          >
            Deposit
          </button>
        </>
      )}
    </Modal>
  );
};

export default ActionModal;
