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

function PCOCPAffectation() {
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [isModalOpenModifie, setIsModalOpenModifie] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpene, setIsModalOpene] = useState(false);
  const [selectedData, setSelectedData] = useState(null); 
  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/numerobudget')
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
  

    const [dataCodeContent, setDataCodeContent] = useState([]);

  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/affectationbudgetaire')
      .then((response) => setDataCodeContent(response.data))
      .catch((error) => console.error(error));
  }, []);
 const [dataImpot , setDataImpot] = useState([]);
 useEffect(() => {

  // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/code/impot')
    .then((response) => setDataImpot(response.data))
    .catch((error) => console.error(error));
}, []);
  const headers = ["numéro" ,"LIBELLE " ,"", "" ];
  const formattedData = dataCode.map(item => [item.numero, item.libelle
    ,
    <span
      key={item.id}
      className='cursor-pointer'
      onClick={() => handleDelete(item.id)}
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
    </span>,
  ]);
  const headerContent = ["Impot" ,"Budget" ,"Taux" ,"PCOP" , "", "" ];
  const dataContent = dataCodeContent.map(item => [item.impot, item.budget , item.taux , item.pcop
    ,
    <span
      key={item.id}
      className='cursor-pointer'
      onClick={() => handleDelete(item.id)}
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
  const headerContentTable = ["N ° Impot" ,"Libellé" ,"Abrev" ,"PCOP","N° Budget","N° Classe" , "Chapitre" , "Groupe d'impot" ,"", ""];
  const dataContentTable = dataImpot.map(item => [item.numero_impot, item.libellé , item.abreviation , item.pcop , item.numero_budget , item.numero_classes , item.chapitre , item.groupe_impot
    ,
    <span
      key={item.id}
      className='cursor-pointer'
      onClick={() => handleDelete(item.id)}
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
Mise à jour budgets et classe pour les impots
    </div>
    <div>
      <BackButton to="/parametreParametre"></BackButton>
    </div>
</div>
  )

  const NavbarModal =(
    <div className='text-white'>
  NUMERO BUDGET
  </div>
  
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
<div className='flex  justify-between '>
<div className="flex flex-col">
<div className='flex flex-col mt-4'>
<div className='text-white m-4'>NUMERO BUDGET
<Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="ml-2" ></Button>
</div>
  <div className='flex'>
    
  <div className=' ml-4' >
<Table headers={headers} data={formattedData} classTable="overflow-y-auto h-36" ></Table>
    </div>
  </div>
</div>
<div className='flex flex-col'>
<div className='text-white m-4'>Affectation Budgetaire
<Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="ml-2" ></Button>
</div>
  <div className='flex'>
    
  <div className=' ml-4' >
<Table headers={headerContent} data={dataContent} classTable="overflow-y-auto h-36"></Table>
    </div>
  </div>
</div>
</div>
<div className=' m-4'>
<div className='text-white m-4'>CODE IMPOTS , BUDGETS , CLASSES
<Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="ml-2" ></Button>
</div>
<Table headers={headerContentTable} data={dataContentTable}  classTable="overflow-y-auto w-[800px]" ></Table>
</div>
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
  <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[280px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  <div className=' m-4 flex justify-between' >
<Label text=" Numéro :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
></Input>
    </div>
  

    <div className=' m-4 flex justify-between' >
<Label text=" Libellé :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
></Input>
    </div>

  <div className="flex justify-between p-4">
  <Button children="Enregistrer"
  ></Button>
  <Button onClick={() =>  setIsModalOpen(false)} children="Quitter"  ></Button>
  </div>
  </Modal>
  <Modal  isOpen={isModalOpenModifie} onClose={() => setIsModalOpenModifie(false)} className="w-[600px] h-[280px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  <div className=' m-4 flex justify-between' >
<Label text=" Impot :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.impot : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     impot: e.target.value,
   }))
 }
></Input>
    </div>
  

    <div className=' m-4 flex justify-between' >
<Label text=" Budget :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.budget : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     budget: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Taux :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.taux : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
    taux: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" pcop :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.pcop : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     pcop: e.target.value,
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

      setIsModalOpenModifi(false);
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
  </div>
  )
}

export default PCOCPAffectation