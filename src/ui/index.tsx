import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";

import {
  COLLECTION_PATH,
  FARM_PATH,
  GALLERY_PATH,
  HOME_PATH,
  SMITH_PATH,
  TOURNAMENT_PATH,
} from "../consts";
import { WalletContextProvider } from "../packages/provider";
import WalletSidebar from "./components/WalletSidebar";
import Farm from "./pages/Farm";
import { Toaster } from "react-hot-toast";
import MyCollection from "./pages/MyCollection";
import Gallery from "./pages/Gallery";
import MobileMenuSlider from "./components/MobileMenuSlider";
import Home from "./pages/Home";
import Smith from "./pages/Smith";
import Tournament from "./pages/Tournament";

const App = () => {
  return (
    <WalletContextProvider
      options={{
        useLocalStorage: true,
        useDevWallet: process.env.NODE_ENV === "development",
      }}
    >
      <Router>
        <Toaster position="bottom-center" />
        <Header />
        <Route exact path={HOME_PATH} component={Home} />
        <Route path={GALLERY_PATH} component={Gallery} />
        <Route path={TOURNAMENT_PATH} component={Tournament} />
        <Route path={SMITH_PATH} component={Smith} />
        <Route path={FARM_PATH} component={Farm} />
        <Route path={COLLECTION_PATH} component={MyCollection} />
        <MobileMenuSlider />
        <WalletSidebar />
      </Router>
    </WalletContextProvider>
  );
};

export default App;
