import * as React from "react";


const Table = (props) => {
  const { headers, data } = props;
  return (
    <table className="min-w-full bg-white">
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
          <tr key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <td
                key={`cell-${rowIndex}-${cellIndex}`}
                className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;