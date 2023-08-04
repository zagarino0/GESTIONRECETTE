import * as React from "react";


const Table = (props) => {
  const { headers, data } = props;
  return (
    <table className={`  bg-white ${props.className}`}>
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
        {data.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}  className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;