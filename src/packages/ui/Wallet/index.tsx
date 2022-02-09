import React from "react";
import { utils } from "../../neo";
import WalletDropdown from "./WalletDropdown";
import WalletList from "./WalletList";
import AssetCard from "./AssetCard";
import { useWallet } from "../../provider";

const Wallet = (props) => {
  const { connectedWallet } = useWallet();
  return (
    <>
      <header className="level is-mobile p-3 is-marginless">
        <div className="level-left">
          <div className="level-item">
            <WalletDropdown />
          </div>
        </div>
        {connectedWallet && (
          <div className="level-right">
            <div className="level-item">
              <small>
                {utils.truncateAddress(connectedWallet.account.address)}
              </small>
            </div>
          </div>
        )}
      </header>
      <hr className="m-0" />
      <section className="p-5">
        {connectedWallet ? (
          <>
            <div>
              {connectedWallet &&
                connectedWallet.balances.map((balance) => {
                  return <AssetCard key={balance.symbol} {...balance} />;
                })}
            </div>
          </>
        ) : (
          <WalletList />
        )}
      </section>
    </>
  );
};

export default Wallet;
