import React from "react";
import { Flex } from "Styles/layouts/Flex";
import Typography from "Components/Atom/Typography";
import { LogoIcon } from "../Svgs";

interface Props {}

const Logo: React.FC<Props> = () => {
  return (
    <Flex gap="1rem" flexRowAiCenter>
      <LogoIcon />
      <Typography as="h2" text="Dapp Token Exchange" className="heading-1" />
    </Flex>
  );
};

export default Logo;
