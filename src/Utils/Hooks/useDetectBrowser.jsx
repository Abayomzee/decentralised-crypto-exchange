import React from "react";

const useDetectBrowser = () => {
  // Chrom
  const isChrome = !!window.chrome;

  // FireFox
  const isFireFox = !!window.mozInnerScreenX;

  // Safari
  const isSafari = !!window.safari;

  return [isChrome, isFireFox, isSafari];
};

export default useDetectBrowser;
