import React from "react";
import { FaTimes } from "react-icons/fa";
import { Wrapper } from "./style";
import Logo from "Components/Atom/Logo";
import Markets from "Components/Molecules/Markets";
import Balance from "Components/Organisms/Balance";
import Order from "Components/Organisms/Order";
import { Flex } from "Styles/layouts/Flex";

// Types
interface Props {
  className?: string;
  closeMenuBar?: () => void;
  variants?: any;
  exit?: any;
  transition?: any;
  initial?: any;
  animate?: any;
}
// Main component
const Aside: React.FC<Props> = (props) => {
  // Props
  const { closeMenuBar } = props;
  // Data to render
  return (
    <Wrapper {...props}>
      <Flex flexRowJcBetweenAiCenter>
        <Logo />
        <FaTimes color="#ffffff" onClick={closeMenuBar} />
      </Flex>
      <Markets />
      <Balance />
      <Order />
    </Wrapper>
  );
};

export default Aside;
