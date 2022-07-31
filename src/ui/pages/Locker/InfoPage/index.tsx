import React from "react";
import { Link } from "react-router-dom";
import { LOCKER_CREATE_PATH, LOCKER_USER_PATH } from "../../../../consts";
import { wallet } from "@cityofzion/neon-core";
import { LOCKER_SCRIPT_HASH } from "../../../../packages/neo/contracts/ftw/locker/consts";
import { FaKey, FaSearch } from "react-icons/fa";
const LockerInfoPage = ({ network }) => {
  return (
    <div>
      <h5 className="title is-5">FTW locker</h5>
      <div className="content">
        <p>
          FTW locker allows users to send NEP-17 tokens with timelock. It issues
          a NFT to the receiver and it is used as the key to unlock. The key can
          is transferable and the owner can unlock its locker by sending the key
          to the locker contract.
        </p>
        <h6>How to lock</h6>
        <p>
          Go to <Link to={LOCKER_CREATE_PATH}>Create page</Link> and fill out
          the form.
        </p>
        <h6>How to unlock</h6>
        <ul>
          <li>
            Go to <Link to={LOCKER_USER_PATH}>Key page</Link>. It displays all
            keys that the connected wallet has with unlock buttons.
          </li>
          <li>
            Send your key to the locker contract. Address is{" "}
            <strong>
              {wallet.getAddressFromScriptHash(LOCKER_SCRIPT_HASH[network])}
            </strong>
          </li>
          <li>
            Note that lockers only can be unlocked when it meets the release
            timestamp.
          </li>
        </ul>
        <h6>How to browse lockers</h6>
        <ul>
          <li>
            Locker list by contract - Go to the main page to see contract list.
          </li>
          <li>
            Locker by locker no - Click <FaSearch /> button on the header.
          </li>
          <li>
            key list by your wallet - Click <FaKey /> button on the header.
          </li>
        </ul>
        <h6>Contract hash</h6>
        <p>0x{LOCKER_SCRIPT_HASH[network]}</p>
      </div>
    </div>
  );
};

export default LockerInfoPage;
