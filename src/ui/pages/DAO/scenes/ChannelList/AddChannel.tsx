import React, { useEffect, useRef, useState } from "react";
import { detectEmojiInString } from "../../../Smith/helpers";
import NumberFormat from "react-number-format";

interface IAddChannelProps {
  onAdd: (values) => void;
}
const AddChannel = ({ onAdd }: IAddChannelProps) => {
  const [values, setValues] = useState({
    contractHash: "d2a4cff31913016155e38e474a2c06d08be276cf",
    logo: "logo",
    // website: "",
    minTokens: "",
  });
  const hasEmoji = detectEmojiInString(values) !== 0;
  const handleValueChange = (key: string, val: string) => {
    setValues({
      ...values,
      [key]: val,
    });
  };
  const handleOnAdd = () => {
    onAdd(values);
  };

  const firstInput = useRef(null);

  useEffect(() => {
    // @ts-ignore
    firstInput.current.focus();
  }, []);

  return (
    <div>
      <h1 className="title is-5 is-marginless">Add a new channel</h1>
      <hr />
      <div className="field">
        <label className="label">Contract Hash</label>
        <div className="control">
          <input
            ref={firstInput}
            value={values.contractHash}
            onChange={(e) => handleValueChange("contractHash", e.target.value)}
            className="input"
            type="text"
          />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Logo Url</label>
            <div className="control">
              <input
                value={values.logo}
                onChange={(e) => handleValueChange("logo", e.target.value)}
                className="input"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Min tokens for proposals</label>
        <div className="control">
          <NumberFormat
            thousandSeparator={true}
            allowNegative={false}
            decimalScale={0}
            inputMode="decimal"
            className="input"
            value={values.minTokens}
            onValueChange={(value) => {
              handleValueChange("minTokens", value.value);
            }}
            allowLeadingZeros={false}
          />
        </div>
      </div>

      <button onClick={handleOnAdd} className="button is-primary">
        Create a channel
      </button>
    </div>
  );
};

export default AddChannel;
