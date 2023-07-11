import React from 'react'
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Label from '../../../components/title/label';
import { states } from '../../../states/states';

function Periodicite() {
    const { selectedLink } = useSnapshot(states);

    //Links navbar
    const links = [
        { title: "Date cloture", link: "/periodiciteImpot" },
        { title: "Périodicité", link: "/periodicite" },
       
       
      ];
  
      const headers = ["N° Auto" ,"Périodicité " ];
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
const Headers =["N° Auto" ,"Période " , "Desc_Mois","Titre" ,"P1","P2","Exercice" ];
const Data = [['none','none','none','none','none','none','none'],];
    return (
      <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='mt-24 m-4' >
  <Table headers={headers} data={data} ></Table>
      </div>
    <div className='mt-4 m-4'>
<Button children="Modifier"></Button>
    </div>
    <div className='flex mt-4 m-4'>
<Label text="Exercice cloturé :" className="mt-2"></Label>
<Input type="date" className="ml-4"></Input>
<Button className='ml-4' children="Actualiser"></Button>
    </div>
    <div className="mt-4 m-4">
<Table headers={Headers} data={Data} ></Table>
    </div>
    <div className='mt-4 m-4 flex justify-between'>
<Button children="Rafraichir"></Button>
<Button children="Supprimer un enregistrement" ></Button>
<Button children="Mettre à jour "></Button>
<Button children="Insertion" ></Button>
    </div>
    </div>
    )
  }

export default Periodicite