import React from "react";
import Countdown from "react-countdown";

interface ISnapshotCountdownProps {
  timeLeft: number;
  onCreateSnapshot: () => void;
}
const SnapshotCountdown = ({
  timeLeft,
  onCreateSnapshot,
}: ISnapshotCountdownProps) => {
  const CreateSnapshotBtn = () => (
    <button onClick={onCreateSnapshot} className="button is-button is-primary">
      Creat snapshot
    </button>
  );
  if (timeLeft < 1) {
    return <CreateSnapshotBtn />;
  }
  return (
    <Countdown
      date={Date.now() + timeLeft}
      renderer={(props) => {
        if (props.completed) {
          return <CreateSnapshotBtn />;
        } else {
          return (
            <span>
              {props.hours}:{props.minutes}:{props.seconds}
            </span>
          );
        }
      }}
    />
  );
};

export default SnapshotCountdown;
