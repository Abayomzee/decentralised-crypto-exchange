import React from "react";
import Main from "Components/Templates/Main";
import Alert from "Components/Molecules/Alert";
import useSetup from "Store/setup";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  // Store
  const { provider } = useSetup();
  console.log({ provider });
  // Data to display
  return (
    <>
      <Main />
      <Alert />
    </>
  );
};

export default Dashboard;
