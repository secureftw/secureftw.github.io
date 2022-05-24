import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../../components/Modal";
import { useWallet } from "../../../../../packages/provider";
import { toast } from "react-hot-toast";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import { detectEmojiInString } from "../../helpers";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { balanceCheck } from "../../../../../packages/neo/utils";
import { useHistory } from "react-router-dom";
import { SMITH_PATH_NEP11 } from "../../../../../consts";
import PageLayout from "../../../../components/PageLayout";

const NEP11FormModal = () => {
  const history = useHistory();
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

  const onSuccess = () => {
    setTxid("");
    history.push(SMITH_PATH_NEP11);
  };

  const firstInput = useRef(null);

  useEffect(() => {
    // @ts-ignore
    firstInput.current.focus();
  }, []);

  return (
    <>
      <PageLayout>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="columns">
              <div className="column is-8">
                <div className="box is-shadowless">
                  <h1 className="title is-4">NFT Contract</h1>
                  <p className="subtitle is-6">
                    Create your NFT smart contract
                  </p>
                  <hr />
                  <div className="field">
                    <label className="label">NFT Contract Name</label>
                    <div className="control">
                      <input
                        placeholder="My bored club"
                        ref={firstInput}
                        value={values.name}
                        onChange={(e) =>
                          handleValueChange("name", e.target.value)
                        }
                        className="input"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">NFT Symbol</label>
                    <div className="control">
                      <input
                        placeholder="MYNFT"
                        value={values.symbol}
                        onChange={(e) =>
                          handleValueChange("symbol", e.target.value)
                        }
                        className="input"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Author</label>
                        <div className="control">
                          <input
                            placeholder="Optional"
                            value={values.author}
                            onChange={(e) =>
                              handleValueChange("author", e.target.value)
                            }
                            className="input"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                          <input
                            placeholder="Optional"
                            value={values.email}
                            onChange={(e) =>
                              handleValueChange("email", e.target.value)
                            }
                            className="input"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <input
                        placeholder="Optional"
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
                      // !values.author ||
                      // !values.description ||
                      // !values.email ||
                      hasEmoji
                    }
                    className="button is-primary"
                  >
                    Create
                  </button>
                </div>
              </div>
              <div className="column is-4">
                <div className="box is-shadowless content is-small">
                  <li>
                    We recommend to mint on <strong>Testnet</strong> first
                    before you mint on <strong>Mainnet</strong>.
                  </li>
                  <li>
                    Do not use <strong>EMOJI</strong> or{" "}
                    <strong>Unicode</strong>.
                  </li>
                  <li>
                    Deploy fee is <strong>10 GAS</strong>.
                  </li>
                  <li>
                    You will be able to mint your NFTs in your contract page
                    after deployment.
                  </li>
                  <li>
                    Check contract source code at{" "}
                    <a
                      target="_blank"
                      href={
                        "https://github.com/ForTheWinn/public-contracts/blob/main/FTWSmithNep11/FTWSmithNep11.cs"
                      }
                    >
                      here
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
      {txid && (
        <Modal onClose={() => setTxid("")}>
          <AfterTransactionSubmitted
            network={network}
            txid={txid}
            onSuccess={onSuccess}
            onError={() => setTxid("")}
          />
        </Modal>
      )}
    </>
  );
};

export default NEP11FormModal;
