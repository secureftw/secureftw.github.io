import React from "react";
import { sampleProposals } from "../../../consts";

const ProposalList = (props) => {
  const data = sampleProposals;
  return (
    <div>
	    <h1 className="title is-5">Proposals</h1>
      {data.map((p, i) => {
        return (
          <div  className="media box" key={`proposal-${i}`}>
            <div className="media-content">{p.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProposalList;
