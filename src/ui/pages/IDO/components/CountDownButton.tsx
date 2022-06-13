import React from "react";
import ConnectWalletButton from "../../../components/ConnectWalletButton";
import { toast } from "react-hot-toast";
import { useApp } from "../../../../common/hooks/use-app";

const CountDownButton = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  connectedWallet,
  onClick,
}) => {
  const { toggleWalletSidebar } = useApp();
  return (
    <button
      onClick={() => {
        if (completed) {
          if (connectedWallet) {
            toggleWalletSidebar();
          } else {
            onClick();
          }
        } else {
          toast.error("Launched yet");
        }
      }}
      // disabled={amount === undefined || amount > userBalanceForSwap}
      className="button is-fullwidth is-primary"
    >
      {completed
        ? "Swap"
        : `${days} Day : ${hours} Hour : ${minutes} Min : ${seconds} Sec`}
    </button>
  );
};

export default CountDownButton;
