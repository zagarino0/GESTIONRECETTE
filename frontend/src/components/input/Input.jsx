import React from "react";
import { states } from "../../states/states";


const Input = (props) => {
  
  return (
    <input
      {...props}
      onChange={(e) => {
        states.input[props.name] = e.target.value;
      }}
      className={`border-2 px-6 py-3  text-black ${props.className} `}
    />
  );
};



export default Input;