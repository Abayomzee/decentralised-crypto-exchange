import React from "react";
import { Wrapper } from "./style";
import Logo from "Components/Atom/Logo";
import Markets from "Components/Molecules/Markets";

// Types
interface Props {}
// Main component
const Aside: React.FC<Props> = () => {
  // Data to render
  return (
    <Wrapper>
      <Logo />
      <Markets />
    </Wrapper>
  );
};

export default Aside;
