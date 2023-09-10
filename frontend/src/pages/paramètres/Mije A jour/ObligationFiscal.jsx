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
import { RiDeleteBinLine } from 'react-icons/ri'
function ObligationFiscal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [selectedData, setSelectedData] = useState(null); 
  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/obligationfiscal')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);


  const handleDelete = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/datecloture/${id}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.id !== id));
      setSelectedData(null); // Reset the selection
  
      console.log(`Data with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

 
  const headers = ["Numéro ","Choix ","Obligation","Périodicité","Titre","Option","Taxation ","Pénalité" , "" , "" ];
  const formattedData = dataCode.map(item => [ item.numero , item.choix , item.obligation , item.periodicite , item.titre , item.option , item.taxation , item.penalite
    ,
    <span
          key={item.numero} // Make sure to use a unique key
          className='cursor-pointer'
          onClick={() => handleDelete(item.numero)}
        >
          <RiDeleteBinLine />
        </span>,
          <span
           key={`edit-${item.id}`} // Make sure to use a unique key
           className='cursor-pointer'
           onClick={() => {
             setSelectedEditData(item);
             setIsModalOpenModifi(true);
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
    <Button children="Ajouter un information" onClick={() => setIsModalOpen(true)} className="m-4" ></Button>
    <div className=' m-4' >
<Table headers={headers} data={formattedData}  ></Table>
    </div>

    <Modal isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[1100px] h-[680px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  
    <div className=' m-4 flex justify-between' >
<Label text=" Numéro:" ></Label>
<Input type="text" 
 value={selectedEditData ? selectedEditData.numero : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     numero: e.target.value,
   }))
 }
></Input>
    </div>

    <div className=' m-4 flex justify-between' >
<Label text=" Choix:" ></Label>
<Input type="text"  
 value={selectedEditData ? selectedEditData.choix : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     choix: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Obligation:"></Label>
<Input type="text"  
 value={selectedEditData ? selectedEditData.obligation : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     obligation: e.target.value,
   }))
 }
></Input>
    </div>

    <div className=' m-4 flex justify-between' >
<Label text=" Périodicité :"></Label>
<Input type="text"  
 value={selectedEditData ? selectedEditData.periodicite : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     periodicite: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Titre :" ></Label>
<Input type="text"  
 value={selectedEditData ? selectedEditData.titre : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     titre: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Option :" ></Label>
<Input type="text"  
 value={selectedEditData ? selectedEditData.option : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     option: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Taxation :" ></Label>
<Input type="text"  
 value={selectedEditData ? selectedEditData.taxation: ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     taxation: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Pénalité :" ></Label>
<Input type="text"  
 value={selectedEditData ? selectedEditData.penalite : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     penalite: e.target.value,
   }))
 }
></Input>
    </div>
    
  <div className='flex justify-between m-4'>

  <Button children="Enregistrer" ></Button>

  <Button onClick={() => setIsModalOpenModifi(false)} children="Quitter" ></Button>
  </div>
</Modal>
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[1100px] h-[680px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  
    <div className=' m-4 flex justify-between' >
<Label text=" Numéro:" ></Label>
<Input type="text" 

></Input>
    </div>

    <div className=' m-4 flex justify-between' >
<Label text=" Choix:" ></Label>
<Input type="text"  

></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Obligation:"></Label>
<Input type="text"  

></Input>
    </div>

    <div className=' m-4 flex justify-between' >
<Label text=" Périodicité :"></Label>
<Input type="text"  
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Titre :" ></Label>
<Input type="text"  
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Option :" ></Label>
<Input type="text"  

></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Taxation :" ></Label>
<Input type="text"  

></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Pénalité :" ></Label>
<Input type="text"  
 
></Input>
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