import React from "react";
import { useApp } from "../../common/hooks/use-app";
interface IConnectWalletButtonProps {
  className?: string;
}
const ConnectWalletButton = (props: IConnectWalletButtonProps) => {
  const { toggleWalletSidebar } = useApp();
  return (
    <button
      onClick={toggleWalletSidebar}
      className={`button is-fullwidth ${props.className ? props.className : "is-primary"}`}
    >
      Connect your wallet
    </button>
  );
};

export default ConnectWalletButton;
