import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SWAP_PATH_HISTORY,
  SWAP_PATH_LIQUIDITY_ADD,
  SWAP_PATH_LP_LIST,
  SWAP_PATH_TRADE,
} from "../../../../../consts";
import { ASSET_LIST } from "../../../../../packages/neo/contracts/ftw/swap/consts";
import { useWallet } from "../../../../../packages/provider";
import { SwapContract } from "../../../../../packages/neo/contracts";
import {
  FaHistory,
  FaPlusCircle,
  FaPlusSquare,
  FaUsers,
  RiHandCoinFill,
} from "react-icons/all";

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
        <div className="content">
          {tokenASymbol} / {tokenBSymbol}
          <br />
          <small>
            {amountA.toLocaleString()} / {amountB.toLocaleString()}
          </small>
        </div>

        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <span className="icon is-small">
                <Link
                  className="has-text-grey"
                  to={{
                    pathname: `${SWAP_PATH_HISTORY}`,
                    search: `?tokenA=${tokenA}&tokenB=${tokenB}&symbolA=${tokenASymbol}&symbolB=${tokenBSymbol}`,
                  }}
                >
                  <FaHistory />
                </Link>
              </span>
            </div>

            <div className="level-item">
              <span className="icon is-small">
                <Link
	                className="has-text-grey"
                  to={{
                    pathname: `${SWAP_PATH_LIQUIDITY_ADD}`,
                    search: `?tokenA=${tokenA}&tokenB=${tokenB}&symbolA=${tokenASymbol}&symbolB=${tokenBSymbol}`,
                  }}
                >
                  <FaPlusSquare />
                </Link>
              </span>
            </div>

	          <div className="level-item">
		          <span className="icon is-small">
			          <Link
				          className="has-text-grey"
				          to={{
					          pathname: `${SWAP_PATH_LP_LIST}`,
					          search: `?tokenA=${tokenA}&tokenB=${tokenB}&symbolA=${tokenASymbol}&symbolB=${tokenBSymbol}`,
				          }}
			          >
				          <RiHandCoinFill />
			          </Link>
		          </span>
	          </div>

          </div>
        </div>
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
