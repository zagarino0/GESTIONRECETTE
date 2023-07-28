import React from "react";

export const Button = (props) => {
  

  return (
    <button
      className={`
        
       px-4 py-3 bg-[#B85015]  text-white  hover:bg-[#E96012] 
       hover:scale-110
       hover:shadow-xl 
       transition 
       duration-300 
       ease-in-out ${props.className}`}
      onClick={props.onClick}
      size={props.size}
    >
      {props.children}
    </button>
  );
};

