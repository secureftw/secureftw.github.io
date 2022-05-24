import React from "react";
import PageLayout from "../../../../components/PageLayout";
import { Route } from "react-router-dom";
import ProposalList from "./List";
import Create from "./Create";
import { DAO_CHANNEL_PATH } from "../../../../../consts";
import ProposalView from "./View";

const DAOChannel = (props) => {
  const path = DAO_CHANNEL_PATH + "/:contractHash";

  return (
    <PageLayout>
      <div className="columns">
        <div className="column is-6 is-offset-3">
          <div>
            <Route exact={true} path={path} component={ProposalList} />
            <Route path={`${path}/create`} component={Create} />
            <Route
              path={`${path}/proposal/:proposalNo`}
              component={ProposalView}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DAOChannel;
