import React, { useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { SMITH_PATH, SMITH_PATH_NEP11 } from "../../../consts";
import { Route } from "react-router-dom";
import Banner from "./Banner";
import NEP17Smith from "./scenes/NEP17";
import NEP11Smith from "./scenes/NEP11";

const Smith = () => {
  useEffect(() => {
    document.title =
      "Forthewin Smith: Create your NEP11 and NEP17 smart contracts without any codes.";
  }, []);
  return (
    <>
      <Banner />
      <PageLayout>
        <Route exact path={SMITH_PATH} component={() => <NEP17Smith />} />
        <Route path={SMITH_PATH_NEP11} component={() => <NEP11Smith />} />
      </PageLayout>
    </>
  );
};

export default Smith;
