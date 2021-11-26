import React from "react";

const NotifyError = ({ msg, onClose }) => {
  if (!msg) return <></>;
  return (
    <div className="notification is-danger">
      <button onClick={onClose} className="delete" />
      {msg}
    </div>
  );
};

export default NotifyError;
