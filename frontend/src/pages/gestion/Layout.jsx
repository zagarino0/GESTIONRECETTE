import * as React from "react";
import { states } from "../../states/states";
import { Navbar } from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import BackButton from "../../components/button/BackButton";


export const Layout  = ( props ) => {
    const { selectedLink } = useSnapshot(states);

    //Links navbar
    const links = [
        { title: "Situation d'une Entreprise", link: "/gestion" },
        { title: "Consultation ", link: "/ConsultationGestion" },
        { title: "RF", link: "/consultatioRF" },
        { title: "Défailants", link: "/utilitaire" },
       
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
<BackButton to="/SIGRL"></BackButton>
        
    </nav>
    )
  return (
    <div className=" h-screen  w-screen">
      <Navbar content={contentNavbar} />
      <main className="">{props.children}</main>
    </div>
  );
};