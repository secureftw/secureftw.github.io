import React from "react";

interface SmithModalHeader {
  title: string;
}
const SmithModalHeader = (props: SmithModalHeader) => {
  return (
    <div>
      <div className="level is-mobile mb-3">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-3">{props.title}</h1>
          </div>
        </div>
        <div className="level-right is-hidden-touch">
          <div className="level-item">
            <div className="field is-grouped is-grouped-multiline">
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Deploy fee</span>
                  <span className="tag is-info">10 GAS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-grouped is-grouped-multiline is-hidden-desktop">
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Deploy fee</span>
            <span className="tag is-info">10 GAS</span>
          </div>
        </div>
      </div>
      <div className="content is-small">
        <li>
          We recommend to mint on Testnet first before you mint on Mainnet.
        </li>
        <li>Do not use EMOJI or Unicode.</li>
      </div>
    </div>
  );
};

export default SmithModalHeader;
