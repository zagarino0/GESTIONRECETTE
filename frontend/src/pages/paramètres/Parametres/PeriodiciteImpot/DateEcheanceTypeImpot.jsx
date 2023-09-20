import React, { useEffect, useState } from 'react';
import Input from '../../../../components/input/Input';
import Table from '../../../../components/table/Table';
import Label from '../../../../components/title/label';
import Layout from './Layout';
import axios from 'axios';
import {BsPencil} from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Button } from '../../../../components/button/button';
import { Navbar } from '../../../../components/navbar/Navbar';
import Modal from '../../../../components/modals/Modal';
function DateEcheanceTypeImpot() {
  const [dataCode, setDataCode] = useState([]);
  const [searchYear, setSearchYear] = useState('');
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numero_impot , setNumero_impot] = useState('');
  const [type , setType] = useState('');
  const [date_debut_paiement , setDate_debut_paiement] = useState('');
  const [date_fin_paiement , setDate_fin_paiement] = useState('');
  const [annee , setAnnee]= useState('');

  useEffect(() => {
    // Effectuer la requête Axios avec le paramètre d'année lorsque searchYear change
    axios.get(`http://localhost:3500/code/dateecheance/${searchYear}`)
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, [searchYear]);

  const handleDelete = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/dateecheance/${id}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.id !== id));
       // Reset the selection
       // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/dateecheance')
    .then((response) => setDataCode(response.data))
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
 
    numero_impot,
    type,
    date_debut_paiement,
    date_fin_paiement,
    annee

       
  };
  
  console.log(Data)
  try {
     axios.post('http://localhost:3500/code/dateecheance', Data)
     .then((response) => setDataCode(response.data))
     .catch((error) => console.error(error));
    console.log("données ajoutées avec succès " , Data);
    setNumero_impot('');
    setDate_debut_paiement('');
    setDate_fin_paiement('');
    setIsModalOpen(false);
  } catch(error){
console.error("erreur lors de l'ajout de donnée" , error)
  }
    
}

  const headers = ['Code', 'Nature', 'Type', 'Date début Paiement', 'Date fin Paiement', 'Année'];
  const data = dataCode.length > 0
  ? dataCode.map((item) => [
      item.id,
      item.numero_impot,
      item.type,
      item.date_debut_paiement,
      item.date_fin_paiement,
      item.annee,
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
      </span>
    ])
  : [];

  const NavbarModal =(
    <div className='text-white'>
    Paramètrage date d'échèance 
  </div>
  
  )
 
  const content = (
    <div>
      <div className='mt-8 m-4 text-white text-3xl'> 
        Paramètrage date d'échèance 
      </div>
      <div className='flex flex-row m-4 mt-10'>
        <Label text="Année" className="mt-2"></Label>
        <Input
          type='text'
          placeholder='Année'
          className='ml-4'
          value={searchYear}
          onChange={(e) => {
            setSearchYear(e.target.value);
          }}
        />
      </div>
      <Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="m-4" ></Button>
      <div className='mt-10 m-4'>
      {data.length > 0 ? (
        <Table headers={headers} data={data}></Table>
      ) : (
        <p className='text-white text-xl'>Aucun résultat trouvé pour l'année {searchYear}</p>
      )}
    </div>
    <Modal  isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[620px] h-[480px]" >
  <Navbar content={NavbarModal} ></Navbar>
  

    <div className=' m-4 flex justify-between' >
<Label text=" Nature :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.numero_impot : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     numero_impot: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Type :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.type : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     type: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Date de debut du paiement  :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.date_debut_paiement : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     date_debut_paiement: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Date de fin du paiement :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.date_fin_paiement : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     date_fin_paiement: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Année :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.annee : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     annee: e.target.value,
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
        `http://localhost:3500/code/dateecheance/${selectedEditData.id}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/dateecheance')
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
  <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[620px] h-[480px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
<form onSubmit={DataHandler}>
    <div className=' m-4 flex justify-between' >
<Label text=" Nature :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={numero_impot}
onChange={(e)=> setNumero_impot(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Type :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={type}
 onChange={(e)=> setType(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Date de debut du paiement  :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={date_debut_paiement}
onChange={(e)=> setDate_debut_paiement(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Date de fin du paiement :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={date_fin_paiement}
onChange={(e)=> setDate_fin_paiement(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Année :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={annee}
onChange={(e)=> setAnnee(e.target.value)}
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
    </div>
  );

  return (
    <Layout children={content} />
  );
}

export default DateEcheanceTypeImpot;
