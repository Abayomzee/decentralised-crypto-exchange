import React, { useEffect } from "react";
import useSetup from "./Store/setup";

function App() {
  // Store
  const { initSetUp } = useSetup();

  // Effect
  useEffect(() => {
    initSetUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Data to render
  return <div className="App"></div>;
}

export default App;
