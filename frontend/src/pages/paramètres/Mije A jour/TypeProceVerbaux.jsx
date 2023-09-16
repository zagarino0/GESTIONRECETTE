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
  const [numero , setNumero] = useState('');
  const [designation , setDesignation] = useState('');
  const [selectedData, setSelectedData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/procesverbaux/${id}`);
  
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
    axios.get('http://localhost:3500/code/procesverbaux')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const headers = ["N" ,"Désignation ","",""];
  const formattedData = dataCode.map(item => [item.numero, item.designation
    ,
    <span
          key={item.id} // Make sure to use a unique key
          className='cursor-pointer'
          onClick={() => handleDelete(item.id)}
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

const DataHandler =  (e) =>{
  e.preventDefault();
  const ProcesVerbaux ={
    numero,
    designation
  };
  
  
  try {
     axios.post('http://localhost:3500/code/procesverbaux',ProcesVerbaux);
    console.log("données ajoutées avec succès " , ProcesVerbaux);
    setIsModalOpen(false);
    setNumero('');
    setDesignation('');
    axios.get('http://localhost:3500/code/procesverbaux')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
    
  } catch(error){
console.error("erreur lors de l'ajout de donnée" , error)
  }
 }
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
        `http://localhost:3500/code/procesverbaux/${selectedEditData.id}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/procesverbaux')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
      // Update the edited data in dataCode
      setDataCode((prevData) =>
        prevData.map((data) =>
          data.id === selectedEditData.id ? selectedEditData : data
        )
      );

      setIsModalOpenModifi(false);
      setSelectedEditData(null);
      console.log('Data updated successfully.');
    } catch (error) {
      // Gestion de l'erreur
      if (error.response) {
        // Erreur de réponse HTTP (par exemple, 404)
        console.error(`Erreur HTTP: ${error.response.status}`);
        console.error(`Message: ${error.response.data.message}`);
      } else if (error.request) {
        // Erreur de requête (pas de réponse du serveur)
        console.error('Erreur de requête:', error.request);
      } else {
        // Erreur lors de la configuration de la requête
        console.error('Erreur lors de la configuration de la requête:', error.message);
      }
    }
    }
  }
  ></Button>
  <Button onClick={() =>  setIsModalOpenModifi(false)} children="Quitter"  ></Button>
  </div>
  </Modal>
  <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[280px]" >
  <Navbar content={NavbarModal} ></Navbar>
  <form onSubmit={DataHandler} >
  <div className=' m-4 flex justify-between' >
<Label text=" Numéro :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
  value={numero}
  onChange={e => setNumero(e.target.value)}
></Input>
    </div>
  

    <div className=' m-4 flex justify-between' >
<Label text=" Désignation :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
  value={designation}
  onChange={e => setDesignation(e.target.value)}
></Input>
    </div>

  <div className="flex justify-between p-4">
  <Button children="Enregistrer"
  ></Button>
  <Button onClick={() =>  setIsModalOpen(false)} children="Quitter"  ></Button>
  </div>
  </form>
  </Modal>
  </div>
  )
}

export default TypeProceVerbaux