import React from "react";
import { Link } from "react-router-dom";
import { TOURNAMENT_PATH } from "../../../../../consts";
import PageLayout from "../../../../components/PageLayout";

const ARENA_LIST = ["8", "16", "32", "64", "128"];
const ARENA_COLOR = {
  "4": "is-black",
  "8": "is-black",
  "16": "is-black",
  "32": "is-black",
  "64": "is-black",
  "128": "is-black",
};
const ArenaHome = (props) => {
  return (
    <div
      style={{
        backgroundImage: 'url("arena-bg.jpeg")',
        backgroundSize: "cover",
        height: "calc(100vh - 52px)",
        backgroundPosition: "center",
      }}
    >
      <PageLayout>
        {/*<div className="columns is-multiline">*/}
        {ARENA_LIST.map((arena) => {
          return (
            <div
              key={arena}
              // className="column is-4"
            >
              <div
                className="has-text-centered"
                // className={`notification has-text-centered ${ARENA_COLOR[arena]}`}
              >
                <Link
                  to={TOURNAMENT_PATH + "/" + arena}
                  className="title has-text-white"
                >
                  ARENA {arena}
                </Link>
                {/*<Link*/}
                {/*  to={TOURNAMENT_PATH + "/" + arena}*/}
                {/*  className="button is-white"*/}
                {/*>*/}
                {/*  Enter*/}
                {/*</Link>*/}
              </div>
            </div>
          );
        })}
        {/*</div>*/}
      </PageLayout>
    </div>
  );
};

export default ArenaHome;
