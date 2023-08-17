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

function PeriodiciteImpot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);

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

    const headers = ["N° Auto" ,"Cloture " , "" ];
    const formattedData = dataCode.map(item => [item.numero, item.cloture ,
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
<Table headers={headers} data={formattedData} ></Table>

    </div>
    <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[220px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  

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
        `http://localhost:3500/code/datecloture/${selectedEditData.numero}`,
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