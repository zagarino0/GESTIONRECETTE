import React from 'react'
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import BackButton from '../../../../components/button/BackButton';
import { Navbar } from '../../../../components/navbar/Navbar'
import { states } from '../../../../states/states';

function Layout(props) {
    const { selectedLink } = useSnapshot(states);

    //Links navbar
    const links = [
        { title: "Périodicité des Impots", link: "/PeriodiciteImpotParametre" },
        { title: "Date d'echèance par periode ", link: "/DateEcheancePeriode" },
        { title: "Date d'echèance", link: "/DateEcheanceTypeImpot" },
        
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
  <BackButton to="/parametreParametre"></BackButton>
        
    </nav>
    )
  return (
 <div className=" h-screen bg-[#212122] w-screen">
    <Navbar content={contentNavbar} />
    <main className="">{props.children}</main>
  </div>
  )
}

export default Layout