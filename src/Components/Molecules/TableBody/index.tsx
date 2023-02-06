import React from "react";
import _ from "lodash";

interface columnProps {
  label: string;
  id: string;
}
interface Props {
  columns?: any;
  data?: any;
}
const TableBody: React.FC<Props> = (props) => {
  const { columns, data } = props;

  const renderCell = (item: any, column: any) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item: any, column: any) => {
    return item.id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item: any) => {
        return (
          <tr key={item.id} className="table-row">
            {columns.map((column: columnProps) => (
              <td className="table-body" key={createKey(item, column)}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
