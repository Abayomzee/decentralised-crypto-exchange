import React from "react";
import MyTransactions from "Components/Organisms/MyTransactions";
import Trades from "Components/Organisms/Trades";
import { Wrapper } from "./style";

interface Props {}

const TradesNTransaction: React.FC<Props> = () => {
  // Data to render
  return (
    <Wrapper className="mb-30">
      <MyTransactions />
      <Trades />
    </Wrapper>
  );
};

export default TradesNTransaction;
