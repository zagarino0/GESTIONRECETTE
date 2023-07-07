import * as React from "react";


export const Navbar  = ( props
) =>
        {
return(
    <>
    <div className={`bg-[#010101]  w-full  py-2 px-4  z-50 m-auto  ${props.className}`}>
     {props.content}
    </div>
    </>
)

}