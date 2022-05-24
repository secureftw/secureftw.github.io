import React, { useState } from "react";
import { useOnChainData } from "../../../../../../common/hooks/use-onchain-data";
import { DaoContract } from "../../../../../../packages/neo/contracts/ftw/dao";
import { Link, NavLink, Route, useParams } from "react-router-dom";
import { useWallet } from "../../../../../../packages/provider";
import moment from "moment";
import TextTruncate from "react-text-truncate";
import { DAO_CHANNEL_PATH } from "../../../../../../consts";
// import Create from "../Create";

const ProposalList = (props) => {
  // const data = sampleProposals;
  const params = useParams();
  const { contractHash } = params as any;
  const { network, connectedWallet } = useWallet();
  const [page, setPage] = useState("1");
  const { isLoaded, error, data } = useOnChainData(() => {
    return new DaoContract(network).getProposals(contractHash, "30", page);
  }, [page, network]);

  return (
    <div>
      <div className="columns">
        <div className="column is-9 ">
          <div className="box is-shadowless">
            <h1 className="title is-5">Proposals</h1>
            <div>
              {!isLoaded ? (
                <div>Loading..</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <div className="panel has-background-white is-shadowless">
                  {data.proposals.items.map((item, i) => {
                    const now = moment().valueOf();
                    const end = item.end;
                    const isActive = now < end;
                    return (
                      <Link
                        to={`${DAO_CHANNEL_PATH}/${contractHash}/proposal/${item.no}`}
                        className="panel-block is-block"
                        key={`proposal-${i}`}
                      >
                        <div className="media">
                          <div className="media-content content">
                            <h5>
                              #{item.no} {item.title}
                            </h5>
                            <TextTruncate
                              line={1}
                              element="span"
                              truncateText="…"
                              text={item.description}
                              // textTruncateChild={<a href="#">Read on</a>}
                            />
                            {/*<p>{item.description}</p>*/}
                          </div>
                          <div className="media-right">
                            <div
                              className={`tag ${
                                isActive ? "is-success" : "is-light"
                              }`}
                            >
                              {isActive ? "Active" : "End"}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="box has-text-centered is-shadowless">
            {isLoaded && data && <div>{data.channel.symbol}</div>}
          </div>
          <div className="box  is-shadowless">
            <aside className="menu">
              <ul className="menu-list">
                <li className="is-active">
                  <NavLink
                    exact={true}
                    activeClassName={"is-active"}
                    to={`${DAO_CHANNEL_PATH}/${contractHash}`}
                  >
                    Proposals
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName={"is-active"}
                    to={`${DAO_CHANNEL_PATH}/${contractHash}/create`}
                  >
                    New proposal
                  </NavLink>
                </li>
                {/*<li>*/}
                {/*	<NavLink*/}
                {/*		activeClassName={"is-active"}*/}
                {/*		to={PROPOSALS_ABOUT_PATH}*/}
                {/*	>*/}
                {/*		About*/}
                {/*	</NavLink>*/}
                {/*</li>*/}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalList;
