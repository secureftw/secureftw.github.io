import React, { useState } from "react";
import {
  payments,
  TOTAL_TOKENS_FOR_SALE,
} from "../../../packages/neo/contracts/ftw/ido/consts";
import { useWallet } from "../../../packages/provider";
import { useOnChainData } from "../../../common/hooks/use-onchain-data";
import { IDOContract } from "../../../packages/neo/contracts/ftw/ido";
import { u } from "@cityofzion/neon-core";
import Tokenomics from "./components/Tokenomics";
import PaymentSelection from "./components/PaymentSelection";
import Modal from "../../components/Modal";
import IDOInfo from "./components/IDOInfo";
import Input from "../Swap/components/Input";
import { FaArrowDown } from "react-icons/fa";
import moment from "moment";
import AfterTransactionSubmitted from "../../../packages/ui/AfterTransactionSubmitted";
import toast from "react-hot-toast";
import { NEP_SCRIPT_HASH } from "../../../packages/neo/contracts/ftw/nep-token/consts";
import { useApp } from "../../../common/hooks/use-app";
import { LottoContract } from "../../../packages/neo/contracts/ftw/lotto";

const Main = () => {
  const { network, connectedWallet } = useWallet();
  const defaultToken = payments(network)[0];
  const [token, setToken] = useState<
    | {
        contractHash: string;
        symbol: string;
        logo: string;
        decimals: number;
        amount: number;
      }
    | undefined
  >({ ...defaultToken });
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);

  const handleExchange = async () => {
    if (connectedWallet) {
      try {
        const res = await new LottoContract(network).buy(connectedWallet);
        setTxid(res);
      } catch (e: any) {
        console.log(e);
        toast.error("An error occurred. Check console.");
      }
    }
  };

  const onSuccess = () => {
    setRefresh(refresh + 1);
    setTxid("");
  };

  return (
    <>
      <div className="block">
        <button
          onClick={() => {
            handleExchange();
          }}
          className="button is-fullwidth is-primary"
        >
          Buy
        </button>
      </div>

      <div className="box">
        <PaymentSelection
          network={network}
          onClick={(token) => {
            setToken(token);
          }}
        />
      </div>

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
