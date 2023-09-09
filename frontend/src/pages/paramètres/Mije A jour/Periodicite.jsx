import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Label from '../../../components/title/label';
import { states } from '../../../states/states';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri'
import {BsPencil} from 'react-icons/bs'
import Modal from '../../../components/modals/Modal';


function Periodicite() {
  const [dataCode, setDataCode] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [numero_auto , setNumero_auto] = useState('') ;
  const [periode , setPeriode] = useState('');
  const [desc_mois , setDesc_mois] = useState('');
  const [titre , setTitre] = useState('');
  const [p1 , setP1] = useState('');
  const [p2 , setP2] = useState('');
  const [id_clo , setId_clo] = useState('');
  const [searchData , setSearchData] = useState([]);
  const [selectedData, setSelectedData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [isModalOpenModifiPeriode, setIsModalOpenModifiPeriode] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState(null);
  

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/periodicite')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);


  // État pour stocker les options du Select
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    // Récupérez les options depuis la base de données
    axios.get('http://localhost:3500/code/datecloture')
      .then((response) => {
        // Transformez les données en format requis par le Select
        const formattedOptions = response.data.map((item) => ({
          value: item.cloture,
          label: item.cloture,
        }));
        // Mettez à jour l'état des options
        setSelectOptions(formattedOptions);
      })
      .catch((error) => console.error(error));
  }, []);


    const { selectedLink } = useSnapshot(states);

    //Links navbar
    const links = [
        { title: "Date cloture", link: "/periodiciteImpot" },
        { title: "Périodicité", link: "/periodicite" },
       
       
      ];
  
      const headers = ["N° Auto" ,"Périodicité " , "" , "" ];
      const formattedData = dataCode.map(item => [item.numero_auto, item.periode 
      ,
              <span
               key={`edit-${item.numero_auto}`} // Make sure to use a unique key
               className='cursor-pointer'
               onClick={() => {
                 setSelectedEditData(item);
                 setIsModalOpenModifi(true);
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
    // État pour stocker la valeur sélectionnée
  const [selectedValue, setSelectedValue] = useState(''); // La valeur initiale peut être définie selon vos besoins

 
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
const Headers =["N° Auto" ,"Période " , "Desc_Mois","Titre" ,"P1","P2","Exercice" , "" , "" ];
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
       key={`edit-${item.numero_auto}`} // Make sure to use a unique key
       className='cursor-pointer'
       onClick={() =>( setSelectedEditData(item),
        setIsModalOpenModifiPeriode(true)
) 
               }
     >
       <BsPencil />
     </span>,
]);

useEffect(() => {
  // Vérifiez si une valeur est sélectionnée
  if (selectedValue) {
    const filtered = Data.filter((item) => item[6] === selectedValue.value); // Utilisez la colonne appropriée pour la comparaison
    setFilteredData(filtered);
  } else {
    // Si aucune valeur n'est sélectionnée, affichez toutes les données
    setFilteredData(Data);
  }
}, [selectedValue, Data]);

const NavbarModal =(
  <div>
  <div className='text-white'>
  Périodicité 
  </div>
  </div>
)
const NavbarModalModifi =(
  <div>
  <div className='text-white'>
  Périodicité 
  </div>
  </div>
)

const DataHandler =  (e) =>{
  e.preventDefault();
  const Periodicite ={
    numero_auto,
    periode,
    desc_mois,
    titre,
    p1,
    p2,
    id_clo
  };
  
  
  try {
     axios.post('http://localhost:3500/code/periodicite',Periodicite);
    console.log("données ajoutées avec succès " , Periodicite);
    setIsModalOpen(false)
    axios.get('http://localhost:3500/code/periodicite')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
    
  } catch(error){
console.error("erreur lors de l'ajout de donnée" , error)
  }
 }
    return (
      <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
   <div className="flex justify-between">
   <div className='mt-32 p-4 bg-[#212122]' >
  <Table headers={headers} data={formattedData} className="w-[100px]" ></Table>
      </div>
   <div className='flex flex-col'>
   <div className='flex mt-4 p-4 bg-[#212122]'>
<Label text="Exercice cloturé :" className="mt-2"></Label>
<Select
        options={selectOptions}
        value={selectedValue}
        onChange={(selected) => setSelectedValue(selected)}
        className="ml-4 w-40"
      />
    </div>
    <div className="mt-4 p-4 bg-[#212122]">
    <Table headers={Headers} data={filteredData} ></Table>

    </div>
    <div className='mt-2 p-2 '>
<Button children="Ajouter" className="h-16" onClick={() => setIsModalOpen(true)}></Button>

    </div>
   </div>
   </div>

   <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[1100px] h-[600px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  <form onSubmit={DataHandler} >
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
<Input type="text" 
value={id_clo}
onChange={e => setId_clo(e.target.value)}
></Input>
    </div>
  
    
  <div className='flex justify-between m-4'>

  <Button type="submit" children="Enregistrer" ></Button>

  <Button onClick={() => setIsModalOpen(false)} children="Quitter" ></Button>
  </div>
  </form>
</Modal>
<Modal isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[600px] h-[300px]" >
  <Navbar content={NavbarModalModifi} ></Navbar>
  
  
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
<Input type="text" className=""></Input>
    </div>
<div className="m-4 flex justify-between">

<Button children="Enregistrer" ></Button>

<Button onClick={() => setIsModalOpenModifi(false)} children="Quitter" ></Button>

</div>
</Modal>

<Modal isOpen={isModalOpenModifiPeriode} onClose={() => setIsModalOpenModifiPeriode(false)} className="w-[1100px] h-[600px]" >
  <Navbar content={NavbarModal} ></Navbar>
  
  
  <div className=' m-4 flex justify-between' >
<Label text=" N° Auto:" className="mt-2"></Label>
<Input type="text"  className=""></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Périodicité :" ></Label>
<Input type="text" className=""></Input>
    </div>

    <div className=' m-4 flex justify-between' >
<Label text=" Desc_mois :" ></Label>
<Input type="text"  className=""></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Titre:"></Label>
<Input type="text"  className="h-8"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" P1:" ></Label>
<Input type="text"  className=""></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" P2 :" ></Label>
<Input type="text"  className=""></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Exercice :"></Label>
<Input type="text"  className=""></Input>
    </div>
  
    
  <div className='flex justify-between m-4'>

  <Button children="Enregistrer" ></Button>

  <Button onClick={() => setIsModalOpenModifiPeriode(false)} children="Quitter" ></Button>
  </div>
</Modal>
    </div>
    )
  }

export default Periodicite