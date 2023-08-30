import * as React from 'react';



const Select = ({ options, value, onChange , className }) => {
  return (
    <select
      className={`border-[3px]
      py-3
     hover:bg-gray-200
     bg-white
      px-4  ${className}`}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;