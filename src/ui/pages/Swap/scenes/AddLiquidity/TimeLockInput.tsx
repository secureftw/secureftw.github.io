import React from "react";
import Switch from "react-switch";
import DatePicker from "react-datepicker";
interface ITimeLockInputProps {
  toggleSwitch: () => void;
  isActive: boolean;
  lockUntil: Date;
  setLockUntil: (date: Date) => void;
}
const TimeLockInput = ({
  toggleSwitch,
  isActive,
  lockUntil,
  setLockUntil,
}: ITimeLockInputProps) => {
  return (
    <>
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <label style={{ display: "flex", alignItems: "center" }}>
              <span className="mr-3">Lock liquidity</span>
              <Switch onChange={toggleSwitch} checked={isActive} />
            </label>
          </div>
        </div>
        {isActive && (
          <div className="level-right">
            <div className="level-item">
              <DatePicker
                selected={lockUntil}
                onChange={(date) => setLockUntil(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                minDate={lockUntil}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TimeLockInput;
