import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import {  useLocation } from 'react-router-dom';

// import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Label from '../../../components/title/label';

import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri'
import {BsPencil} from 'react-icons/bs'
import Modal from '../../../components/modals/Modal';
import LayoutPeriodicite from './LayoutPeriodicite';


const Periodicite = ({  currentPath }) => {
  const location = useLocation(); 
  const [dataCode, setDataCode] = useState([]);
  const [dataCodeContent, setDataCodeContent] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [numero_auto , setNumero_auto] = useState('') ;
  const [periode , setPeriode] = useState('');
  const [desc_mois , setDesc_mois] = useState('');
  const [titre , setTitre] = useState('');
  const [p1 , setP1] = useState('');
  const [p2 , setP2] = useState('');
  const [id_clo , setId_clo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [isModalOpenModifiPeriode, setIsModalOpenModifiPeriode] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [selectedExercice, setSelectedExercice] = useState(null);



// controler periodicite 

useEffect(() => {
  // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/code/periodicite')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
}, []);

const handleDelete = (id) => {
  try {
    // Make the DELETE request to your backend API to delete the data by ID
    axios.delete(`http://localhost:3500/code/periodicite/${id}`);

    // Update the list of data after successful deletion
    setDataCode((prevData) => prevData.filter((data) => data.id !== id));

    console.log(`Data with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};








    

    //Links navbar
    // const links = [
    //     { title: "Date cloture", link: "/periodiciteImpot" },
    //     { title: "Périodicité", link: "/periodicite" },
       
       
    //   ];
  
      const headers = ["N° Auto" ,"Périodicité " , "Supression" , "Modification" ];
      const formattedData = dataCode.map(item => [item.numero_auto, item.periode 
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
             </span>
           
      ]);
  
    //Navbar content
  //   const NavbarContent = (
  //       <nav className=" flex items-center justify-between  ">
  //    <div className='text-white font-semibold'>
  // Périodicité
  //     </div>
  //     <ul className="flex">
  //       {links.map((link) => (
  //         <li
  //           key={link.title}
  //           className={`mx-4 
  //           text-center
  //           py-3
  //           px-6 
  //           text-white 
  //           font-semibold
  //           ${currentPath === link.link ? 'bg-[#E96012] rounded-md font-bold hover:scale-110 hover:shadow-xl transition duration-300 ease-in-out ' : ''}
  //         `}
  //         >
  //           <Link to={link.link}>{link.title}</Link>
  //         </li>
  //       ))}
  //     </ul>
  // <BackButton to="/miseAJourParametre"></BackButton>
        
  //   </nav>
  //   )
  
const Headers =["N° Auto" ,"Période " , "Desc_Mois","Titre" ,"P1","P2","Exercice" , "Supression" , "Modification" ];
const Data = dataCode.map(item => [item.numero_auto, item.periode ,item.desc_mois ,item.titre ,item.p1 ,item.p2 , item.cloture
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
           setIsModalOpenModifiPeriode(true);
         }}
       >
         <BsPencil />
       </span>
]);

// controller EXERCICE CLOTURE

useEffect(() => {
  // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/code/datecloture')
    .then((response) => setDataCodeContent(response.data))
    .catch((error) => console.error(error));
}, []);

// Créez une fonction de filtrage
const filterDataByExercice = () => {
  if (selectedExercice) {
    const filtered = Data.filter((item) => item[6] === selectedExercice.value);
    setFilteredData(filtered);
  } else {
    setFilteredData(Data);
  }
};

const rafraichirPage = () => {
  window.location.reload(); // Cette ligne actualisera la page
};

// Utilisez cette fonction dans un useEffect avec selectedExercice comme dépendance
useEffect(() => {
  filterDataByExercice();
}, [selectedExercice]);

const DataHandler =  (e) =>{
  e.preventDefault();
  const Data ={
    numero_auto,
    periode,
    desc_mois,
    titre,
    p1,
    p2,
    id_clo
  };
  
  
  try {
     axios.post('http://localhost:3500/code/periodicite',Data);
    console.log("données ajoutées avec succès " , Data);
    
    setNumero_auto('');
    setPeriode('');
    setDesc_mois('');
    setTitre('');
    setP1('');
    setP2('');
    setId_clo(null);
    setIsModalOpen(false);
    axios.get('http://localhost:3500/code/periodicite')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
  } catch(error){
console.error("erreur lors de l'ajout de donnée" , error)
  }
 }
const NavbarModal =(
  <div className='text-white'>
  Périodicité 
  </div>
)

const contentChildren = (
<div className="bg-[#212122] w-screen h-auto">
<div className='bg-[#212122] flex flex-col  '>
    <div className="flex flex-col">
    <div className='mt-8 h-auto'>
  <Table headers={headers} data={formattedData} className='w-[800px] mx-auto text-center h-auto max-w-full' headerClassName="sticky-header"></Table>
</div>

   <div className='flex flex-col'>
   <div className='flex mt-4 p-2 '>
<Label text="Exercice cloturé :" className="mt-2"></Label>
<Select
  options={dataCodeContent.map((item) => ({
    value: item.cloture,
    label: item.cloture,
  }))}
  value={selectedExercice}
  onChange={(selected) => setSelectedExercice(selected)}
  className="ml-4 w-40"
/>

    </div>
    <div className='mt-3 ml-2 h-auto'>
  <Table headers={Headers} data={filteredData} className="w-[1200px] mx-auto text-center h-auto max-w-ful" headerClassName="sticky-header"></Table>
</div>
<div className='mt-2 mb-2 flex justify-between'>
            <Button children="Ajouter"className="ml-40" onClick={() => setIsModalOpen(true)}></Button>
            <Button children="Actualiser" className="mr-40" onClick={rafraichirPage}></Button>
          </div>
   </div>
   </div>

   <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[1100px] h-[600px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  <form onSubmit={DataHandler}>
  <div className=' m-4 flex justify-between' >
<Label text=" N° Auto:" className="mt-2"></Label>
<Input type="text"  
 value={numero_auto}
 onChange={e => setNumero_auto(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Périodicité :" ></Label>
<Input type="text"  
        value={periode}
        onChange={e => setPeriode(e.target.value)}
        ></Input>
    </div>

    <div className=' m-4 flex justify-between' >
<Label text=" Desc_mois :" ></Label>
<Input type="text"  
value={desc_mois}
onChange={e => setDesc_mois(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Titre:"></Label>
<Input type="text" 
value={titre}
onChange={e => setTitre(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" P1:" ></Label>
<Input type="text" 
value={p1}
onChange={e => setP1(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" P2 :" ></Label>
<Input type="text" 
value={p2}
onChange={e => setP2(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Exercice :"></Label>
<Select
 options={dataCodeContent.map((item) => ({
  value: item.numero,
  label: item.cloture,
}))}
value={dataCodeContent.find((option) => option.value === id_clo)}
onChange={(selected) => setId_clo(selected.value)}
        className="ml-4 w-40"
      />
    </div>
  
    
  <div className='flex justify-between m-4'>

  <Button type="submit" children="Enregistrer" ></Button>

  <Button onClick={() => setIsModalOpen(false)} children="Quitter" ></Button>
  </div>
  </form>
</Modal>
<Modal isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[600px] h-[300px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  
  <div className=' m-4 flex justify-between' >
<Label text=" N° Auto:" className="mt-2"></Label>
<Input type="text" 
 value={selectedEditData ? selectedEditData.numero_auto : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     numero_auto: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Périodicité :" ></Label>
<Input type="text" 
 value={selectedEditData ? selectedEditData.periode : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     periode: e.target.value,
   }))
 }
></Input>
    </div>
<div className="m-4 flex justify-between">

<Button children="Modifier"
 onClick={async () => {
  try {
    // Make the PUT/PATCH request to update the data in the database
    await axios.put(
      `http://localhost:3500/code/periodicite/${selectedEditData.id}`,
      selectedEditData
    );
      // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/code/periodicite')
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

<Button onClick={() => setIsModalOpenModifi(false)} children="Quitter" ></Button>

</div>
</Modal>

<Modal isOpen={isModalOpenModifiPeriode} onClose={() => setIsModalOpenModifiPeriode(false)} className="w-[1100px] h-[600px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  
  <div className=' m-4 flex justify-between' >
<Label text=" N° Auto:" className="mt-2"></Label>
<Input type="text"  className=""
 value={selectedEditData ? selectedEditData.numero_auto : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     numero_auto: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Périodicité :" ></Label>
<Input type="text" className=""
 value={selectedEditData ? selectedEditData.periode : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     periode: e.target.value,
   }))
 }
></Input>
    </div>

    <div className=' m-4 flex justify-between' >
<Label text=" Desc_mois :" ></Label>
<Input type="text"  className=""
 value={selectedEditData ? selectedEditData.desc_mois: ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     desc_mois: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Titre:"></Label>
<Input type="text"  className=""
 value={selectedEditData ? selectedEditData.titre : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     titre: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" P1:" ></Label>
<Input type="text"  className=""
 value={selectedEditData ? selectedEditData.p1 : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     p1: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" P2 :" ></Label>
<Input type="text"  className=""
 value={selectedEditData ? selectedEditData.p2 : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     p2: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Exercice :"></Label>
<Select
 options={dataCodeContent.map((item) => ({
  value: item.numero,
  label: item.cloture,
}))}
  
value={dataCodeContent.find((option) => option.value === selectedEditData?.id_clo)}
onChange={(selectedOption) => {
  setSelectedEditData((prevData) => ({
    ...prevData,
    id_clo: selectedOption.value,
  }));
}}

        className="ml-4 w-40"
      />
    </div>
  
    
  <div className='flex justify-between m-4'>

  <Button children="Modifier" 
   onClick={async () => {
    try {
      // Make the PUT/PATCH request to update the data in the database
      await axios.put(
        `http://localhost:3500/code/periodicite/${selectedEditData.id}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/periodicite')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
      // Update the edited data in dataCode
      setDataCode((prevData) =>
        prevData.map((data) =>
          data.id === selectedEditData.id ? selectedEditData : data
        )
      );
  
      setIsModalOpenModifiPeriode(false);
      setSelectedEditData(null);
      console.log('Data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }}
  ></Button>

  <Button onClick={() => setIsModalOpenModifiPeriode(false)} children="Quitter" ></Button>
  </div>
</Modal>
  </div>
</div>
)

    return (
      <div className='bg-[#212122] h-screen w-screen'>
      <LayoutPeriodicite currentPath={location.pathname} children={contentChildren}></LayoutPeriodicite>
   
    </div>
    )
  }

export default Periodicite