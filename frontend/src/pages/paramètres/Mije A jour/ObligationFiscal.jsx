import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import axios from 'axios';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import Modal from '../../../components/modals/Modal';
import {BsPencil} from 'react-icons/bs'
function ObligationFiscal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/obligationfiscal')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);
 
  const headers = ["Objet" ,"Numéro ","Choix ","Obligation","Périodicité","Titre","Option","Taxation ","Pénalité" , "" ];
  const formattedData = dataCode.map(item => [item.objet, item.numero , item.choix , item.obligation , item.periodicite , item.titre , item.option , item.taxation , item.penalite
    ,
    <span
     key={`edit-${item.id}`} // Make sure to use a unique key
     className='cursor-pointer'
     onClick={() => {
       setSelectedEditData(item);
       setIsModalOpen(true);
     }}
   >
     <BsPencil />
   </span>,
  ]);

//Navbar content
const NavbarContent = (
    <nav className=" flex items-center justify-between  ">
 <div className='text-white'>
Périodicité et Obligation fiscal
  </div>
  
<BackButton to="/miseAJourParametre"></BackButton>
    
</nav>
)
const NavbarModal =(
  <div>
  <div className='text-white'>
  Périodicité et Obligation fiscal
  </div>
  </div>
)
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-24 m-4' >
<Table headers={headers} data={formattedData} onClick={() => setIsModalOpen(true)} ></Table>
    </div>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[1100px] h-[680px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  
  <div className=' m-4 flex justify-between' >
<Label text=" Objet:" className="mt-2"></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Numéro:" ></Label>
<Input type="text" className="h-8"></Input>
    </div>

    <div className=' m-4 flex justify-between' >
<Label text=" Choix:" ></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Obligation:"></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Choix:" ></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Obligation :" ></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Périodicité :"></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Titre :" ></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Option :" ></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Taxation :" ></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Pénalité :" ></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    
  <div className='flex justify-between m-4'>

  <Button children="Enregistrer" ></Button>

  <Button onClick={() => setIsModalOpen(false)} children="Quitter" ></Button>
  </div>
</Modal>

  </div>
  )
}

export default ObligationFiscal