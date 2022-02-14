import React from "react";

interface IBackgroundImageContainerProps {
  src: string;
  height: string;
}
const BgContainer = ({ src, height }: IBackgroundImageContainerProps) => {
  return (
    <div
      style={{
        width: "100%",
        height,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "none",
        backgroundImage: `url(${src})`,
        // padding: "80px 16px",
      }}
    />
  );
};

export default BgContainer;
