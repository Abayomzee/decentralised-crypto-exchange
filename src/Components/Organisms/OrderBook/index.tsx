import React from "react";
import Typography from "Components/Atom/Typography";
import { OrderTypeCard, OrderTypesWrapper, Wrapper } from "./style";
import SellingOrdersTable from "Components/Organisms/Table/Tables/SellingOrdersTable";
import BuyingOrdersTable from "Components/Organisms/Table/Tables/BuyingOrdersTable";

// Types
interface Props {}
// Main component
const OrderBook: React.FC<Props> = () => {
  // Data to render
  return (
    <Wrapper className="mt-100">
      <Typography as="h6" className="heading-5 mb-30" text="Order Book" />
      <OrderTypesWrapper>
        <OrderTypeCard>
          <Typography as="h6" className="heading-6" text="Selling" />
          <SellingOrdersTable />
        </OrderTypeCard>
        <OrderTypeCard>
          <Typography as="h6" className="heading-6" text="Buying" />
          <BuyingOrdersTable />
        </OrderTypeCard>
      </OrderTypesWrapper>
    </Wrapper>
  );
};

export default OrderBook;
