import React from 'react'
import { Navbar } from '../../../../components/navbar/Navbar';
import BackButton from '../../../../components/button/BackButton';
import { Link } from 'react-router-dom';
import Label from '../../../../components/title/label';

export const Layout = ({ children, currentPath }) => {
   

    //Links navbar
    const links = [
        { title: "Recherche RF", link: "/RechercheRF" },
        { title: "Classement RF ", link: "/ClassementRF" },
       
       
      ];
    // Navbar content
    const contentNavbar = (
      <nav className="flex items-center h-16 justify-between">
        <div>
            <Label text="Visualisation" className="font-semibold"></Label>
        </div>
        <ul className="flex">
          {links.map((link) => (
            <li
              key={link.title}
              className={`mx-4 
              text-center
              py-3
              px-6 
              text-white 
              text-xs
              font-semibold
              ${currentPath === link.link ? 'bg-[#E96012] rounded-md font-bold hover:scale-110 hover:shadow-xl transition duration-300 ease-in-out ' : ''}
            `}
            >
              <Link to={link.link}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <BackButton to="/NIFRecette"></BackButton>
      </nav>
    );
  
    return (
      <div className="h-screen w-screen">
        <Navbar content={contentNavbar} />
        <main className="">{children}</main>
      </div>
    );
  };
  