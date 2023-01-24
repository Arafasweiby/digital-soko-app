import { useMemo } from "react";
import { useTable } from "react-table";
import numeral from "numeral";

import ClientJobsActions from "../actions/clientJobsActions";
import moment from "moment";

export default function ProposalsTable(props) {
  const data = useMemo(() => props.data, [props.data]);
  const columns = useMemo(() => props.columns, [props.columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-300"
          >
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th
                      key={i}
                      {...column.getHeaderProps()}
                      className="py-5 pr-8 text-left text-xs font-black uppercase  text-lipad-grey"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="divide-y divide-gray-200 bg-white"
            >
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell) =>
                      cell.column.Header === "Actions" ? (
                        <td key={i + 1}>
                          <ClientJobsActions
                            id={props.data[i].id}
                            data={data[i]}
                            reloadDataHandler={props.reloadDataHandler}
                            updateDataHandler={props.updateDataHandler}
                          />
                        </td>
                      ) : cell.column.Header === "Compensation" ? (
                        <td
                          key={i + 2}
                          {...cell.getCellProps()}
                          className="whitespace-nowrap py-5 pr-8 text-sm"
                        >
                          {cell.value
                            ? `KES ${numeral(cell.value).format("0,0.00")}`
                            : "Not available"}
                        </td>
                      ) : cell.column.Header === "Deadline" ? (
                        <td
                          key={i + 3}
                          {...cell.getCellProps()}
                          className="whitespace-nowrap py-5 pr-8 text-sm"
                        >
                          {cell.value
                            ? moment(cell.value)
                                .local()
                                .format("DD MMM YYYY HH:mm")
                            : "Not available"}
                        </td>
                      ) : (
                        <td
                          key={i}
                          {...cell.getCellProps()}
                          className="whitespace-nowrap py-5 pr-8 text-sm"
                        >
                          {cell.value ?? "Not available"}
                        </td>
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
