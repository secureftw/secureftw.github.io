import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "../../../../../components/Modal";
import AfterTransactionSubmitted from "../../../../../../packages/ui/AfterTransactionSubmitted";
import { useWallet } from "../../../../../../packages/provider";
import { useHistory, useParams } from "react-router-dom";
import { DaoContract } from "../../../../../../packages/neo/contracts/ftw/dao";
import toast from "react-hot-toast";
import moment from "moment";
import { DAO_CHANNEL_PATH } from "../../../../../../consts";
import HeaderBetween from "../../../../../components/HeaderBetween";
import { useOnChainData } from "../../../../../../common/hooks/use-onchain-data";

const Create = (props) => {
  const params = useParams();
  const history = useHistory();
  const { contractHash } = params as any;
  const { network, connectedWallet } = useWallet();
  const [title, setTile] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["Yes", "No"]);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date(Date.now() + 3600 * 1000 * 24));
  const [txid, setTxid] = useState("");
  // const [refresh, setRefresh] = useState(0);

  const handleOptionChange = (val, i) => {
    const array = [...options];
    array[i] = val;
    setOptions(array);
  };

  const handleMoreOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (i) => {
    if (options.length > 2) {
      const array = [...options];
      array.splice(i, 1);
      setOptions(array);
    }
  };

  const onSubmit = async () => {
    if (connectedWallet) {
      const res = await new DaoContract(network).createProposal(
        connectedWallet,
        contractHash,
        title,
        description,
        options,
        moment(start).valueOf(),
        moment(end).valueOf()
      );
      setTxid(res);
    } else {
      toast.error("Connect your wallet");
    }
  };

  const onSuccess = () => {
    history.push(`${DAO_CHANNEL_PATH}/${contractHash}`);
  };

  const { isLoaded, error, data } = useOnChainData(() => {
    return new DaoContract(network).getChannel(contractHash);
  }, []);

  return (
    <div className="box">
      <HeaderBetween
        path={`${DAO_CHANNEL_PATH}/${contractHash}`}
        title={"Create a new proposal"}
      />
      <hr />
	    {
		    data && <div className="notification is-info">
		      <div className="content is-small">
			      <li>You are making a new proposal of {data.symbol} channel.</li>
			      <li>You will deposit {data.minTokens}{data.symbol}.</li>
			      <li>You will get your tokens back when voting is expired.</li>
		      </div>
		    </div>
	    }
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            onChange={(e) => setTile(e.target.value)}
            className="input"
            type="text"
            value={title}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          >
            {description}
          </textarea>
        </div>
      </div>

	    <hr />

      <div className="field">
        <label className="label">Voting options</label>
        {options.map((op, i) => {
          return (
            <div key={`vop-${i}`} className="field is-horizontal">
              <div
                onClick={() => handleRemoveOption(i)}
                className="field-label is-normal"
                style={{ maxWidth: "20px" }}
              >
                {i + 1}.
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      value={op}
                      onChange={(e) => handleOptionChange(e.target.value, i)}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="field is-horizontal">
          <div
            className="field-label is-normal"
            style={{ maxWidth: "20px" }}
          ></div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <button
                  onClick={handleMoreOption}
                  className="button is-small is-light"
                >
                  Add more option
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="field">
        <label className="label">Voting period</label>

        <div className="level">
          <div className="level-left">
            <div className="level-item is-block">
              <div className="heading">Start</div>
              <DatePicker
                selected={start}
                onChange={(date) => setStart(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                minDate={start}
              />
            </div>
            <div className="level-item">
              <div className="level-item is-block">
                <label className="heading">End</label>
                <DatePicker
                  selected={end}
                  onChange={(date) => setEnd(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                  minDate={start}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <button
        disabled={!title || !description}
        onClick={onSubmit}
        className="button is-primary"
      >
        Create a proposal
      </button>

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

export default Create;
