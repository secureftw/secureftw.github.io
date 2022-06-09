import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import ActionModal from "./ActionModal";
import { useWallet } from "../../../packages/provider";
import { FarmContract } from "../../../packages/neo/contracts";
import { IFarmContractStatus } from "../../../packages/neo/contracts/ftw/gas-fi/interfaces";
import toast from "react-hot-toast";
import SnapshotList from "./SnapshotList";
import NotifyError from "../../components/NotifyError";
import Pool from "./Pool";
import CancelModal from "./CancelModal";
import ClaimModal from "./ClaimModal";
import Claims from "./Claims";
import PositionModal from "./PositionModal";
import About from "./About";
import { TESTNET } from "../../../packages/neo/consts";

const Farm = () => {
  // let location = useLocation();
  const production = [TESTNET];
  const [route, setRoute] = useState("POOL");
  const [modalActive, setModalActive] = useState(false);
  const [cancelModalActive, setCancelModalActive] = useState(false);
  const [claimModalActive, setClaimModalActive] = useState(false);
  const [positionModalActive, setPositionModalActive] = useState(false);
  const [error, setError] = useState("");
  const [contractStatus, setContractStatus] = useState<IFarmContractStatus>();
  const onActive = () => {
    if (connectedWallet) {
      setModalActive(true);
    } else {
      toast.error("Please connect wallet.");
    }
  };
  const onCancelModalActive = () => setCancelModalActive(true);
  const onClaimModalActive = () => setClaimModalActive(true);
  const onPositionChange = () => setPositionModalActive(true);
  const { connectedWallet, network } = useWallet();
  useEffect(() => {
    async function fetchContractStatus() {
      setError("");
      try {
        const res = await new FarmContract(network).getStatus(connectedWallet);
        setContractStatus(res);
      } catch (e: any) {
        setError(e.message);
      }
    }
    fetchContractStatus();
  }, [connectedWallet, route]);
  if (!production.includes(network))
    return (
      <PageLayout>This smart contract is not support in {network}.</PageLayout>
    );
  return (
    <PageLayout>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box ">
            <div className="tabs is-toggle">
              <ul>
                <li className={route === "POOL" ? "is-active" : ""}>
                  <a onClick={() => setRoute("POOL")}>Pool</a>
                </li>
                {connectedWallet && contractStatus && contractStatus.deposit && (
                  <li className={route === "CLAIMS" ? "is-active" : ""}>
                    <a onClick={() => setRoute("CLAIMS")}>Claims</a>
                  </li>
                )}
                <li className={route === "SNAPSHOTS" ? "is-active" : ""}>
                  <a onClick={() => setRoute("SNAPSHOTS")}>Snapshots</a>
                </li>
                <li className={route === "ABOUT" ? "is-active" : ""}>
                  <a onClick={() => setRoute("ABOUT")}>About</a>
                </li>
              </ul>
            </div>
            <NotifyError msg={error} onClose={() => setError("")} />
            {route === "POOL" && (
              <Pool
                contractStatus={contractStatus}
                onPositionChange={onPositionChange}
                onDeposit={onActive}
                onCancel={onCancelModalActive}
                onClaim={onClaimModalActive}
              />
            )}
            {route === "SNAPSHOTS" && (
              <SnapshotList contractStatus={contractStatus} />
            )}
            {route === "CLAIMS" && (
              <Claims
                onClaim={onClaimModalActive}
                contractStatus={contractStatus}
              />
            )}
            {route === "ABOUT" && <About contractStatus={contractStatus} />}
          </div>
        </div>
      </div>
      {contractStatus && modalActive && (
        <ActionModal
          range={contractStatus.range}
          onClose={() => setModalActive(false)}
        />
      )}
      {contractStatus && contractStatus.deposit && positionModalActive && (
        <PositionModal
          currentPosition={contractStatus.deposit.position}
          range={contractStatus.range}
          onClose={() => setPositionModalActive(false)}
        />
      )}
      {cancelModalActive && (
        <CancelModal onClose={() => setCancelModalActive(false)} />
      )}
      {claimModalActive && (
        <ClaimModal onClose={() => setClaimModalActive(false)} />
      )}
    </PageLayout>
  );
};

export default Farm;
