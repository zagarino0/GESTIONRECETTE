import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Button } from '../../../components/button/button'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import axios from 'axios'
import Input from '../../../components/input/Input'
import { RiDeleteBinLine } from 'react-icons/ri'
import {BsPencil} from 'react-icons/bs'
import Modal from '../../../components/modals/Modal'
import Label from '../../../components/title/label'
import Select from 'react-select'


function CodeCollectivite() {
  const [dataCode, setDataCode] = useState([]);
  const [libelle , setLibelle] = useState([]);
  const [fokontany , setFokontany] = useState([]);
  const [arrondissement , setArrondissement ] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
 // État pour stocker la liste des données
  const [ setSelectedData] = useState(null); 

  const [selectedEditData, setSelectedEditData] = useState(null);
 // La valeur initiale peut être définie selon vos besoins

  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    
    // Ajoutez vos options ici
  ];  

  const DataHandler =  (e) =>{
    e.preventDefault();
    const Fokotany ={
      libelle,
      fokontany,
      arrondissement
    };
    
    console.log(Fokotany)
    try {
       axios.post('http://localhost:3500/code/geographique', Fokotany);
      console.log("données ajoutées avec succès " , Fokotany);
      setLibelle('');
      setFokontany('');
      setArrondissement('');  
      axios.get('http://localhost:3500/code/geographique')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
    } catch(error){
console.error("erreur lors de l'ajout de donnée" , error)
    }
   }


   useEffect(() => {
   
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/geographique')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);


  const handleDelete = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/geographique/${id}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.id !== id));
      setSelectedData(null); // Reset the selection
  
      console.log(`Data with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Niveau de Décentralisation
    </div>
    <div>
      <BackButton to="/miseAJourParametre"></BackButton>
    </div>
</div>
  )
  const headers = [  "Arrondissement ","Code Fokontany","Fokotany", "" , ""];
  const formattedData = dataCode.map((item) => [
    
    item.arrondisement,
    item.fokontany,
    item.libelle,
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
      setIsModalOpen(true);
    }}
  >
    <BsPencil />
  </span>,
  ]);
  const NavbarModal =(
    
    <div className='text-white'>
    Modification code fokontany
    </div>
    
  )

  const rafraichirPage = () => {
    window.location.reload(); // Cette ligne actualisera la page
  };

  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
  <form onSubmit={DataHandler}>
      <div className='mt-24 m-4 '  >
    <div className='overflow-y-auto h-40'>
    <Table headers={headers} data={formattedData} className="w-[1000px] " ></Table>
    </div>
    <div className="flex flex-row ml-4">
    <Input type="text" placeholder="Fokotany"
    value={libelle}
    onChange={e => setLibelle(e.target.value)}
    className=" m-4 w-60"
    ></Input>
    <Input type="text" placeholder="Code Fokotany"
    value={fokontany}
    onChange={e => setFokontany(e.target.value)}
    className=" m-4 w-60"
    ></Input>
     <Select
 options={options}
 value={options.find((option) => option.value === arrondissement)}
 onChange={(selectedOption) => setArrondissement(selectedOption.value)}
 className=" m-4 w-40"
/>

     <Button type="submit" children="Ajouter" className="m-2 h-12"></Button>
    
    </div>
    </div>
  
  </form>
  <Button  children="Actualiser" className="ml-12"  onClick={rafraichirPage}></Button>
  <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[360px]" >
  <Navbar content={NavbarModal} ></Navbar>
  <div className=' m-4 flex justify-between' >
<Label text=" Arondissemnent :" className="mt-2"></Label>
   <Select
   options={options}
   value={options.find((option) => option.value === selectedEditData?.arrondissement)}
   onChange={(selectedOption) => {
     setSelectedEditData((prevData) => ({
       ...prevData,
       arrondissement: selectedOption.value,
     }));
   }}
   className="m-4 w-40"
 />

    </div>  
    <div className=' m-4 flex justify-between' >
<Label text=" Code Fokontany :" className="mt-2"></Label>
<Input type="text"  className="ml-4 w-60"
 value={selectedEditData ? selectedEditData.fokontany : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     fokontany: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Fokotany :" className="mt-2"></Label>
<Input type="text"  className="ml-4 w-60"
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
        `http://localhost:3500/code/geographique/${selectedEditData.id}`,
        selectedEditData
      );

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
  <Button onClick={() => setIsModalOpen(false)} children="Quitter"  ></Button>
  </div>
  </Modal>
  </div>
  )
}

export default CodeCollectivite