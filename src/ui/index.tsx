import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";

import { COLLECTION_PATH, FARM_PATH, GALLERY_PATH } from "../consts";
import { WalletContextProvider } from "../packages/provider";
import { CONST } from "../packages/neo";
import WalletSidebar from "./components/WalletSidebar";
import Farm from "./pages/Farm";
import { Toaster } from "react-hot-toast";
import MyCollection from "./pages/MyCollection";
import Gallery from "./pages/Gallery";
import MobileMenuSlider from "./components/MobileMenuSlider";

const App = () => {
  return (
    <WalletContextProvider
      options={{
        // network: CONST.PRIVATENET,
        network: CONST.TESTNET,
        useLocalStorage: true,
        useDevWallet: true,
      }}
    >
      <Router>
        <Toaster position="bottom-center" />
        <Header />
        {/*<Route exact path={HOME_PATH} component={Home} />*/}
        <Route exact path={FARM_PATH} component={Farm} />
        <Route path={GALLERY_PATH} component={Gallery} />
        <Route path={COLLECTION_PATH} component={MyCollection} />
        <MobileMenuSlider />
        <WalletSidebar />
      </Router>
    </WalletContextProvider>
  );
};

export default App;
