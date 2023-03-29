import React, { useEffect } from "react";
import Typography from "Components/Atom/Typography";
import { Wrapper } from "./style";
import useSetup from "Store/setup";
import TradesTable from "../Table/Tables/TradesTable";
import EmptyState from "Components/Atom/EmptyState";

// Types
interface Props {}
// Main component
const Trades: React.FC<Props> = () => {
  // Store
  const { tokens } = useSetup();
  // Select token symbol
  const { symbols } = tokens;
  const tokenOneSymbol = symbols[0];
  const tokenTwoSymbol = symbols[1];
  // Select exchange data from store
  const { data } = useSetup().exchange.trades;
  const { transferInProgress } = useSetup().exchange;
  const tradesSelector = useSetup().tradesSelector;

  // Variable
  const tableHead = [
    "Time",
    `${tokenOneSymbol}`,
    `${tokenOneSymbol}/${tokenTwoSymbol}`,
  ];

  const tableColumns = [
    { label: "formattedTimestamp", path: "formattedTimestamp" },
    { label: "token0Amount", path: "token0Amount" },
    { label: "tokenPrice", path: "tokenPrice" },
  ];

  // Effects
  useEffect(
    () => {
      tradesSelector( );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transferInProgress]
  );

  // Data to render
  return (
    <Wrapper>
      <Typography as="h6" className="heading-5 mb-30" text="Trades" />
      {data && data.length ? (
        <TradesTable
          head={tableHead}
          data={data}
          columns={tableColumns}
          columnWithColor="token0Amount"
          columnColorPropName="orderTradeTypeClass"
        />
      ) : (
        <EmptyState space="5rem" text="No trades found" />
      )}
    </Wrapper>
  );
};

export default Trades;
