import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import { states } from '../../../states/states';
import axios from 'axios';

function PeriodiciteImpot() {
  const [dataCode, setDataCode] = useState([]);

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/periodicite')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const { selectedLink } = useSnapshot(states);

  //Links navbar
  const links = [
      { title: "Date cloture", link: "/periodiciteImpot" },
      { title: "Périodicité", link: "/periodicite" },
     
     
    ];

    const headers = ["N° Auto" ,"Cloture " ];
    const formattedData = dataCode.map(item => [item.numero_auto, item.exerc]);

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
    <div className='mt-24 flex bg-[#212122] justify-center p-4' >
<Table headers={headers} data={formattedData} ></Table>
<div className='mt-4 bg-[#212122] p-4'>
<Button children="Mettre à jour " ></Button>
    </div>
    </div>
   
  </div>
  )
}

export default PeriodiciteImpot