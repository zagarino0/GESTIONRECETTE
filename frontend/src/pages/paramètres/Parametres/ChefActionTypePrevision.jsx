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
function ChefActionTypePrevision() {
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [isModalOpenModifie, setIsModalOpenModifie] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpene, setIsModalOpene] = useState(false);
  const [ setSelectedData] = useState(null);
  
  
  const[libelle , setLibelle] = useState('');

  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/chefaction')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  
  
  const [type_prevision , setType_prevision] = useState('');
  const [dataCodeContent, setDataCodeContent] = useState([]);

  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/typeprevision')
      .then((response) => setDataCodeContent(response.data))
      .catch((error) => console.error(error));
  }, []);
// ajout donnée controller 
const DataHandlerPrevision =  (e) =>{
  e.preventDefault();
  const Data ={
 
    libelle,
    type_prevision
       
  };
  
  console.log(Data)
  try {
     axios.post('http://localhost:3500/code/typeprevision', Data)
     .then((response) => setDataCodeContent(response.data))
     .catch((error) => console.error(error));
    console.log("données ajoutées avec succès " , Data);
    setLibelle('');
    setType_prevision('');
    setIsModalOpene(false);
  } catch(error){
console.error("erreur lors de l'ajout de donnée" , error)
  }
    
}




  const handleDelete = (code) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/chefaction/${code}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.id !== code));
      setSelectedData(null); // Reset the selection
       // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/chefaction')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
      console.log(`Data with ID ${code} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleDeleteType = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/typeprevision/${id}`);
  
      // Update the list of data after successful deletion
      setDataCodeContent((prevData) => prevData.filter((data) => data.id !== id));
      setSelectedData(null); // Reset the selection
       // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/typeprevision')
    .then((response) => setDataCodeContent(response.data))
    .catch((error) => console.error(error));
      console.log(`Data with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  
  // ajout donnée controller 
  const DataHandler =  (e) =>{
    e.preventDefault();
    const Data ={
   
      libelle
         
    };
    
    console.log(Data)
    try {
       axios.post('http://localhost:3500/code/chefaction', Data)
       .then((response) => setDataCode(response.data))
       .catch((error) => console.error(error));
      console.log("données ajoutées avec succès " , Data);
      setLibelle('');
      setIsModalOpen(false);
    } catch(error){
  console.error("erreur lors de l'ajout de donnée" , error)
    }
      
  }
  const headers = ["Code" ,"LIBELLE " , "" , "" ];
  const data = dataCode.map(item => [item.code, item.libelle ,
    <span
      key={item.code}
      className='cursor-pointer'
      onClick={() => handleDelete(item.code)}
    >
      <RiDeleteBinLine />
    </span>,
    <span
      key={`edit-${item.id}`}
      className='cursor-pointer'
      onClick={() => {
        setSelectedEditData(item);
        setIsModalOpenModifi(true);
      }}
    >
      <BsPencil />
    </span>,]);
  const headerContent = ["Type Prev." ,"LIBELLE","" , "" ];
  const dataContent = dataCodeContent.map(item => [item.type_prevision, item.libelle 
    ,
    <span
      key={item.id}
      className='cursor-pointer'
      onClick={() => handleDeleteType(item.id)}
    >
      <RiDeleteBinLine />
    </span>,
    <span
      key={`edit-${item.id}`}
      className='cursor-pointer'
      onClick={() => {
        setSelectedEditData(item);
        setIsModalOpenModifie(true);
      }}
    >
      <BsPencil />
    </span>,
  ]);
  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white'>
    Chef d'Action et type de Prévision
        </div>
        <div>
          <BackButton to="/parametreParametre"></BackButton>
        </div>
    </div>
      )

      const NavbarModal =(
        <div className='text-white'>
      Chef d'Action
      </div>
      
      )
      const NavbarModale =(
        <div className='text-white'>
      type de Prévision
      </div>
      
      )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>    
    <Navbar content={NavbarContent}></Navbar>
    <div className='flex items-center justify-between '>
    <div className='flex flex-col'>
    <div className='text-white m-4 flex flex-row'>Des Chefs d'Action
    <Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="ml-2" ></Button>
    </div>
      <div className='flex'>
        
      <div className='mt-4 m-4' >
    <Table headers={headers} data={data} ></Table>
        </div>
      </div>
    </div>
    <div className='flex flex-col'>
    <div className='text-white m-4 flex '>Des Types de Prévisions
    <Button children="Ajouter une information" onClick={() => setIsModalOpene(true)} className="ml-2" ></Button>
     </div>
      <div className='flex'>
        
      <div className='mt-4 m-4' >
    <Table headers={headerContent} data={dataContent} ></Table>
        </div>
      </div>
    </div>
    </div>
    <Modal  isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[600px] h-[200px]" >
  <Navbar content={NavbarModal} ></Navbar>

  

    <div className=' m-4 flex justify-between' >
<Label text=" Libellé :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.libelle : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     libelle: e.target.value,
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
        `http://localhost:3500/code/chefaction/${selectedEditData.code}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/chefaction')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
      // Update the edited data in dataCode
      setDataCode((prevData) =>
        prevData.map((data) =>
          data.code === selectedEditData.code ? selectedEditData : data
        )
      );

      setIsModalOpenModifi(false);
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
  <Modal  isOpen={isModalOpenModifie} onClose={() => setIsModalOpenModifie(false)} className="w-[600px] h-[280px]" >
  <Navbar content={NavbarModale} ></Navbar>
  
  <div className=' m-4 flex justify-between' >
<Label text=" Type de prévision :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.type_prevision : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     type_prevision: e.target.value,
   }))
 }
></Input>
    </div>
  

    <div className=' m-4 flex justify-between' >
<Label text=" Libellé :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.libelle : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     libelle: e.target.value,
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
        `http://localhost:3500/code/typeprevision/${selectedEditData.id}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/typeprevision')
    .then((response) => setDataCodeContent(response.data))
    .catch((error) => console.error(error));
      // Update the edited data in dataCode
      setDataCodeContent((prevData) =>
        prevData.map((data) =>
          data.id === selectedEditData.id ? selectedEditData : data
        )
      );

      setIsModalOpenModifie(false);
      setSelectedEditData(null);
      console.log('Data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }}
  ></Button>
  <Button onClick={() =>  setIsModalOpenModifie(false)} children="Quitter"  ></Button>
  </div>
  </Modal>
  <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[200px]" >
  <Navbar content={NavbarModal} ></Navbar>
  <form onSubmit={DataHandler}>
    <div className=' m-4 flex justify-between' >
<Label text=" Libellé :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={libelle}
onChange={(e) => setLibelle(e.target.value)}
></Input>
    </div>

  <div className="flex justify-between p-4">
  <Button children="Enregistrer"
  type="submit"
  ></Button>
  <Button onClick={() =>  setIsModalOpen(false)} children="Quitter"  ></Button>
  </div>
  </form>
  </Modal>
  <Modal  isOpen={isModalOpene} onClose={() => setIsModalOpene(false)} className="w-[600px] h-[280px]" >
  <Navbar content={NavbarModale} ></Navbar>
  <form onSubmit={DataHandlerPrevision}>
  <div className=' m-4 flex justify-between' >
<Label text=" Type de prévision :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={type_prevision}
onChange={(e)=> setType_prevision(e.target.value)}
></Input>
    </div>
  

    <div className=' m-4 flex justify-between' >
<Label text=" Libellé :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={libelle}
 onChange={(e)=> setLibelle(e.target.value)}
></Input>
    </div>

  <div className="flex justify-between p-4">
  <Button children="Enregistrer"
type="submit"  
  ></Button>
  <Button onClick={() =>  setIsModalOpene(false)} children="Quitter"  ></Button>
  </div>
  </form >
  </Modal>
    </div>
  )
}

export default ChefActionTypePrevision