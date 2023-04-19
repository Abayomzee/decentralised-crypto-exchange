import React from "react";
import { Container, Wrapper } from "./style";

interface Props {}
const ConnectWallet: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Container>
        <div className="glass-card"></div>
        <div className="card"></div>
      </Container>
    </Wrapper>
  );
};

export default ConnectWallet;
