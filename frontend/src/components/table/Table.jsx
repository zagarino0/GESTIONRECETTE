import * as React from "react";

const Table = (props) => {
  const { headers, data , classNameTd  } = props;
  const DataCell = ({ content }) => (
    <td className={`px-6 py-4  whitespace-no-wrap border-b border-gray-200 `} onClick={props.onClick}>
     {content}
    </td>
  );
  return (
     <div className=' overflow-y-auto h-96'>
          <table className={`  bg-white  ${props.className}`}>
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
                <DataCell key={cellIndex} content={cell} />
              ))}
            </tr>
          ))}
        </tbody>
    </table>
     </div>

  );
};

export default Table;