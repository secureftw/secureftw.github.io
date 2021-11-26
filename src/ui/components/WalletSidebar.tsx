import React from "react";
import SideNav from "react-simple-sidenav";
import { useApp } from "../../common/hooks/use-app";
import Wallet from "../../packages/ui/Wallet";
import { useWallet } from "../../packages/provider";

const WalletSidebar = () => {
  const { walletSidebarStatus, toggleWalletSidebar } = useApp();
  const { connectedWallet } = useWallet();
  if (connectedWallet) return <div></div>;
  return (
    <SideNav
      openFromRight={true}
      style={{ top: "52px" }}
      // navStyle={{ width: "80%" }}
      showNav={walletSidebarStatus}
      onHideNav={toggleWalletSidebar}
      children={<Wallet />}
    />
  );
};

export default WalletSidebar;
