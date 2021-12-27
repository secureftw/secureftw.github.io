import React from "react";
import PageLayout from "../../components/PageLayout";
import Banner from "./scenes/Arena/Banner";
import { ARENA_HOME_PATH, ARENA_PATH } from "./pageRoutes";
import { Route } from "react-router-dom";
import ArenaHome from "./scenes/Home";
import Arena from "./scenes/Arena";

const Tournament = () => {
  return (
    <section>
      <Route exact={true} path={ARENA_HOME_PATH} component={ArenaHome} />
      <Route exact={true} path={ARENA_PATH} component={Arena} />
    </section>
  );
};

export default Tournament;
