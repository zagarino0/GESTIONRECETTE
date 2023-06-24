import * as React from "react";
import { states } from "../../states/states";
import { Navbar } from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import {IoMdArrowRoundBack} from "react-icons/io"


export const Layout  = ( props ) => {
    const { selectedLink } = useSnapshot(states);

    //Links navbar
    const links = [
        { title: "Mise à jour et Relève RF", link: "/immatriculation" },
        { title: "Consultation RF", link: "/consultatioRF" },
        { title: "Utilitaires", link: "/utilitaire" },
       
      ];


    //Navbar content
    const contentNavbar = (
        <nav className=" flex items-center justify-between  ">
     
      <ul className="flex">
        {links.map((link) => (
          <li
            key={link.title}
            className={`mx-4 
            hover:bg-[#E96012] 
            text-center
            py-3
            px-6 
            text-white 
            text-bold 
            hover:scale-110
            hover:shadow-xl 
            transition 
            duration-300 
            ease-in-out
            ${
              selectedLink === link.title.toLowerCase() 
              
            } `}
          >
            <Link to={link.link}>{link.title}</Link>
          </li>
        ))}
      </ul>
<Link to="/SIGRL">
<IoMdArrowRoundBack className='text-white text-xl'></IoMdArrowRoundBack>
</Link>
        
    </nav>
    )
  return (
    <div className=" h-screen  w-screen">
      <Navbar content={contentNavbar} />
      <main className="">{props.children}</main>
    </div>
  );
};