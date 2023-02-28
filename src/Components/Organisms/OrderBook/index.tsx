import React from "react";
import Typography from "Components/Atom/Typography";
import { OrderTypeCard, OrderTypesWrapper, Wrapper } from "./style";
import SellingOrdersTable from "Components/Organisms/Table/Tables/SellingOrdersTable";
import BuyingOrdersTable from "Components/Organisms/Table/Tables/BuyingOrdersTable";
import useSetup from "Store/setup";

// Types
interface Props {}
// Main component
const OrderBook: React.FC<Props> = () => {
  // Store
  const { tokens } = useSetup();
  // Select token symbol
  const { symbols } = tokens;
  const tokenOneSymbol = symbols[0];
  const tokenTwoSymbol = symbols[1];
  // Select exchange data from store
  const { data } = useSetup().exchange.openOrders;
  const { sellOrders, buyOrders } = data;

  // Variable
  const tableHead = [
    tokenOneSymbol,
    `${tokenOneSymbol}/${tokenTwoSymbol}`,
    tokenTwoSymbol,
  ];

  const tableColumns = [
    { label: "token0Amount", path: "token0Amount" },
    { label: "tokenPrice", path: "tokenPrice" },
    { label: "token1Amount", path: "token1Amount" },
  ];

  // Data to render
  return (
    <Wrapper>
      <Typography as="h6" className="heading-5 mb-30" text="Order Book" />
      <OrderTypesWrapper>
        <OrderTypeCard>
          <Typography as="h6" className="heading-6" text="Selling" />
          <SellingOrdersTable
            head={tableHead}
            data={sellOrders}
            columns={tableColumns}
            columnWithColor="tokenPrice"
            columnColorPropName="orderTypeClass"
          />
        </OrderTypeCard>
        <OrderTypeCard>
          <Typography as="h6" className="heading-6" text="Buying" />
          <BuyingOrdersTable
            head={tableHead}
            data={buyOrders}
            columns={tableColumns}
            columnWithColor="tokenPrice"
            columnColorPropName="orderTypeClass"
          />
        </OrderTypeCard>
      </OrderTypesWrapper>
    </Wrapper>
  );
};

export default OrderBook;
