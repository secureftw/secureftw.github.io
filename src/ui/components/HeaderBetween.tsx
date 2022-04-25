import React from "react";
import { Link } from "react-router-dom";
// tslint:disable-next-line:no-submodule-imports
import { FaAngleLeft } from "react-icons/all";
interface IHeaderBetweenProps {
  path: string;
  title: string;
}
const HeaderBetween = (props: IHeaderBetweenProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "50px" }}>
        <Link className="button is-white is-small" to={props.path}>
          <span className="icon">
            <FaAngleLeft />
          </span>
          <span>Pools</span>
        </Link>
      </div>

      <h1 className="title is-5 has-text-centered is-marginless">
        {props.title}
      </h1>
      <div style={{ width: "50px" }} />
    </div>
  );
};

export default HeaderBetween;
