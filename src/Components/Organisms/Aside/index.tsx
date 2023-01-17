import React from "react";
import { Wrapper } from "./style";
import Logo from "Components/Atom/Logo";
import Markets from "Components/Molecules/Markets";
import Balance from "Components/Organisms/Balance";
import Order from "Components/Organisms/Order";

// Types
interface Props {}
// Main component
const Aside: React.FC<Props> = () => {
  // Data to render
  return (
    <Wrapper>
      <Logo />
      <Markets />
      <Balance />
      <Order />
    </Wrapper>
  );
};

export default Aside;
