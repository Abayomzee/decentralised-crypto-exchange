import { SortIcon } from "Components/Atom/Svgs";
import Typography from "Components/Atom/Typography";
import React from "react";
 
interface Props {
  columns?: object[];
}
const TableHead: React.FC<Props> = (props) => {
  const { columns } = props;
  return (
    <thead>
      <tr>
        {columns?.map((column: any, i) => (
          <th key={i} scope="col" className="table-head">
            <Typography as="span" className="paragraph-4 table-head-item">
              {column}
              <SortIcon />
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
