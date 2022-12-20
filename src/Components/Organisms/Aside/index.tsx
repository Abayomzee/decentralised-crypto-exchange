import React from "react";
import { Wrapper } from "./style";
import Logo from "Components/Atom/Logo";

interface Props {}

const Aside: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  );
};

export default Aside;
