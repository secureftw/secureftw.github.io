import React from "react";
import { Route } from "react-router-dom";
import { IDO_PATH } from "../../../consts";
import PageLayout from "../../components/PageLayout";
import Main from "./Main";

const IDO = () => {
  return (
    <div>
      <PageLayout>
        <div className="columns is-centered">
          <div className="column is-half">
            <Route exact={true} path={IDO_PATH} component={Main} />
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default IDO;
