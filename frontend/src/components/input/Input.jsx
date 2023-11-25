import React from "react";


const Input = (props) => {
  
  return (
    <input
      {...props}

      className={`shadow appearance-none border h-10 rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${props.className} `}
    />
  );
};



export default Input;