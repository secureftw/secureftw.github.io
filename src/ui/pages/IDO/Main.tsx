import React, { useState } from "react";
import {
  LAUNCH_AT,
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
import { NEP_SCRIPT_HASH } from "../../../packages/neo/contracts";
import { MAINNET } from "../../../packages/neo/consts";

const Main = () => {
  const { network, connectedWallet } = useWallet();
  const [token, setToken] = useState<{
    contractHash: string;
    symbol: string;
    logo: string;
    decimals: number;
    amount: number;
  }>();
  const [amount, setAmount] = useState<number | undefined>();
  const [txid, setTxid] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [isTokenSelectionModalActive, setTokenSelectionModalActive] =
    useState(false);

  const onTokenClick = (token) => {
    if (network === MAINNET) {
      alert(
        `Mainnet IDO is at ${moment.unix(LAUNCH_AT).utc().format("llll")} UTC`
      );
    } else {
      setToken(token);
      setTokenSelectionModalActive(false);
    }
  };

  const handleExchange = async () => {
    if (connectedWallet && amount && token) {
      try {
        const res = await new IDOContract(network).buy(
          connectedWallet,
          token.contractHash,
          token.decimals,
          amount
        );
        setTxid(res);
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  };

  const onSuccess = () => {
    setToken(undefined);
    setRefresh(refresh + 1);
    setTxid("");
  };
	//
  // const { isLoaded, error, data } = useOnChainData(() => {
  //   return new IDOContract(network).getIDOStatus(connectedWallet);
  // }, [network, connectedWallet, refresh]);
	//
  // if (!isLoaded) return <div></div>;
	//
  // const totalTokens = u.BigInteger.fromDecimal(TOTAL_TOKENS_FOR_SALE, 8);
  // const totalSales = totalTokens.sub(data.available);
  // const totalSalesInPercentage = totalSales.div(totalTokens).mul(100);
	//
  // const userBalanceForSwap =
  //   token &&
  //   data.balances[token.contractHash] &&
  //   data.balances[token.contractHash] !== 0
  //     ? parseFloat(
  //         withDecimal(data.balances[token.contractHash], token.decimals)
  //       )
  //     : 0;

  // const nowMs = moment().valueOf();

  return (
    <>
      <IDOInfo
        isSwapActive={!!token}
        totalSales={"0"}
        // totalSales={parseFloat(totalSales.toDecimal(8)).toLocaleString()}
        totalSalesInPercentage={0}
        // totalSalesInPercentage={parseFloat(totalSalesInPercentage.toString())}
        onClick={() => setTokenSelectionModalActive(true)}
      />

      {token ? (
        <div className="box">
          <div className="block">
            <Input
              isDisable={false}
              heading="Send"
              onClickAsset={() => {
                setTokenSelectionModalActive(true);
              }}
              contractHash={token.contractHash}
              symbol={token.symbol}
              decimals={token.decimals}
              val={amount}
              setValue={(value) => {
                setAmount(value);
              }}
              logo={token.logo}
              // userBalance={userBalanceForSwap}
            />
            <div className="pt-4 pb-4 has-text-centered">
              <FaArrowDown size={16} />
            </div>
            <Input
              isReadOnly={true}
              heading="Receive"
              onClickAsset={() => {
                setTokenSelectionModalActive(true);
              }}
              contractHash={NEP_SCRIPT_HASH[network]}
              symbol={"NEP"}
              logo={"/symbols/nep.png"}
              decimals={8}
              val={amount ? amount * token.amount : undefined}
              setValue={() => {}}
              userBalance={undefined}
            />
          </div>
          <div className="block">
            {/*<button*/}
            {/*  onClick={handleExchange}*/}
            {/*  disabled={amount === undefined || amount > userBalanceForSwap}*/}
            {/*  className="button is-fullwidth is-primary"*/}
            {/*>*/}
            {/*  Swap*/}
            {/*</button>*/}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="box">
        <PaymentSelection network={network} onClick={() => {}} />
      </div>

      <Tokenomics />

      {isTokenSelectionModalActive && (
        <Modal onClose={() => setTokenSelectionModalActive(false)}>
          <>
            <PaymentSelection
              currentTokenHash={token ? token.contractHash : undefined}
              network={network}
              onClick={onTokenClick}
            />
          </>
        </Modal>
      )}

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
