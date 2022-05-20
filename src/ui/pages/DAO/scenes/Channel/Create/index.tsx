import React, { useState } from "react";
import DatePicker from "react-datepicker";

const Create = (props) => {
  const [lockUntil, setUntil] = useState(new Date());
  const [title, setTile] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["Yes", "No"]);
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
  return (
    <div>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            onChange={(e) => setTile(e.target.value)}
            className="input"
            type="text"
            placeholder="Text input"
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
            placeholder="Textarea"
          >
            {description}
          </textarea>
        </div>
      </div>

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

      <div className="field">
        <label className="label">Voting period</label>

        <div className="level">
          <div className="level-left">
            <div className="level-item is-block">
              <div className="heading">Start</div>
              <DatePicker
                selected={lockUntil}
                onChange={(date) => setUntil(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                minDate={lockUntil}
              />
            </div>
          </div>

          <div className="level-right">
            <div className="level-item">
              <div className="level-item is-block">
                <label className="heading">End</label>
                <DatePicker
                  selected={lockUntil}
                  onChange={(date) => setUntil(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                  minDate={lockUntil}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <button className="button is-primary">Create a proposal</button>
    </div>
  );
};

export default Create;
