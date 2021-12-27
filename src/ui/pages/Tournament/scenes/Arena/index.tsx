import React from "react";
import Banner from "./Banner";
import PageLayout from "../../../../components/PageLayout";

const Arena = (props) => {
  const { arenaNo } = props.match.params;
  return (
    <div>
      <Banner arenaNo={arenaNo} />
      <PageLayout>Coming soon</PageLayout>
    </div>
  );
};

export default Arena;
