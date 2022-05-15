import React from "react";
interface IErrorNotificationWithRefreshProps {
  error: string;
  onRefresh: () => void;
}
const ErrorNotificationWithRefresh = ({
  error,
  onRefresh,
}: IErrorNotificationWithRefreshProps) => {
  return (
    <div className="notification is-warning">
      <strong>Failed to load data</strong>
      <br />
      {error}
      <br />
      <br />
      <button
        onClick={onRefresh}
        className="button is-warning is-outlined is-inverted"
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorNotificationWithRefresh;
