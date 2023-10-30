import React from "react";

export const Button = (props) => {
  

  return (
    <button
      className={`
        
       px-4 py-3 bg-[#B85015]  text-white  hover:bg-[#E96012]
       rounded-md  
       font-semibold
       ${props.className}`}
      onClick={props.onClick}
      size={props.size}
    >
      {props.children}
    </button>
  );
};

