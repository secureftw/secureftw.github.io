import React, { useEffect, useState } from "react";
import { NFTContract } from "../../neo/contracts";
import { IRuneMeta } from "../../neo/contracts/ftw/nft/interfaces";
import { useWallet } from "../../provider";
import toast from "react-hot-toast";
import DisplayRune from "../../../ui/pages/Gallery/DisplayRune";
import DisplayRandomRune from "../../../ui/components/DisplayRandomRune";
import { IConnectedWallet } from "../../neo/wallet/interfaces";

interface IRunesProps {
  connectedWallet: IConnectedWallet;
}
const Runes = ({ connectedWallet }: IRunesProps) => {
  const [tokens, setTokens] = useState<any>([]);
  const [error, setError] = useState("");
  useState<IRuneMeta>();
  const { network } = useWallet();
  // const onPropertiesModalActive = (obj: IRuneMeta) => {
  //   if (connectedWallet) {
  //     setPropertiesModalActive(obj);
  //   } else {
  //     toast.error("Please connect wallet.");
  //   }
  // };
  useEffect(() => {
    async function fetchContractStatus() {
      try {
        const res = await new NFTContract(network).getTokens();
        setTokens(res);
      } catch (e: any) {
        setError(e.message);
      }
    }
    fetchContractStatus();
  }, [connectedWallet]);
  return (
    <div>
      <div
        style={{
          flexFlow: "wrap",
          // width: "640px",
          // margin: "0 auto"
        }}
        className="is-flex"
      >
        {/*{tokens.map((tokenId) => (*/}
        {/*  <DisplayRune*/}
        {/*    tokenId={tokenId}*/}
        {/*    network={network}*/}
        {/*    onClick={() => false}*/}
        {/*  />*/}
        {/*))}*/}
        {/*<DisplayRandomRune width="64px" height="64px" />*/}
      </div>
    </div>
  );
};

export default Runes;
