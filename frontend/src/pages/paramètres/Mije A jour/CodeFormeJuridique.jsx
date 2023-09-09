import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri'
import {BsPencil} from 'react-icons/bs'
import { Button } from '../../../components/button/button';
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Modal from '../../../components/modals/Modal';
function CodeFormeJuridique() {
const [dataCode, setDataCode] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
const [selectedEditData, setSelectedEditData] = useState(null);
const [abreviation , setAbreviation] = useState('');
const [libelle , setLibelle] = useState('');
const [ setSelectedData] = useState(null); 
  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/formejuridique')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (code) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/formejuridique/${code}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.code !== code));
      setSelectedData(null); // Reset the selection
  
      console.log(`Data with ID ${code} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const headers = [ "code " , "Abréviation" , "Libellé","",""];
  const formattedData = dataCode.map(item => [item.code, item.abreviation, item.libelle ,
    <span
          key={item.code} // Make sure to use a unique key
          className='cursor-pointer'
          onClick={() => handleDelete(item.code)}
        >
          <RiDeleteBinLine />
        </span>,
          <span
           key={`edit-${item.code}`} // Make sure to use a unique key
           className='cursor-pointer'
           onClick={() => {
             setSelectedEditData(item);
             setIsModalOpenModifi(true);
           }}
         >
           <BsPencil />
         </span>,]);
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour code forme juridique
    </div>
    <div>
      <BackButton to="/miseAJourParametre"></BackButton>
    </div>
</div>
  )
  const NavbarModal =(
    <div className='text-white'>
Modifier le code d'activiter
</div>

)
const DataHandler =  (e) =>{
  e.preventDefault();
  const FormeJuridique ={
    libelle,
    abreviation    
  };
  
  console.log(FormeJuridique)
  try {
     axios.post('http://localhost:3500/code/formejuridique', FormeJuridique)
     .then((response) => setDataCode(response.data))
     .catch((error) => console.error(error));
    console.log("données ajoutées avec succès " , FormeJuridique);
    setIsModalOpen(false)
  } catch(error){
console.error("erreur lors de l'ajout de donnée" , error)
  }
    
}

  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="m-4" ></Button>
    <div className=' bg-[#212122] p-4 flex justify-center' >
        <Table headers={headers} data={formattedData} className="w-[1000px]"></Table>
          </div>
          <Modal  isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[600px] h-[280px]" >
  <Navbar content={NavbarModal} ></Navbar>
  


    <div className=' m-4 flex justify-between' >
<Label text=" Abréviation :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.abreviation : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     abreviation: e.target.value,
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
        `http://localhost:3500/code/formejuridique/${selectedEditData.code}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/formejuridique')
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
  <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[280px]" >
  <Navbar content={NavbarModal} ></Navbar>
  <form onSubmit={DataHandler} >
  
    <div className=' m-4 flex justify-between' >
<Label text=" Abréviation :" className="mt-2"></Label>
<Input type="text"  className="ml-4"

value={abreviation}
onChange={e => setAbreviation(e.target.value)} 
></Input>
    </div>

    <div className=' m-4 flex justify-between' >
<Label text=" Libellé :" className="mt-2"></Label>
<Input type="text"  className="ml-4"

value={libelle}
onChange={e => setLibelle(e.target.value)}
></Input>
    </div>
  <div className="flex justify-between p-4">
  <Button type="submit" children="Enregistrer" ></Button>
  <Button onClick={() =>  setIsModalOpen(false)} children="Quitter"  ></Button>
  </div>
  </form >

  </Modal>
  </div>
  )
}

export default CodeFormeJuridique