import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SWAP_PATH_HISTORY, SWAP_PATH_TRADE } from "../../../../../consts";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";

interface IPoolCardProps {
  tokenA: string;
  tokenB: string;
  amountA: number;
  amountB: number;
}
const PoolCard = ({ tokenA, tokenB, amountA, amountB }: IPoolCardProps) => {
  const { network } = useWallet();
  const [tokenASymbol, setTokenASymbol] = useState("");
  const [tokenBSymbol, setTokenBSymbol] = useState("");
  useEffect(() => {
    async function fetchTokenInfo() {
      const res = await new SwapContract(network).getContractHashes(
	      tokenA,
	      tokenB
      );
      setTokenASymbol(res.tokenA.symbol);
      setTokenBSymbol(res.tokenB.symbol);
    }
    fetchTokenInfo();
  }, [tokenA, tokenB]);
  return (
    <div style={{ alignItems: "center" }} className="media">
      <div className="media-left">
        <strong>TVL</strong>
      </div>
      <div className="media-content is-vcentered">
        {tokenASymbol} / {tokenBSymbol}
        <br />
        <small>
          {amountA.toLocaleString()} / {amountB.toLocaleString()}
        </small>
        <br />
        <Link
          to={{
            pathname: `${SWAP_PATH_HISTORY}`,
            search: `?tokenA=${tokenA}&tokenB=${tokenB}&symbolA=${tokenASymbol}&symbolB=${tokenBSymbol}`,
          }}
        >
          Swap history
        </Link>
        {/*<br />*/}
        {/*<Link*/}
        {/*  to={{*/}
        {/*    pathname: `${SWAP_PATH_LIQUIDITY}`,*/}
        {/*    search: `?tokenA=${item.tokenA}&tokenB=${item.tokenB}`,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Add liquidity*/}
        {/*</Link>*/}
      </div>
      <div className="media-right">
        <Link
          to={{
            pathname: `${SWAP_PATH_TRADE}`,
            search: `?tokenA=${tokenA}&tokenB=${tokenB}&symbolA=${tokenASymbol}&symbolB=${tokenBSymbol}`,
          }}
          // onClick={() => setDetail(item)}
          className="button is-primary"
        >
          Trade
        </Link>
      </div>
    </div>
  );
};

export default PoolCard;
