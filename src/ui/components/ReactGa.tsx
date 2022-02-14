import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

const ReactGa = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location]);
  return <div></div>;
};

export default ReactGa;
