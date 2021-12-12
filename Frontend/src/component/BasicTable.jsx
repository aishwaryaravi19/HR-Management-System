import React from "react";
import { useTable } from "react-table";

export default function BasicTable({ columns, data }) {
  
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // Sends the needed props to your table.
    getTableBodyProps, // Sends needed props to your table body
    headerGroups, // Returns normalized header groups
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row in order to be displayed.
  } = useTable({
    columns,
    data
  });
  console.log("column in basic table",columns,data)

return (
    <table {...getTableProps()}  style={{ border: 'solid 1px black '}}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{paddingTop:'10px',paddingBottom:'10px',textAlign:'center',backgroundColor:'gray',color:'white'}}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                  }} >{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

}