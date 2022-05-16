import React from "react";
import { SwapContract } from "../../../../../packages/neo/contracts";
import { useWallet } from "../../../../../packages/provider";
import { SWAP_PATH } from "../../../../../consts";
import HeaderBetween from "../../../../components/HeaderBetween";
import TruncatedAddress from "../../../../components/TruncatedAddress";
import { useOnChainData } from "../../../../../common/hooks/use-onchain-data";

interface IProvidersProps {
  tokenA: string;
  tokenB: string;
}
const Providers = ({ tokenA, tokenB }: IProvidersProps) => {
  // const location = useLocation();
  // const params = queryString.parse(location.search);
  // const { tokenA, tokenB } = params;
  const { network } = useWallet();

  const { isLoaded, error, data } = useOnChainData(() => {
    return new SwapContract(network).getLPList(
      tokenA as string,
      tokenB as string
    );
  }, [network]);

  return (
    <div>
	    <h1 className="is-size-5 has-text-weight-bold">LP List</h1>
      {/*<HeaderBetween path={SWAP_PATH} title={"LP list"} />*/}
      <hr />
      <div className="table-container is-small">
        <table className="table is-fullwidth is-small">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Lock</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {!isLoaded ? (
              <tr>
                <td>Loading..</td>
              </tr>
            ) : error ? (
              <div>{error}</div>
            ) : data && data.length === 0 ? (
              <tr>
                <td>No NP</td>
              </tr>
            ) : (
              data.map((lp, i) => {
                return (
                  <tr key={`lp-${i}`}>
                    <td>{lp.amount}</td>
                    <td>{lp.lockUntil}</td>
                    <td>
                      <TruncatedAddress address={lp.owner} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Providers;
