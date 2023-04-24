import React from "react";
import Main from "Components/Templates/Main";
import Alert from "Components/Molecules/Alert";
import useSetup from "Store/setup";
import LoadingExchange from "Components/Atom/LoadingExchange";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  // Store
  const { provider, isLoadingExchange } = useSetup();
  console.log({ provider });
  // Data to display
  return (
    <>
      {isLoadingExchange ? (
        <LoadingExchange />
      ) : (
        <>
          <Main />
          <Alert />
        </>
      )}
    </>
  );
};

export default Dashboard;
