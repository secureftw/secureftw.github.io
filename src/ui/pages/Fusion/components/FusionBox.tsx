import React from "react";
// tslint:disable-next-line:no-submodule-imports
import { FaQuestionCircle } from "react-icons/all";
interface IFusionBoxProps {
  src: string;
}
const FusionBox = ({ src }: IFusionBoxProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
	      height: "300px"
      }}
      className="is-clickable"
    >
      {src ? <img src={src} /> : <FaQuestionCircle />}
    </div>
  );
};

export default FusionBox;
