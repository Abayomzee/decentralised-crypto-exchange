import React from "react";
import TopBar from "Components/Molecules/TopBar";
import OrderBook from "Components/Organisms/OrderBook";
import { Wrapper } from "./style";
import PriceChart from "../PriceChart";
import TradesNTransaction from "Components/Templates/TradesNTransaction";

interface Props {}

const Body: React.FC<Props> = () => {
  return (
    <Wrapper>
      <TopBar />
      <PriceChart />
      <TradesNTransaction />
      <OrderBook />
    </Wrapper>
  );
};

export default Body;
