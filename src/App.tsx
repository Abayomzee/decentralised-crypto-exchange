import React, { useEffect, memo } from "react";
import Dashboard from "Components/Pages/Dashboard";
import useSetup from "./Store/setup";
import ConnectWallet from "Components/Organisms/ConnectWallet";

function App() {
  // Store
  const { initSetUp } = useSetup();

  // Variable
  const isEthereumEnabled = window.ethereum;

  // Effect
  useEffect(
    () => {
      console.log({ wallet: window.ethereum });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (isEthereumEnabled) initSetUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Data to render
  return (
    <>
      {isEthereumEnabled ? (
        <Dashboard />
      ) : (
        <ConnectWallet isEthereumEnabled={isEthereumEnabled} />
      )}
    </>
  );
}

export default memo(App);
