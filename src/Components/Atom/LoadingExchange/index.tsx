import React from "react";
import Typography from "Components/Atom/Typography";
import { Container, Wrapper } from "./style";

interface Props {}
const LoadingExchange: React.FC<Props> = () => {
  // Data to dislay
  return (
    <Wrapper>
      <Container>
        <img
          src="/assets/images/dapp-icon-2.png"
          alt=""
          className="display-block mx-auto"
        />
        <Typography
          as="p"
          className="paragraph-8 max-width-480 mx-auto color-white text-center mt-30"
        >
          Loading Exchange...
        </Typography>
      </Container>
    </Wrapper>
  );
};

export default LoadingExchange;
