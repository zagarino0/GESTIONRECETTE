import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import { Navbar } from '../../../components/navbar/Navbar';
import Modal from '../../../components/modals/Modal';
import axios from 'axios';
import Table from '../../../components/table/Table';
import BackButton from '../../../components/button/BackButton';
import { BsPencil } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';

function Impot() {
    const [dataCode, setDataCode] = useState([]);
    const [selectedEditData, setSelectedEditData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
    const [ setSelectedData ] = useState(null);
    const [libelle , setLibelle] = useState('');
    const [nature , setNature] = useState('');
    
    
    useEffect(() => {
      // Récupérer les données depuis le backend
      axios.get('http://localhost:3500/code/codeactivite')
        .then((response) => setDataCode(response.data))
        .catch((error) => console.error(error));
    }, []);
  
  
    const handleDelete = (code) => {
      try {
        // Make the DELETE request to your backend API to delete the data by ID
        axios.delete(`http://localhost:3500/code/codeactivite/${code}`);
    
        // Update the list of data after successful deletion
        setDataCode((prevData) => prevData.filter((data) => data.code !== code));
        setSelectedData(null); // Reset the selection
    
        console.log(`Data with ID ${code} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };
    const headers = ['PCOP', 'Libellé activité', 'Nature (Tableau )', 'supprimer', 'modifier'];
    const formattedData = dataCode.map(item => [item.code, item.libelle, item.nature ,
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
  Mise à jour  Impôt
      </div>
      <div>
        <BackButton to="/miseAJourParametre"></BackButton>
      </div>
  </div>
    )
    const NavbarModal =(
      <div className='text-white'>
  Impôt
  </div>
  
  )
  
  const DataHandler =  (e) =>{
    e.preventDefault();
    const Activite ={
      libelle,
      nature
      
    };
    
    console.log(Activite)
    try {
       axios.post('http://localhost:3500/code/codeactivite', Activite)
       .then((response) => setDataCode(response.data))
       .catch((error) => console.error(error));
      console.log("données ajoutées avec succès " , Activite);
      setIsModalOpen(false)
    } catch(error){
  console.error("erreur lors de l'ajout de donnée" , error)
    }
      
  }
  
    return (
      <div className='bg-[#212122] h-screen w-screen'>
        <Navbar content={NavbarContent}></Navbar>
        <Button children="Ajouter un activiter" onClick={() => setIsModalOpen(true)} className="m-4" ></Button>
        <div className=' bg-[#212122] flex justify-center p-4' >
  <Table headers={headers} data={formattedData } className='w-[1300px]' ></Table>
        </div>
        <Modal  isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[600px] h-[280px]" >
    <Navbar content={NavbarModal} ></Navbar>
    
   
      <div className=' m-4 flex justify-between' >
  <Label text=" Libéllé d'activité :" className="mt-2"></Label>
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
  
      <div className=' m-4 flex justify-between' >
  <Label text=" Nature(Tableau) :" className="mt-2"></Label>
  <Input type="text"  className="ml-4 w-60"
   value={selectedEditData ? selectedEditData.nature : ''}
   onChange={(e) =>
     setSelectedEditData((prevData) => ({
       ...prevData,
       nature: e.target.value,
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
          `http://localhost:3500/code/codeactivite/${selectedEditData.code}`,
          selectedEditData
        );
          // Récupérer les données depuis le backend
      axios.get('http://localhost:3500/code/codeactivite')
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
  <Label text=" Libéllé d'activité :" className="mt-2"></Label>
  <Input type="text"  className="ml-4 w-60"
   value={libelle}
   onChange={e => setLibelle(e.target.value)}
  ></Input>
      </div>
  
      <div className=' m-4 flex justify-between' >
  <Label text=" Nature(Tableau) :" className="mt-2"></Label>
  <Input type="text"  className="ml-4 w-60"
  value={nature}
  onChange={e => setNature(e.target.value)}
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

export default Impot