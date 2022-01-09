import React, { useEffect } from "react";
import { ARENA_PATH } from "./pageRoutes";
import { Route } from "react-router-dom";
import ArenaMenu from "./scenes/Home";
import Arena from "./scenes/Arena";
import { TOURNAMENT_PATH } from "../../../consts";

const Tournament = () => {
  useEffect(() => {
    document.title = "Forthewin Arena: NFT tournament on NEO";
  }, []);
  return (
    <section>
      <Route exact={true} path={TOURNAMENT_PATH} component={ArenaMenu} />
      <Route path={ARENA_PATH} component={Arena} />
    </section>
  );
};

export default Tournament;
