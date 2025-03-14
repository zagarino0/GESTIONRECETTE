// SearchComponent.js
import React from 'react';
import { RiSearchLine } from 'react-icons/ri';

const SearchInput = ({ onSearch , placeholder , type , className , value , onChange , classInput}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={`shadow appearance-none border h-10 rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${classInput}`}
        onChange={onChange}
      />
      <button className="bg-[#B85015] text-white px-3 py-3 rounded-md" onClick={() => onSearch('')}>
        <RiSearchLine  />
      </button>
    </div>
  );
};

export default SearchInput;
