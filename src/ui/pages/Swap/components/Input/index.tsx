import React, { useEffect, useState } from "react";
// tslint:disable-next-line:no-submodule-imports
import { FaAngleDown, FaQuestionCircle } from "react-icons/all";
import NumberFormat from "react-number-format";
import { useWallet } from "../../../../../packages/provider";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import { SwapContract } from "../../../../../packages/neo/contracts";

interface IInputProps {
  contractHash: string;
  symbol: string;
  val: string;
  heading?: string;
  isLoading?: boolean;
  setValue: (val: string, e: any) => void;
  onClickAsset: () => void;
  isReadOnly?: boolean;
  userBalance?: number;
}
const Input = ({
  contractHash,
  symbol,
  val,
  heading,
  setValue,
  onClickAsset,
  isLoading,
  isReadOnly,
  userBalance,
}: IInputProps) => {
  const { network } = useWallet();
  const logo = ASSET_LIST[network][contractHash]
    ? ASSET_LIST[network][contractHash].logo
    : undefined;
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
                  {logo ? <img src={logo} /> : <FaQuestionCircle size={35} />}
                </div>
              </div>
              <div
                onClick={onClickAsset}
                className="media-content is-clickable"
              >
                {heading && <p className="heading">{heading}</p>}
                <div style={{ alignItems: "center", display: "flex" }}>
                  <span className="has-text-weight-bold">
                    {symbol ? symbol : "Select"}
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
              suffix={" " + symbol}
              allowLeadingZeros={false}
              // format={(val) => {} }
            />
            <div className="level is-mobile mt-1">
              <div className="level-left">
                <div className="level-item">
                  <small className="is-size-7">Your balance</small>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <small
                    onClick={(e) => {
                      if (userBalance) {
                        // @ts-ignore
                        setValue(userBalance, e);
                      }
                    }}
                    className={`is-size-7 ${userBalance ? "is-clickable" : ""}`}
                  >
                    {userBalance ? userBalance : 0} {symbol}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
