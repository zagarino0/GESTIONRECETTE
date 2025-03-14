import React from 'react'
import { Link } from "react-router-dom";
import BackButton from "../../components/button/BackButton";
import { Navbar } from "../../components/navbar/Navbar";

const Layout = ({ children, currentPath }) => {
   
    //Links navbar
    const links = [
        { title: "Fichier", link: "/Fichier" }, 
        { title: "Edition", link: "/Edition" },
        { title: "Utilitaire", link: "/UtilitairesOrdreVirment" },
        { title: "Avis de Crédit", link: "/AvisCredit" },
       
      ];
    // Navbar content
    const contentNavbar = (
      <nav className="flex items-center justify-between">
        <ul className="flex">
          {links.map((link) => (
            <li
              key={link.title}
              className={`mx-4 
              text-center
              py-3
              px-6 
              text-white 
              font-semibold
              ${currentPath === link.link ? 'bg-[#E96012] rounded-md font-bold hover:scale-110 hover:shadow-xl transition duration-300 ease-in-out ' : ''}
            `}
            >
              <Link to={link.link}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <BackButton to="/SIGRL"></BackButton>
      </nav>
    );
  
    return (
      <div className="h-screen w-screen">
        <Navbar content={contentNavbar} />
        <main className="flex items-center justify-center ">{children}</main>
      </div>
    );
  };
  export default Layout