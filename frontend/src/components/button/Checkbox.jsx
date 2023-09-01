import React from 'react';

const Checkbox = ({ label, value, className , onChange }) => {
  console.log(value)
  return (
    <label className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        checked={value}
        onChange={onChange}
        
      />
      <span className="ml-2 text-sm text-white">{label}</span>
    </label>
  );
};

export default Checkbox;
