import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../../../components/PageLayout";
import { ARENA_HOME_PATH } from "../../pageRoutes";

const ARENA_LIST = ["4", "8", "16", "32", "64", "128"];
const ARENA_COLOR = {
  "4": "is-white",
  "8": "is-warning",
  "16": "is-info",
  "32": "is-success",
  "64": "is-danger",
  "128": "is-black",
};
const ArenaHome = (props) => {
  return (
    <div>
      <PageLayout>
        <div className="columns is-multiline">
          {ARENA_LIST.map((arena) => {
            return (
              <div key={arena} className="column is-4">
                <div
                  className={`notification has-text-centered ${ARENA_COLOR[arena]}`}
                >
                  <div className="title">Arena {arena}</div>
                  <Link
                    to={ARENA_HOME_PATH + "/" + arena}
                    className="button is-white"
                  >
                    Enter
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </PageLayout>
    </div>
  );
};

export default ArenaHome;
