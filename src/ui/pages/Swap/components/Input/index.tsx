import React from "react";
// tslint:disable-next-line:no-submodule-imports
import { FaAngleDown, FaQuestionCircle } from "react-icons/all";
import NumberFormat from "react-number-format";

interface IInputProps {
  asset?: {
    symbol: string;
    logo: string;
  };
  val: string;
  heading?: string;
  isLoading?: boolean;
  setValue: (val: string, e: any) => void;
  onClickAsset: () => void;
  isReadOnly?: boolean;
  userBalance?: string;
}
const Input = ({
  asset,
  val,
  heading,
  setValue,
  onClickAsset,
  isLoading,
  isReadOnly,
  userBalance,
}: IInputProps) => {
  return (
    <div className="">
      <div className="columns">
        <div className="column is-narrow">
          <div style={{ width: "150px" }}>
            <div
              className="media"
              style={{ alignItems: "center", display: "flex" }}
            >
              <div className="media-left">
                <div
                  onClick={onClickAsset}
                  style={{
                    width: "50px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="image is-clickable is-flex"
                >
                  {asset ? (
                    <img src={asset.logo} />
                  ) : (
                    <FaQuestionCircle size={35} />
                  )}
                </div>
              </div>
              <div
                onClick={onClickAsset}
                className="media-content is-clickable"
              >
                {heading && <p className="heading">{heading}</p>}
                <div style={{ alignItems: "center", display: "flex" }}>
                  <span className="has-text-weight-bold">
                    {asset ? asset.symbol : "Select"}
                  </span>
                  <span className="icon">
                    <FaAngleDown />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className={`control ${isLoading ? "is-loading" : ""}`}>
            <NumberFormat
              readOnly={isReadOnly}
              // ref={this.props, inputRef}
              // decimalScale={0}
              inputMode="decimal"
              className="input"
              value={val}
              onValueChange={(value, e) => {
                if (e.source === "event") {
                  setValue(value.value, e.event);
                }
              }}
              thousandSeparator={true}
              suffix={asset ? " " + asset.symbol : ""}
              allowLeadingZeros={false}
              // format={(val) => {} }
            />
            {userBalance ? (
              <div className="level">
                <div className="level-left">
                  <small className="is-size-7">
                    <div className="level-item">Balance</div>
                  </small>
                </div>

                <div className="level-right">
                  <div className="level-item">
                    <small className="is-size-7">
                      {userBalance} {asset && asset.symbol}
                    </small>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
