import React from "react";
import BackButton from "../../../components/button/BackButton";
import { Navbar } from "../../../components/navbar/Navbar";
export const Layout = ({ children, currentPath })  => {
    

    


    //Navbar content
    const contentNavbar = (
        <nav className=" flex items-center justify-between  ">
     
     <div>
      <label className="text-white text-xl font-semibold" >Prise en charge</label>
     </div>
<BackButton to="/PriseEnCharge"></BackButton>
        
    </nav>
    )
    return (
      <div className="h-screen w-screen">
        <Navbar content={contentNavbar} />
        <main className="">{children}</main>
      </div>
    );
  };
  