import React from "react";
import Modal from "../../components/Modal";
import { IRuneMeta } from "../../../packages/neo/contracts/ftw/nft/interfaces";

interface IPropertiesModal {
  properties: IRuneMeta;
  onClose: () => void;
}
const PropertiesModal = ({ properties, onClose }: IPropertiesModal) => {
  return (
    <Modal onClose={onClose}>
      <>
        <h1 className="title is-4">{properties.name}</h1>
        {/*<div className="field is-grouped is-grouped-multiline">*/}
        {/*  <div className="control">*/}
        {/*    <div className="tags has-addons">*/}
        {/*      <span className="tag is-dark">Phase</span>*/}
        {/*      <span className="tag is-info">{properties.phase}</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <div className="control">*/}
        {/*    <div className="tags has-addons">*/}
        {/*      <span className="tag is-dark">Luck</span>*/}
        {/*      <span className="tag is-success">{properties.luck}</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <p className="subtitle is-7">
          <strong>Phase:</strong> {properties.phase}, <strong>Luck:</strong>{" "}
          {properties.luck}
        </p>
        <figure className="image is-square">
          <img src={properties.image} />
        </figure>
        <p className="subtitle is-7 has-text-right mt-3">{properties.owner}</p>
      </>
    </Modal>
  );
};

export default PropertiesModal;
