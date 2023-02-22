import React from "react";
import Table from "Components/Organisms/Table";

// Types
interface Props {
  head: string[];
  data: any[];
  columns: any[];
}
// Main component
const BuyingOrdersTable: React.FC<Props> = (props) => {
  // Data to render
  return <Table {...props} />;
};

export default BuyingOrdersTable;
