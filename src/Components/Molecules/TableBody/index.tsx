import React from "react";
import _ from "lodash";
import Button from "Components/Atom/Button";
import useSetup from "Store/setup";

interface columnProps {
  label: string;
  path?: string;
  id: string;
}
interface Props {
  columns?: any;
  data?: any;
  columnWithColor?: any;
  columnColorPropName?: any;
}
const TableBody: React.FC<Props> = (props) => {
  // Props
  const { columns, data, columnWithColor, columnColorPropName } = props;

  // Store
  const { handleCancelOrder } = useSetup();

  // Methods
  const renderCell = (item: any, column: any) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item: any, column: any) => {
    return item.id + (column.path || column.key);
  };

  // Data to display
  return (
    <tbody>
      {data.map((item: any) => {
        return (
          <tr key={item.id} className="table-row">
            {columns.map((column: columnProps) => (
              <td
                className="table-body"
                style={{
                  ...(column.label === columnWithColor && {
                    color: `${item[columnColorPropName]}`,
                  }),
                }}
                key={createKey(item, column)}
              >
                {column.path === "action" ? (
                  <>
                    <Button
                      className="btn-bordered btn-sm"
                      onClick={() => handleCancelOrder(item)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>{renderCell(item, column)}</>
                )}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
