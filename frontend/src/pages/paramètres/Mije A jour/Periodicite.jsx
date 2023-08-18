import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Label from '../../../components/title/label';
import { states } from '../../../states/states';
import axios from 'axios';
import Select from '../../../components/input/SelectInput';

function Periodicite() {
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
  
      const headers = ["N° Auto" ,"Périodicité " ];
      const formattedData = dataCode.map(item => [item.numero_auto, item.cloture]);
  
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
    // État pour stocker la valeur sélectionnée
  const [selectedValue, setSelectedValue] = useState(''); // La valeur initiale peut être définie selon vos besoins

  // Exemple d'options provenant de la base de données
  const optionsFromDatabase = [
    { value: dataCode[0]?.cloture, label: dataCode[0]?.cloture },
    
   
  ];
const Headers =["N° Auto" ,"Période " , "Desc_Mois","Titre" ,"P1","P2","Exercice" ];
const Data = dataCode.map(item => [item.numero_auto, item.periode ,item.desc_mois ,item.titre ,item.p1 ,item.p2 , item.cloture]);
    return (
      <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
   <div className="flex justify-between">
   <div className='mt-32 p-4 bg-[#212122]' >
  <Table headers={headers} data={formattedData} className="w-[100px]" ></Table>
      </div>
   <div className='flex flex-col'>
   <div className='flex mt-4 p-4 bg-[#212122]'>
<Label text="Exercice cloturé :" className="mt-2"></Label>
<Select
        options={optionsFromDatabase}
        value={selectedValue}
        onChange={setSelectedValue}
        className="ml-4 w-40"
      />
<Button className='ml-4 h-16' children="Actualiser"></Button>
    </div>
    <div className="mt-4 p-4 bg-[#212122]">
<Table headers={Headers} data={Data} ></Table>
    </div>
    <div className='mt-2 p-2 '>
<Button children="Ajouter" className="h-16"></Button>

    </div>
   </div>
   </div>
    </div>
    )
  }

export default Periodicite