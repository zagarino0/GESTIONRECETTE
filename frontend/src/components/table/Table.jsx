import * as React from "react";

const Table = (props) => {
  const { headers, data, classNameTd, onClick, selectedRowIndex, setSelectedRowIndex, className , ref } = props;

  const DataCell = ({ content, rowIndex }) => (
    <td
      className={`px-6 py-4  whitespace-no-wrap border-b border-gray-200 cursor-pointer ${
        selectedRowIndex === rowIndex ? "bg-gray-300" : ""
      }`}
      onClick={() => onClick(rowIndex)}
    >
      {content}
    </td>
  );

  return (
    <div className={`overflow-y-auto h-96   ${props.classTable}`}>
      <table ref={ref} className={`bg-white ${className}`}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={`header-${index}`}
                className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={classNameTd}>
              {row.map((cell, cellIndex) => (
                <DataCell key={cellIndex} content={cell} rowIndex={rowIndex} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
