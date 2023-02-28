import Trades from "Components/Organisms/Trades";
import React from "react";
import { Wrapper } from "./style";

interface Props {}

const TradesNTransaction: React.FC<Props> = () => {
  // Data to render
  return (
    <Wrapper>
      <div></div>
      <Trades />
    </Wrapper>
  );
};

export default TradesNTransaction;
