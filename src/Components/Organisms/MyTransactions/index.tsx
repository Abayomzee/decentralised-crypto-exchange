import React, { useEffect, useState } from "react";
import Typography from "Components/Atom/Typography";
import { TabNav, TabNavs, Wrapper } from "./style";
import useSetup from "Store/setup";
import TradesTable from "../Table/Tables/TradesTable";
import EmptyState from "Components/Atom/EmptyState";
import { Flex } from "Styles/layouts/Flex";

// Types
interface Props {}
// Main component
const MyTransactions: React.FC<Props> = () => {
  // States
  const [tab, setTab] = useState<string>("Orders");

  // Store
  const { tokens } = useSetup();
  // Select token symbol
  const { symbols } = tokens;
  const tokenOneSymbol = symbols[0];
  const tokenTwoSymbol = symbols[1];

  const { data } = useSetup().exchange.myOpenOrders;
  const { data: filledOrders } = useSetup().exchange.myFilledOrders;

  const { transferInProgress } = useSetup().exchange;
  const getMyFilledOrders = useSetup().getMyFilledOrders;
  const getMyOpenOrders = useSetup().getMyOpenOrders;
  const orderBookSelector = useSetup().orderBookSelector;

  // Variable
  const tableHead = [
    `${tokenOneSymbol}`,
    `${tokenOneSymbol}/${tokenTwoSymbol}`,
    "",
  ];

  const tableColumns = [
    { label: "token0Amount", path: "token0Amount" },
    { label: "tokenPrice", path: "tokenPrice" },
    { label: "action", path: "action" },
  ];

  const ordersTableHead = [
    "Time",
    `${tokenOneSymbol}`,
    `${tokenOneSymbol}/${tokenTwoSymbol}`,
  ];

  const tradesTableColumns = [
    { label: "formattedTimestamp", path: "formattedTimestamp" },
    { label: "tokenTradeAmount", path: "tokenTradeAmount" },
    { label: "tokenPrice", path: "tokenPrice" },
  ];

  // Effects
  useEffect(() => {
    orderBookSelector();
    getMyFilledOrders();
    getMyOpenOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferInProgress]);

  // Data to render
  return (
    <Wrapper>
      <Flex
        gap="1rem"
        className="mb-30 position-sticky-top-0"
        flexRowJcBetweenAiCenter
      >
        <Typography as="h6" className="heading-5" text="Transactions" />
        <TabNavs>
          <TabNav onClick={() => setTab("Orders")} active={tab === "Orders"}>
            Orders
          </TabNav>
          <TabNav onClick={() => setTab("Trades")} active={tab === "Trades"}>
            Trades
          </TabNav>
        </TabNavs>
      </Flex>

      {tab === "Orders" ? (
        <>
          {data && data.length ? (
            <TradesTable
              head={tableHead}
              data={data}
              columns={tableColumns}
              columnWithColor="token0Amount"
              columnColorPropName="orderTypeClass"
            />
          ) : (
            <EmptyState space="5rem" text="No trades found" />
          )}
        </>
      ) : (
        <>
          {data && data.length ? (
            <TradesTable
              head={ordersTableHead}
              data={filledOrders}
              columns={tradesTableColumns}
              columnWithColor="tokenTradeAmount"
              columnColorPropName="orderClass"
            />
          ) : (
            <EmptyState space="5rem" text="No trades found" />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default MyTransactions;
