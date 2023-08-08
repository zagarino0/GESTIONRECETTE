import React from "react";


const Input = (props) => {
  
  return (
    <input
      {...props}

      className={`border-2 px-6 py-3  text-black ${props.className} `}
    />
  );
};



export default Input;