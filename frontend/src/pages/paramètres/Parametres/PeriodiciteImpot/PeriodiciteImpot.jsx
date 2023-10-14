import React, { useEffect, useState } from 'react'
import Table from '../../../../components/table/Table'
import Layout from './Layout'
import axios from 'axios';
import {BsPencil} from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Button } from '../../../../components/button/button';
import Input from '../../../../components/input/Input';
import Label from '../../../../components/title/label';
import { Navbar } from '../../../../components/navbar/Navbar';
import Modal from '../../../../components/modals/Modal';
function PeriodiciteImpotParametre() {
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ setJour] = useState('');
  const [motif , setMotif] = useState('');
  const [date , setDate] = useState('');
  const NavbarModal =(
    <div className='text-white'>
  Périodicité des impots
  </div>
  
  )

  function getDayFromDate(selectedDate) {
    const date = new Date(selectedDate);
    const options = { weekday: 'long' }; // Vous pouvez personnaliser le format du jour si nécessaire
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }
  
  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/jourferie')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/jourferie/${id}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.id !== id));
       // Reset the selection
       // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/jourferie')
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
 const day = getDayFromDate(date);
  const Data ={
 
    date,
    jour: day, 
    motif
       
  };
  
  console.log(Data)
  try {
     axios.post('http://localhost:3500/code/jourferie', Data)
     .then((response) => setDataCode(response.data))
     .catch((error) => console.error(error));
    console.log("données ajoutées avec succès " , Data);
    setDate('');
    setJour('');
    setMotif('');
    setIsModalOpen(false);
  } catch(error){
console.error("erreur lors de l'ajout de donnée" , error)
  }
    
}

  const headers = ['Date', 'Jour', 'Motif' , "" ,""];
  const data =  dataCode.map(item => [item.date, item.jour , item.motif    ,
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
    </span>]);
 const content = (
  <div>
  <div className='m-4 text-white text-3xl'> 
    Périodicité des impots
  </div>
  <Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="ml-2" ></Button>
  <div className='mt-4 m-4' >
<Table headers={headers} data={data} ></Table>
      </div>
      <Modal  isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[600px] h-[300px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  <div className=' m-4 flex justify-between' >
    <Label text=" Date :" className="mt-2"></Label>
    <Input type="date" className="ml-4"
      value={selectedEditData ? selectedEditData.date : ''}
      onChange={(e) =>
        setSelectedEditData((prevData) => ({
          ...prevData,
          date: e.target.value,
          jour: getDayFromDate(e.target.value), // Mettez à jour également le jour ici
        }))
      }
    ></Input>
  </div>
 
    <div className=' m-4 flex justify-between' >
<Label text=" Motif :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.motif : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     motif: e.target.value,
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
        `http://localhost:3500/code/jourferie/${selectedEditData.id}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/jourferie')
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
  <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[300px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
<form onSubmit={DataHandler}>
    <div className=' m-4 flex justify-between' >
<Label text=" Date :" className="mt-2"></Label>
<Input type="date"  className="ml-4"
value={date}
onChange={(e)=> setDate(e.target.value)}
></Input>
    </div>
 
    <div className=' m-4 flex justify-between' >
<Label text=" Motif :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={motif}
 onChange={(e)=> setMotif(e.target.value)}
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
 )
return (
 <Layout children={content}>

 </Layout>
  )
}

export default PeriodiciteImpotParametre