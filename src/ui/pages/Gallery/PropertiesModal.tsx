import React, { useState } from "react";
import Modal from "../../components/Modal";
import { useWallet } from "../../../packages/provider";
import { toast } from "react-hot-toast";
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
        <figure className="image is-square">
          <img src={properties.image} />
        </figure>
        <p className="subtitle is-7 has-text-right mt-3">{properties.owner}</p>
      </>
    </Modal>
  );
};

export default PropertiesModal;
