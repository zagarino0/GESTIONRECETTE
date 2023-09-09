import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import { states } from '../../../states/states';
import axios from 'axios';
import {BsPencil} from 'react-icons/bs'
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Modal from '../../../components/modals/Modal';
import { RiDeleteBinLine } from 'react-icons/ri'

function PeriodiciteImpot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [ setSelectedData] = useState(null); 
  const [cloture , setCloture] = useState([]);
  const [numero , setNumero] = useState([]);
  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/datecloture')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const { selectedLink } = useSnapshot(states);

  //Links navbar
  const links = [
      { title: "Date cloture", link: "/periodiciteImpot" },
      { title: "Périodicité", link: "/periodicite" },
     
     
    ];
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
    const DataHandler =  (e) =>{
      e.preventDefault();
      const Cloture ={
        numero,
        cloture
      };
      
      
      try {
         axios.post('http://localhost:3500/code/datecloture',Cloture);
        console.log("données ajoutées avec succès " , Cloture);
        setCloture('');
        setNumero('');

        axios.get('http://localhost:3500/code/datecloture')
        .then((response) => setDataCode(response.data))
        .catch((error) => console.error(error));
      } catch(error){
  console.error("erreur lors de l'ajout de donnée" , error)
      }
     }
    const headers = ["N° Auto" ,"Cloture " , "" , "" ];
    const formattedData = dataCode.map(item => [item.numero, item.cloture ,

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

  

  //Navbar content
  const NavbarContent = (
      <nav className=" flex items-center justify-between  ">
   <div className='text-white'>
Périodicité
    </div>
    <ul className="flex">
      {links.map((link) => (
        <li
          key={link.title}
          className={`mx-4 
          hover:bg-[#E96012] 
          text-center
          py-3
          px-6 
          text-white 
          text-bold 
          hover:scale-110
          hover:shadow-xl 
          transition 
          duration-300 
          ease-in-out
          ${
            selectedLink === link.title.toLowerCase() 
            
          } `}
        >
          <Link to={link.link}>{link.title}</Link>
        </li>
      ))}
    </ul>
<BackButton to="/miseAJourParametre"></BackButton>
      
  </nav>
  )
  const NavbarModal =(
        <div className='text-white'>
    Date de cloture
    </div>
    
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-24 flex bg-[#212122] justify-center p-4' >
     <form onSubmit={DataHandler} >
       <div className='flex flex-col mr-4'>
        <Input type="text" className="h-16 " placeholder="N° Auto"
        value={numero}
        onChange={e => setNumero(e.target.value)}
        ></Input>
        <Input type="text"  className="h-16 mt-4" placeholder="Date cloture"
        value={cloture}
        onChange={e => setCloture(e.target.value)}
        ></Input>
        <Button children="Ajouter" type="submit" className="h-16 mt-4"></Button>
      </div>
     </form>
<Table headers={headers} data={formattedData} ></Table>

    </div>
    <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[260px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  <div className=' m-4 flex justify-between' >
<Label text=" N° Auto :" className="mt-2"></Label>
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
<Label text=" Date de Cloture :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.cloture : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     cloture: e.target.value,
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
  <Button onClick={() => setIsModalOpen(false)} children="Quitter"  ></Button>
  </div>
  </Modal>
  </div>
  )
}

export default PeriodiciteImpot