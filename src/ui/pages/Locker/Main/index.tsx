import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LOCKER_CREATE_PATH,
  LOCKER_SEARCH_PATH,
  LOCKER_USER_PATH,
} from "../../../../consts";
import { useOnChainData } from "../../../../common/hooks/use-onchain-data";
import { useWallet } from "../../../../packages/provider";
import { LockerContract } from "../../../../packages/neo/contracts/ftw/locker";
import LockerTokenCard from "./LockerTokenCard";
import { FaPlus, FaSearch, FaUser } from "react-icons/fa";
import SearchLockerModal from "./SearchLockerModal";
import ModalCard from "../../../components/Modal";

const LockerMain = (props) => {
  const { network, connectedWallet } = useWallet();
  const [isSearchModalActive, setSearchModalActive] = useState(false);
  const { isLoaded, data } = useOnChainData(() => {
    return new LockerContract(network).getTokens();
  }, [network]);
  return (
    <>
      <div className="columns is-centered">
        <div className="column is-8">
          <div className="box is-shadowless">
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <h1 className="title is-5 is-marginless">Lockers</h1>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <div className="buttons">
                    <Link to={LOCKER_CREATE_PATH} className="button is-white">
                      <FaPlus />
                    </Link>
                    <Link to={LOCKER_SEARCH_PATH} className="button is-white">
                      <FaSearch />
                    </Link>
                    {connectedWallet ? (
                      <Link
                        to={`${LOCKER_USER_PATH}/${connectedWallet.account.address}`}
                        className="button is-white"
                      >
                        <FaUser />
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isLoaded ? (
            <div>Loading..</div>
          ) : (
            <div className="columns is-multiline">
              {data &&
                data.items.map((item) => {
                  return (
                    <div key={item.contractHash} className="column is-3">
                      <LockerTokenCard {...item} network={network} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      {isSearchModalActive && (
        <ModalCard onClose={() => setSearchModalActive(false)}>
          <SearchLockerModal />
        </ModalCard>
      )}
    </>
  );
};

export default LockerMain;
