import React, { useEffect, useRef, useState } from "react";
import { Route } from "react-router-dom";
import { IDO_PAGE_ROUTE, IDO_PATH } from "../../../consts";
import PageLayout from "../../components/PageLayout";
import Main from "./Main";
import { useWallet } from "../../../packages/provider";

const IDO = () => {
  const { network } = useWallet();
  if (!IDO_PAGE_ROUTE.network.includes(network)) {
    return (
      <PageLayout>
        <div className="notification is-info">
          {IDO_PAGE_ROUTE.label} is not on {network} yet.
          <br />
          Please stay tuned.
        </div>
      </PageLayout>
    );
  }

  // const [vantaEffect, setVantaEffect] = useState(0);
  // const myRef = useRef(null);
  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       DOTS({
  //         el: myRef.current,
  //         mouseControls: true,
  //         touchControls: true,
  //         gyroControls: false,
  //         minHeight: 500,
  //         minWidth: 500,
  //         backgroundColor: 0x80822,
  //         size: 2.8,
  //       })
  //     );
  //   }
  //   return () => {
  //     if (vantaEffect) {
  //       // @ts-ignore
  //       vantaEffect.destroy();
  //     }
  //   };
  // }, [vantaEffect]);
  return (
    <div>
      <div
        id="halo"
        // ref={myRef}
      ></div>
      <PageLayout>
        <div className="columns is-centered">
          <div className="column is-half">
            <Route exact={true} path={IDO_PATH} component={Main} />
            {/*<Route path={IDO_SWAP_PATH} component={IDOSwap} />*/}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default IDO;
