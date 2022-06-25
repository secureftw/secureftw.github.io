import React from "react";
import PageLayout from "../../../components/PageLayout";

const FarmAnalytics = (props) => {
  return (
    <div>
      <section className="hero is-white is-small">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Farm Analytics</h1>
            {/*<p className="subtitle is-6">*/}
            {/*  Click on the column name to sort pairs by its TVL, volume, fees or*/}
            {/*  APY.*/}
            {/*</p>*/}
          </div>
        </div>
      </section>
      <PageLayout>
        <div className="box is-shadowless">Coming soon</div>
      </PageLayout>
    </div>
  );
};

export default FarmAnalytics;
