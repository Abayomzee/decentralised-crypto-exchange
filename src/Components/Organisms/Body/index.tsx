import TopBar from "Components/Molecules/TopBar";
import React from "react";
import { Wrapper } from "./style";

interface Props {}

const Body: React.FC<Props> = () => {
  return (
    <Wrapper>
      <TopBar />
    </Wrapper>
  );
};

export default Body;
