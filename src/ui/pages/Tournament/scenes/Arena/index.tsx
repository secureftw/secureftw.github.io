import React from "react";
import Banner from "./Banner";
import PageLayout from "../../../../components/PageLayout";
import { ARENA_PATH } from "../../pageRoutes";
import { Route } from "react-router-dom";
import Players from "./Players";
import History from "./History";

const Arena = (props) => {
  const { arenaNo } = props.match.params;
  return (
    <div>
      <Banner arenaNo={arenaNo} />
      <PageLayout>
        <Route
          exact
          path={ARENA_PATH}
          component={() => <Players arenaNo={arenaNo} />}
        />
        <Route
          path={ARENA_PATH + "/history"}
          component={() => <History arenaNo={arenaNo} />}
        />
      </PageLayout>
    </div>
  );
};

export default Arena;
