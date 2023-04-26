import React, { useEffect } from "react";
import Typography from "Components/Atom/Typography";
import { OrderTypeCard, OrderTypesWrapper, Wrapper } from "./style";
import SellingOrdersTable from "Components/Organisms/Table/Tables/SellingOrdersTable";
import BuyingOrdersTable from "Components/Organisms/Table/Tables/BuyingOrdersTable";
import useSetup from "Store/setup";
import EmptyState from "Components/Atom/EmptyState";
import { Flex } from "Styles/layouts/Flex";
import { RiErrorWarningLine } from "react-icons/ri";

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
  const { transferInProgress } = useSetup().exchange;
  const orderBookSelector = useSetup().orderBookSelector;
  const handleFilledOrder = useSetup().handleFilledOrder;

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

  // Method
  const fillOrder = (order: any) => {
    handleFilledOrder(order);
  };

  // Effect
  useEffect(() => {
    orderBookSelector();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferInProgress]);

  // Data to render
  return (
    <Wrapper>
      <Typography as="h6" className="heading-5 mb-30" text="Order Book" />
      <OrderTypesWrapper>
        <OrderTypeCard>
          {sellOrders && sellOrders.length ? (
            <>
              <Flex gap="1rem" flexRowAiCenter>
                <Typography as="h6" className="heading-6" text="Selling" />
                <Flex gap=".4rem" flexRowAiCenter>
                  <RiErrorWarningLine fontSize="1.2rem" color="#707070" />
                  <Typography
                    as="span"
                    className="paragraph-4"
                    text="Click on order row to fill order"
                  />
                </Flex>
              </Flex>
              <SellingOrdersTable
                head={tableHead}
                data={sellOrders}
                columns={tableColumns}
                columnWithColor="tokenPrice"
                columnColorPropName="orderTypeClass"
                onRowClick={fillOrder}
              />
            </>
          ) : (
            <EmptyState text="No orders found" />
          )}
        </OrderTypeCard>
        <OrderTypeCard>
          {buyOrders && buyOrders.length ? (
            <>
              <Flex gap="1rem" flexRowAiCenter>
                <Typography as="h6" className="heading-6" text="Buying" />
                <Flex gap=".4rem" flexRowAiCenter>
                  <RiErrorWarningLine fontSize="1.2rem" color="#707070" />
                  <Typography
                    as="span"
                    className="paragraph-4"
                    text="Click on order row to fill order"
                  />
                </Flex>
              </Flex>
              <BuyingOrdersTable
                head={tableHead}
                data={buyOrders}
                columns={tableColumns}
                columnWithColor="tokenPrice"
                columnColorPropName="orderTypeClass"
                onRowClick={fillOrder}
              />
            </>
          ) : (
            <EmptyState text="No orders found" />
          )}
        </OrderTypeCard>
      </OrderTypesWrapper>
    </Wrapper>
  );
};

export default OrderBook;
