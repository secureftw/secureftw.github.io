import React from "react";
interface ILogoIconProps {
  img: string;
  width?: string;
  height?: string;
}
const LogoIcon = ({ img, width, height }: ILogoIconProps) => {
  return (
    <div
      className="circular--portrait"
      style={{
        position: "relative",
        borderRadius: "50%",
        background: "white",
        width: width ? width : "30px",
        height: height ? height : "30px",
      }}
    >
      <img style={{ width: "100%", height: "auto" }} src={img} />
    </div>
  );
};

export default LogoIcon;
