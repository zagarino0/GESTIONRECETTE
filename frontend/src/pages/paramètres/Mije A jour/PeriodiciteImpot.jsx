import React from 'react'
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import { states } from '../../../states/states';

function PeriodiciteImpot() {
  const { selectedLink } = useSnapshot(states);

  //Links navbar
  const links = [
      { title: "Date cloture", link: "/periodiciteImpot" },
      { title: "Périodicité", link: "/periodicite" },
     
     
    ];

    const headers = ["N° Auto" ,"Cloture " ];
    const data = [['none','none'],];

  //Navbar content
  const NavbarContent = (
      <nav className=" flex items-center justify-between  ">
   <div className='text-white'>
Périodicité
    </div>
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
<BackButton to="/miseAJourParametre"></BackButton>
      
  </nav>
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-24 m-4' >
<Table headers={headers} data={data} ></Table>
    </div>
    <div className='mt-4 m-4'>
<Button children="Mettre à jour " ></Button>
    </div>
  </div>
  )
}

export default PeriodiciteImpot