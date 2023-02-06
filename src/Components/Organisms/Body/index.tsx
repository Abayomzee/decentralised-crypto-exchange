import React from "react";
import TopBar from "Components/Molecules/TopBar";
import OrderBook from "Components/Organisms/OrderBook";
import { Wrapper } from "./style";

interface Props {}

const Body: React.FC<Props> = () => {
  return (
    <Wrapper>
      <TopBar />
      <OrderBook />
    </Wrapper>
  );
};

export default Body;
