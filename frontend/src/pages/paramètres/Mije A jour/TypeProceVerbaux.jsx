import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import axios from 'axios';
import {BsPencil} from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import Modal from '../../../components/modals/Modal';

function TypeProceVerbaux() {
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [selectedData, setSelectedData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/processverbaux')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const headers = ["N" ,"Désignation ","",""];
  const formattedData = dataCode.map(item => [item.numero, item.designation
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
Type des PV 
  </div>
  
<BackButton to="/miseAJourParametre"></BackButton>
    
</nav>
)
const NavbarModal =(
  <div className='text-white'>
Type des PV 
</div>

)
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="m-4" ></Button>
    <div className=' m-4' >
<Table headers={headers} data={formattedData} ></Table>
    </div>
    <Modal  isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[600px] h-[280px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  <div className=' m-4 flex justify-between' >
<Label text=" Numéro :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
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
<Label text=" Désignation :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.designation : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     designation: e.target.value,
   }))
 }
></Input>
    </div>

  <div className="flex justify-between p-4">
  <Button children="Modifier"
   onClick={async () => {
    try {
      // Make the PUT/PATCH request to update the data in the database
      await axios.put(
        `http://localhost:3500/code/datecloture/${selectedEditData.id}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/datecloture')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
      // Update the edited data in dataCode
      setDataCode((prevData) =>
        prevData.map((data) =>
          data.id === selectedEditData.id ? selectedEditData : data
        )
      );

      setIsModalOpen(false);
      setSelectedEditData(null);
      console.log('Data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }}
  ></Button>
  <Button onClick={() =>  setIsModalOpenModifi(false)} children="Quitter"  ></Button>
  </div>
  </Modal>
  <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[280px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  <div className=' m-4 flex justify-between' >
<Label text=" Numéro :" className="mt-2"></Label>
<Input type="text"  className="ml-4"

></Input>
    </div>
  

    <div className=' m-4 flex justify-between' >
<Label text=" Désignation :" className="mt-2"></Label>
<Input type="text"  className="ml-4"

></Input>
    </div>

  <div className="flex justify-between p-4">
  <Button children="Enregistrer"
  ></Button>
  <Button onClick={() =>  setIsModalOpen(false)} children="Quitter"  ></Button>
  </div>
  </Modal>
  </div>
  )
}

export default TypeProceVerbaux