import React, { useEffect, useRef, useState } from "react";
import DisplayRandomRune from "../components/DisplayRandomRune";
import PageLayout from "../components/PageLayout";
import DisplayRune from "./Gallery/DisplayRune";
// tslint:disable-next-line:no-submodule-imports
import DOTS from "vanta/dist/vanta.rings.min";
// import * as THREE from "three";

const Home = (props) => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        DOTS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0xffffff,
        })
      );
    }
    return () => {
      if (vantaEffect) {
        // @ts-ignore
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);
  return (
    <div>
      <div style={{ height: "100vh" }} ref={myRef}>
        Foreground content goes here
      </div>
      {/*<section className="hero is-white">*/}
      {/*  <div className="hero-body">*/}
      {/*    <div className="container">*/}
      {/*      <h1 className="title">Forthewin Runes</h1>*/}
      {/*      <p className="subtitle">*/}
      {/*        FTW Rune is unique. Purely generated in the smart contract with*/}
      {/*        random pixels and attributes.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      {/*<PageLayout>*/}
      {/*</PageLayout>*/}
    </div>
  );
};

export default Home;
