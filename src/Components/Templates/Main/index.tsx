import React from "react";
import Aside from "Components/Organisms/Aside";
import { Wrapper } from "./style";
import Body from "Components/Organisms/Body";

interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Aside />
      <Body />
    </Wrapper>
  );
};

export default Main;
