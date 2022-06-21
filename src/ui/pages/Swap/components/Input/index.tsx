import React from "react";
import { FaAngleDown } from "react-icons/fa";
import NumberFormat from "react-number-format";
import { useWallet } from "../../../../../packages/provider";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import { UNKNOWN_TOKEN_IMAGE } from "../../../../../packages/neo/consts";

interface IInputProps {
  contractHash: string;
  symbol?: string;
  logo?: string;
  val?: number;
  heading?: string;
  isLoading?: boolean;
  setValue: (val?: number) => void;
  onClickAsset: () => void;
  isReadOnly?: boolean;
  userBalance?: number;
  isDisable?: boolean;
  errorMessage?: string;
  decimals?: number;
  balanceOverflow?: boolean;
}
const Input = ({
  contractHash,
  isDisable,
  symbol,
  logo,
  val,
  heading,
  setValue,
  onClickAsset,
  isLoading,
  isReadOnly,
  userBalance,
  errorMessage,
  decimals,
  balanceOverflow,
}: IInputProps) => {
  const { network } = useWallet();
  let logoIcon;
  if (logo) {
    logoIcon = logo;
  } else {
    logoIcon = ASSET_LIST[network][contractHash]
      ? ASSET_LIST[network][contractHash].logo
      : undefined;
  }

  // const noFund = userBalance && val && val > userBalance
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
                    maxWidth: "50px",
                    maxHeight: "50px",
                    width: "50px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="image is-clickable is-flex"
                >
                  <img src={logoIcon ? logoIcon : UNKNOWN_TOKEN_IMAGE} />
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
              disabled={isDisable}
              readOnly={isReadOnly}
              placeholder="0.00"
              decimalScale={decimals !== undefined ? decimals : 8}
              inputMode="decimal"
              className={`input ${balanceOverflow ? "is-danger" : ""}`}
              value={val !== undefined ? val : ""}
              allowNegative={false}
              onValueChange={(value, e) => {
                if (e.source === "event") {
                  setValue(value.floatValue);
                }
              }}
              thousandSeparator={true}
              suffix={` ${symbol ? symbol : ""}`}
              allowLeadingZeros={false}
            />
            {errorMessage ? (
              <p className="help is-danger">{errorMessage}</p>
            ) : userBalance !== undefined ? (
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
                      className={`is-size-7 ${
                        userBalance && userBalance > 0 ? "is-clickable" : ""
                      }`}
                    >
                      {userBalance ? userBalance.toLocaleString() : 0}{" "}
                      {symbol ? symbol : ""}
                    </small>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
