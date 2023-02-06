import React from "react";
import Table from "Components/Organisms/Table";
import useSetup from "Store/setup";

// Types
interface Props {}
// Main component
const BuyingOrdersTable: React.FC<Props> = () => {
  // Store
  const { tokens } = useSetup();
  const { symbols } = tokens;
  const tokenOneSymbol = symbols[0];
  const tokenTwoSymbol = symbols[1];

  // Data to render
  return (
    <Table
      data={[]}
      columns={[
        tokenOneSymbol,
        `${tokenOneSymbol}/${tokenTwoSymbol}`,
        tokenTwoSymbol,
      ]}
    />
  );
};

export default BuyingOrdersTable;
