import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import "../styles/global.css";
import "../styles/reset.scss";

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   Particles.init({
  //     selector: ".background",
  //     connectParticles: true,
  //   });
  // }, []);
  return (
    <>
      <Script
        src="/particles.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Script loaded.");
          Particles.init({
            selector: ".background",
            connectParticles: true,
          });
        }}
        onError={() => {
          console.log("Error loading the script");
        }}
      />
      <canvas
        className="background"
        style={{
          position: "absolute",
          display: "block",
          top: 0,
          left: 0,
          zIndex: -10,
        }}
      ></canvas>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
