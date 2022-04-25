import React, { useEffect, useState } from "react";
import { useWallet } from "../../../../../../../packages/provider";
import { SwapContract } from "../../../../../../../packages/neo/contracts";
import { IConnectedWallet } from "../../../../../../../packages/neo/wallet/interfaces";
import { toast } from "react-hot-toast";
import { getUserShare } from "../../../../../../../packages/neo/contracts/ftw/swap/helpers";
import { ASSET_LIST } from "../../../../../../../packages/neo/contracts/ftw/swap/consts";
import AfterTransactionSubmitted from "../../../../../../../packages/ui/AfterTransactionSubmitted";
interface IFarmDetailProps {
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  connectedWallet: IConnectedWallet;
}
const FarmDetail = ({ connectedWallet, tokenA, tokenB }: IFarmDetailProps) => {
  const [data, setData] = useState<any>();
  const [claimable, setClaimable] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { network } = useWallet();
  const [txid, setTxid] = useState("");
  const [reloadCnt, setReloadCnt] = useState(0);

  const onRemoveLiquidity = async () => {
    if (connectedWallet) {
      try {
        const res = await new SwapContract(network).remove(
          connectedWallet,
          tokenA
        );
        setTxid(res);
      } catch (e: any) {
        toast.error(e.description ? e.description : e.message);
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const onClaim = async () => {
    if (connectedWallet) {
      try {
        const res = await new SwapContract(network).claim(
          connectedWallet,
          tokenA,
          tokenB
        );
        setTxid(res);
      } catch (e: any) {
        toast.error(e.description ? e.description : e.message);
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const onActionSuccess = () => {
    setReloadCnt(reloadCnt + 1);
    setTxid("");
  };
  //
  // useEffect(() => {
  //   async function fetch() {
  //     setLoading(true);
  //     const res1 = await new SwapContract(network).getUserStake(
  //       connectedWallet,
  //       tokenA,
  //       tokenB
  //     );
  //     const res2 = await new SwapContract(network).getClaimAble(
  //       connectedWallet,
  //       tokenA,
  //       tokenB
  //     );
  //     setLoading(false);
  //     setData(res1);
  //     setClaimable(res2);
  //   }
  //   fetch();
  // }, [reloadCnt]);

  if (isLoading) return <div>Loading..</div>;

  const userShare = data
    ? getUserShare(
        data.pair.totalShare,
        data.stake.amountA,
        data.pair.amountA,
        data.pair.amountB
      )
    : undefined;
  console.log(
    data
      ? "original staking: " + data.stake.amountA + "/" + data.stake.amountB
      : "No staking info"
  );
  return (
    <div>
      {txid ? (
        <AfterTransactionSubmitted
          txid={txid}
          network={network}
          onSuccess={onActionSuccess}
          onError={() => setTxid("")}
        />
      ) : (
        <>
          <h1 className="title is-5">My liquidity</h1>
          {data ? (
            <div>
              <div style={{ alignItems: "center" }} className="media">
                <div className="media-content is-vcentered">
                  {ASSET_LIST[network][tokenA].symbol} /{" "}
                  {ASSET_LIST[network][tokenB].symbol}
                  <br />
                  <small>
                    {/*{data.stake.amountA} / {data.stake.amountB}*/}
                    {/*<br />*/}
                    {userShare ? userShare.amountA : 0} /{" "}
                    {userShare ? userShare.amountB : 0}
                  </small>
                </div>
                <div className="media-right">
                  <button
                    onClick={onRemoveLiquidity}
                    className="button is-light"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <hr />
              <div style={{ alignItems: "center" }} className="media">
                <div className="media-content is-vcentered">
                  Claimable
                  <br />
                  {ASSET_LIST[network][tokenA].symbol} /{" "}
                  {ASSET_LIST[network][tokenB].symbol}
                  <br />
                  <small>
                    {claimable ? claimable.amountA : 0} /{" "}
                    {claimable ? claimable.amountB : 0}
                  </small>
                </div>
                <div className="media-right">
                  <button onClick={onClaim} className="button is-primary">
                    Claim
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>There is no liquidity with your connected wallet</div>
          )}
        </>
      )}
    </div>
  );
};

export default FarmDetail;
