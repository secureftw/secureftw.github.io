import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../../../../components/Modal";
import PageLayout from "../../../../components/PageLayout";
import AddChannel from "./AddChannel";
import AfterTransactionSubmitted from "../../../../../packages/ui/AfterTransactionSubmitted";
import { useWallet } from "../../../../../packages/provider";
import { DaoContract } from "../../../../../packages/neo/contracts/ftw/dao";
import toast from "react-hot-toast";

const DAOChannelList = (props) => {
  const { network, connectedWallet } = useWallet();
  const [isAddModalActive, setAddModalActive] = useState(true);
  const [txid, setTxid] = useState<string>();
  const [refresh, setRefresh] = useState(1);

  const handleAddChannel = async (values) => {
    if (connectedWallet) {
      const txid = await new DaoContract(network).createChannel(
        connectedWallet,
        values.contractHash,
        values.minTokens,
        ""
      );
      setAddModalActive(false);
      setTxid(txid);
    } else {
      toast.error("Connect your wallet");
    }
  };

  const handleTxSuccess = () => {
    setRefresh(refresh + 1);
    setTxid("");
  };
  return (
    <PageLayout>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box is-shadowless">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h1 className="title is-5 is-marginless">Channels</h1>
                </div>
              </div>

              <div className="level-right">
                <div className="level-item">
                  <button
                    onClick={() => setAddModalActive(true)}
                    className="button is-white"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAddModalActive && (
        <Modal onClose={() => setAddModalActive(false)}>
          <AddChannel onAdd={handleAddChannel} />
        </Modal>
      )}
      {txid && (
        <AfterTransactionSubmitted
          network={network}
          txid={txid}
          onSuccess={handleTxSuccess}
          onError={() => setTxid("")}
        />
      )}
    </PageLayout>
  );
};

export default DAOChannelList;
