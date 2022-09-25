import { AppProps } from "next/app";
import Script from "next/script";
import "../styles/global.css";
import "../styles/reset.scss";
import initParticles from "../utils/particlesWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="/particles.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Script loaded.");
          initParticles(".background", true);
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
