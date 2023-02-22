import React from "react";
import TopBar from "Components/Molecules/TopBar";
import OrderBook from "Components/Organisms/OrderBook";
import { Wrapper } from "./style";
import PriceChart from "../PriceChart";

interface Props {}

const Body: React.FC<Props> = () => {
  return (
    <Wrapper>
      <TopBar />
      <PriceChart />
      <OrderBook />
    </Wrapper>
  );
};

export default Body;
