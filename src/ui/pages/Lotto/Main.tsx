import React, { useState } from "react";
import { useWallet } from "../../../packages/provider";
import { useOnChainData } from "../../../common/hooks/use-onchain-data";
import Modal from "../../components/Modal";
import AfterTransactionSubmitted from "../../../packages/ui/AfterTransactionSubmitted";
import toast from "react-hot-toast";
import { useApp } from "../../../common/hooks/use-app";
import { LottoContract } from "../../../packages/neo/contracts/ftw/lotto";
import List from "./List";
import { handleError } from "../../../packages/neo/utils/errors";

const Main = () => {
  const { toggleWalletSidebar } = useApp();
  const { network, connectedWallet } = useWallet();
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);

  const handleExchange = async () => {
    if (connectedWallet) {
      try {
        const res = await new LottoContract(network).buy(connectedWallet);
        setTxid(res);
      } catch (e: any) {
        console.log(e);
        toast.error(handleError(e));
      }
    } else {
      toggleWalletSidebar();
    }
  };

  const onSuccess = () => {
    setRefresh(refresh + 1);
    setTxid("");
  };

  const { isLoaded, data } = useOnChainData(() => {
    return new LottoContract(network).getStatus(connectedWallet);
  }, [network, connectedWallet, refresh]);

  const voted = data && data.votePrice && data.votePrice !== "100000000";
  const participated = data && data.isAddressParticipated;
  console.log(data);
  return (
    <>
      <div className="block">
        <h1 className="title has-text-centered">Sweepstake. Win 500 GAS.</h1>
        <img className="mb-2" src="assets/tery.png" />
        <div className="columns">
          <div className="column">
            <div className="box is-shadowless has-text-centered">
              <div className="heading">Ticket</div>
              <strong>Free</strong>
            </div>
          </div>
          <div className="column is-mobile">
            <div className="box is-shadowless has-text-centered">
              <div className="heading">Tickets in the pool</div>
              <strong>{data ? data.tickets : ""}</strong>
            </div>
          </div>
        </div>
        <div className="box is-shadowless">
          <p className="heading">Rules</p>
          <div className="content">
            <ul>
              <li>Make a new wallet to participate.</li>
              <li>
                Your wallet didn't participate Polaris plus quadratic funding.
              </li>
              <li>1 ticket per address.</li>
              <li>5 winners. Each 100 GAS.</li>
              <li>Drawing at 6/29/2022 6PM (UTC)</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="block">
        {isLoaded ? (
          connectedWallet && data && (voted || participated) ? (
            <div className="notification is-danger">
              Not eligible. Try a new wallet.
            </div>
          ) : (
            <button
              onClick={() => {
                handleExchange();
              }}
              className="button is-fullwidth is-primary"
            >
              Get a ticket
            </button>
          )
        ) : (
          <button className="button is-loading is-primary is-fullwidth ">
            Loading
          </button>
        )}
      </div>
      <List network={network} />
      {txid && (
        <Modal onClose={() => setTxid("")}>
          <AfterTransactionSubmitted
            txid={txid}
            network={network}
            onSuccess={onSuccess}
            onError={() => setTxid("")}
          />
        </Modal>
      )}
    </>
  );
};

export default Main;
