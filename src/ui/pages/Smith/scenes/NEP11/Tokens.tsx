import React, { useEffect, useState } from "react";
import { SmithContract } from "../../../../../packages/neo/contracts/ftw/smith";
import { useWallet } from "../../../../../packages/provider";
import DisplayNFT from "./DisplayNFT";
import _ from "underscore";
import { MAINNET } from "../../../../../packages/neo/consts";
// tslint:disable-next-line:no-submodule-imports
import { FaExternalLinkAlt } from "react-icons/all";
import { wallet } from "@cityofzion/neon-core";
interface ITokensProps {
  contractHash: string;
}
const Tokens = ({ contractHash }: ITokensProps) => {
  const [tokens, setTokens] = useState<number>(0);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { network } = useWallet();
  useEffect(() => {
    async function fetchContractStatus() {
      setError("");
      setLoading(true);
      try {
        const res = await new SmithContract(network).totalSupply(contractHash);
        setTokens(res);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContractStatus();
  }, [contractHash, network]);
  return (
    <>
      <strong>Supply</strong>
      <br />
      {isLoading ? (
        <div>Loading..</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {tokens}
          {tokens > 0 ? (
            <>
              <br />
              <strong>Showcase</strong>
              <div className="columns is-multiline is-mobile">
                {_.range(tokens > 12 ? 12 : tokens).map((i) => {
                  const tokenId = i + 1;
                  return (
                    <div
                      key={`token${i}`}
                      className="column is-1-desktop is-3-mobile"
                    >
                      <DisplayNFT
                        network={network}
                        contractHash={contractHash}
                        tokenId={tokenId.toString()}
                      />
                    </div>
                  );
                })}
              </div>
              {tokens > 12 && (
                <a
                  className="button is-black"
                  target="_blank"
                  href={`https://${
                    network === MAINNET
                      ? "explorer.onegate.space"
                      : "testnet.explorer.onegate.space"
                  }/NFTtokeninfo/0x${contractHash}`}
                >
                  <span className="icon">
                    <FaExternalLinkAlt />
                  </span>
                  <span>Browse more</span>
                </a>
              )}
            </>
          ) : (
            <div></div>
          )}
        </>
      )}
    </>
  );
};

export default Tokens;
