import React from "react";
import TableHead from "Components/Molecules/TableHead";
import TableBody from "Components/Molecules/TableBody";
// import { TableEle } from "./style";
import "./style.css";

interface Props {
  columns: Array<any>;
  head?: Array<any>;
  data: Array<any>;
  columnWithColor?: string;
  columnColorPropName?: string;
  onRowClick?: (item: any) => void;
}
const Table: React.FC<Props> = (props) => {
  const { data, columns, head } = props;

  // Data to display
  return (
    <div className="t-wrapper">
      <div className="table-div">
        <table className="table">
          <TableHead columns={head || columns} />
          <TableBody {...props} data={data} columns={columns}  />
        </table>
      </div>
    </div>
  );
};

export default Table;
