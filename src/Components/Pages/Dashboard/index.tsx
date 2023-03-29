import React from "react";
import Main from "Components/Templates/Main";
import Alert from "Components/Molecules/Alert";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <>
      <Main></Main>
      <Alert />
    </>
  );
};

export default Dashboard;
