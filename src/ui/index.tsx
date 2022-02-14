import React from "react";
import ReactGA from "react-ga";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import {
  COLLECTION_PATH,
  FARM_PATH,
  FUSION_PATH,
  GALLERY_PATH,
  HOME_PATH,
  MIGRATION_PATH,
  SMITH_PATH,
  SWAP_PATH,
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
import Swap from "./pages/Swap";
import Fusion from "./pages/Fusion";
import Migration from "./pages/Migration";
import ReactGa from "./components/ReactGa";

ReactGA.initialize("UA-114435339-1");

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
        <Route path={SWAP_PATH} component={Swap} />
        <Route path={FUSION_PATH} component={Fusion} />
        <Route exact path={MIGRATION_PATH} component={Migration} />
        <MobileMenuSlider />
        <WalletSidebar />
        <ReactGa />
      </Router>
    </WalletContextProvider>
  );
};

export default App;
