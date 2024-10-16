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
import ReactSelect from 'react-select';
function PCOCPAffectation() {
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [isModalOpenModifiAffection, setIsModalOpenModifiAffection] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numero ] = useState('');
  const [libelle , setLibelle] = useState('');
  const [isModalOpenAffection, setIsModalOpenAffection] = useState(false);
  const [isModalOpenImpot, setIsModalOpenImpot] = useState(false);
  const [isModalOpenModifiImpot, setIsModalOpenModifiImpot] = useState(false);
  const [setSelectedData] = useState(null); 

// Controller Numero budget CREATE READ DELETE

  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/numerobudget')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (numero) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/numerobudget/${numero}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.id !== numero));
      setSelectedData(null); // Reset the selection
          // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/numerobudget')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
      console.log(`Data with ID ${numero} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  

  // ajout donnée controller 
  const DataHandler =  (e) =>{
    e.preventDefault();
    const Data ={
      numero,
      libelle
         
    };
    
    console.log(Data)
    try {
       axios.post('http://localhost:3500/code/numerobudget', Data)
       .then((response) => setDataCode(response.data))
       .catch((error) => console.error(error));
      console.log("données ajoutées avec succès " , Data);
      setIsModalOpen(false)
    } catch(error){
  console.error("erreur lors de l'ajout de donnée" , error)
    }
      
  }
  const headers = ["numéro" ,"LIBELLE " ,"supp", "mod" ];
  const formattedData = dataCode.map(item => [item.numero, item.libelle
    ,
    <span
      key={item.numero}
      className='cursor-pointer'
      onClick={() => handleDelete(item.numero)}
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

  // Controller Affection budgetaire CREATE READ DELETE

    const [dataCodeContent, setDataCodeContent] = useState([]);
    const [impot , setImpot] = useState('');
    const [budget , setBudget] = useState('');
    const [taux , setTaux] = useState('');
    const [pcop , setPcop] = useState('');
    // ajout donnée controller 
  const DataHandlerAffectation =  (e) =>{
    e.preventDefault();
    const Data ={
      impot,
      budget,
      taux,
      pcop
         
    };
    
    console.log(Data)
    try {
       axios.post('http://localhost:3500/code/affectationbudgetaire', Data)
       .then((response) => setDataCodeContent(response.data))
       .catch((error) => console.error(error));
      console.log("données ajoutées avec succès " , Data);
      // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/affectationbudgetaire')
    .then((response) => setDataCodeContent(response.data))
    .catch((error) => console.error(error));
      setIsModalOpenAffection(false)
    } catch(error){
  console.error("erreur lors de l'ajout de donnée" , error)
    }
      
  }

  const handleDeleteAffectation = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/affectationbudgetaire/${id}`);
  
      // Update the list of data after successful deletion
      setDataCodeContent((prevData) => prevData.filter((data) => data.id !== id));
      setSelectedData(null); // Reset the selection
          // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/affectationbudgetaire')
    .then((response) => setDataCodeContent(response.data))
    .catch((error) => console.error(error));
      console.log(`Data with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };


  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/affectationbudgetaire')
      .then((response) => setDataCodeContent(response.data))
      .catch((error) => console.error(error));
  }, []);


  
  const headerContent = ["Impot" ,"Budget" ,"Taux" ,"PCOP" , "supp", "mod" ];
  const dataContent = dataCodeContent.map(item => [item.impot, item.budget , item.taux , item.pcop
    ,
    <span
      key={item.id}
      className='cursor-pointer'
      onClick={() => handleDeleteAffectation(item.id)}
    >
      <RiDeleteBinLine />
    </span>,
    <span
      key={`edit-${item.id}`}
      className='cursor-pointer'
      onClick={() => {
        setSelectedEditData(item);
        setIsModalOpenModifiAffection(true);
      }}
    >
      <BsPencil />
    </span>,
  ]);


  // libelle budget option
 
  const NumeroBudget = dataCode.map((data) => ({
    value : data.libelle ,
    label : data.libelle
  }))

// numéro PCOP options 

const PCOP = dataCodeContent.map((data) => ({
  value : data.pcop ,
  label : data.pcop
}))


  // Controller Code impot budget classes CREATE READ DELETE

  
  const [dataImpot , setDataImpot] = useState([]);
  
  const [abreviation , setAbreviation] = useState('');
  const [numero_budget , setNumero_budget] = useState('');
  const [numero_classes , setNumero_classes] = useState('');
  const [chapitre , setChapitre] = useState('');
  const [groupe_impot , setGroupe_impot] = useState('');
  console.log(numero_budget)  
  useEffect(() => {
 
   // Récupérer les données depuis le backend
   axios.get('http://localhost:3500/code/impot')
     .then((response) => setDataImpot(response.data))
     .catch((error) => console.error(error));
 }, []);
    // ajout donnée controller 
    const DataHandlerImpot =  (e) =>{
      e.preventDefault();
      const Data ={
        libelle,
        abreviation,
        numero_budget,
        pcop,
        numero_classes,
        chapitre ,
        groupe_impot
           
      };
      
      console.log(Data)
      try {
         axios.post('http://localhost:3500/code/impot', Data)
         .then((response) => setDataImpot(response.data))
         .catch((error) => console.error(error));
        console.log("données ajoutées avec succès " , Data);
        // Récupérer les données depuis le backend
      axios.get('http://localhost:3500/code/impot')
      .then((response) => setDataImpot(response.data))
      .catch((error) => console.error(error));
        setIsModalOpenImpot(false)
      } catch(error){
    console.error("erreur lors de l'ajout de donnée" , error)
      }
        
    }

    // Delete code Impot 
    const handleDeleteImpot = (numero_impot) => {
      try {
        // Make the DELETE request to your backend API to delete the data by ID
        axios.delete(`http://localhost:3500/code/impot/${numero_impot}`);
    
        // Update the list of data after successful deletion
        setDataImpot((prevData) => prevData.filter((data) => data.id !== numero_impot));
        setSelectedData(null); // Reset the selection
            // Récupérer les données depuis le backend
      axios.get('http://localhost:3500/code/impot')
      .then((response) => setDataImpot(response.data))
      .catch((error) => console.error(error));
        console.log(`Data with ID ${numero_impot} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };
  
  

  const headerContentTable = ["N ° Impot" ,"Libellé" ,"Abrev" ,"PCOP"," Budget","N° Classe" , "Chapitre" , "Groupe d'impot" ,"SUPP", "MOD"];
  const dataContentTable = dataImpot.map(item => [item.numero_impot, item.libelle , item.abreviation , item.pcop , item.numero_budget , item.numero_classes , item.chapitre , item.groupe_impot
    ,
    <span
      key={item.numero_impot}
      className='cursor-pointer'
      onClick={() => handleDeleteImpot(item.numero_impot)}
    >
      <RiDeleteBinLine />
    </span>,
    <span
      key={`edit-${item.id}`}
      className='cursor-pointer'
      onClick={() => {
        setSelectedEditData(item);
       setIsModalOpenModifiImpot(true);
      }}
    >
      <BsPencil />
    </span>,
  ]);


  //Navbar Modal
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
   const NavbarModalAffectation =(
    <div className='text-white'>
  Affectation Budgetaire
  </div>
  )
   const NavbarModalImpot =(
    <div className='text-white'>
  CODE IMPOTS , BUDGETS , CLASSES
  </div>
  
  )
  return (
    <div className='bg-[#212122] '>
    <Navbar content={NavbarContent}></Navbar>
<div className='flex  justify-between '>
<div className="flex flex-col">

  <div className='flex flex justify-between mr-4 ml-4'>

  <div className='flex flex-col mt-4 '>

<div className='text-white m-4'>NUMERO BUDGET
<Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="ml-2" ></Button>
</div>

<div className='flex  '>   
<div className=' ml-4 mb-4' >
<Table headers={headers} data={formattedData} classTable="overflow-y-auto h-60" ></Table>
</div>
</div>
</div>{/**table0 */}

<div className='mt-4'>
<div className='text-white m-4'>Affectation Budgetaire
<Button children="Ajouter une information" onClick={() => setIsModalOpenAffection(true)} className="ml-2" ></Button>
</div>
<div className='flex '>

<div className=' ml-4 mb-4' >
<Table headers={headerContent} data={dataContent} classTable="overflow-y-auto h-60"></Table>
</div>
</div>
</div>{/**table1 */}

  </div>
      
              <div className=' justify-center mt-6 m-4 '>
          <div className='text-white m-4'>CODE IMPOTS , BUDGETS , CLASSES
          <Button children="Ajouter une information" onClick={() => setIsModalOpenImpot(true)} className="ml-2" ></Button>
          </div>
          <Table headers={headerContentTable} data={dataContentTable}  classTable="overflow-y-auto w-[1300px]" ></Table>
             </div>{/**table2 */}
</div>

         
</div>
<Modal  isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[600px] h-[200px]" >
  <Navbar content={NavbarModal} ></Navbar>
  

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
        `http://localhost:3500/code/numerobudget/${selectedEditData.numero}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/numerobudget')
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
  <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[200px]" >
  <Navbar content={NavbarModal} ></Navbar>
  <form onSubmit={DataHandler}>
  
    <div className=' m-4 flex justify-between' >
<Label text=" Libellé :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={libelle}
onChange={e => setLibelle(e.target.value)}
></Input>
    </div>

  <div className="flex justify-between p-4">
  <Button type="submit" children="Enregistrer"
  ></Button>
  <Button onClick={() =>  setIsModalOpen(false)} children="Quitter"  ></Button>
  </div>
  </form>
  </Modal>
  <Modal  isOpen={isModalOpenModifiAffection} onClose={() => setIsModalOpenModifiAffection(false)} className="w-[600px] h-[400px]" >
  <Navbar content={NavbarModalAffectation} ></Navbar>
  
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
        `http://localhost:3500/code/affectationbudgetaire/${selectedEditData.id}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/affectationbudgetaire')
    .then((response) => setDataCodeContent(response.data))
    .catch((error) => console.error(error));
      // Update the edited data in dataCode
      setDataCodeContent((prevData) =>
        prevData.map((data) =>
          data.id === selectedEditData.id ? selectedEditData : data
        )
      );

      setIsModalOpenModifiAffection(false);
      setSelectedEditData(null);
      console.log('Data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }}
  ></Button>
  <Button onClick={() =>  setIsModalOpenModifiAffection(false)} children="Quitter"  ></Button>
  </div>
  </Modal>
  <Modal  isOpen={isModalOpenAffection} onClose={() => setIsModalOpenAffection(false)} className="w-[600px] h-[400px]" >
  <Navbar content={NavbarModalAffectation} ></Navbar>
  <form onSubmit={DataHandlerAffectation}>
  <div className=' m-4 flex justify-between' >
<Label text=" Impot :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={impot}
 onChange={(e) => setImpot(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Budget :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={budget}
onChange={(e) => setBudget(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Taux :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={taux}
onChange={(e) => setTaux(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" pcop :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
value={pcop}
onChange={(e) => setPcop(e.target.value)}
></Input>
    </div>

  <div className="flex justify-between p-4">
  <Button children="Enregistrer"
  type="submit"
  ></Button>
  <Button onClick={() =>  setIsModalOpenAffection(false)} children="Quitter"  ></Button>
  </div>
  </form>
  </Modal>
  <Modal  isOpen={isModalOpenModifiImpot} onClose={() => setIsModalOpenModifiImpot(false)} className="w-[600px] h-[600px]" >
  
  <Navbar content={NavbarModalImpot} ></Navbar>

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
    <div className=' m-4 flex justify-between' >
<Label text=" Abreviation :" className="mt-2"></Label>
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
      <div className=' m-4 flex justify-between' >
<Label text=" N° Budget :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.numero_budget : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     numero_budget: e.target.value,
   }))
 }
></Input>
    </div>
      <div className=' m-4 flex justify-between' >
<Label text=" N° Classes  :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.numero_classes : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     numero_classes: e.target.value,
   }))
 }
></Input>
    </div>
      <div className=' m-4 flex justify-between' >
<Label text=" Chapitre :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.chapitre : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     chapitre: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Groupe impot  :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.groupe_impot : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     groupe_impot: e.target.value,
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
        `http://localhost:3500/code/impot/${selectedEditData.numero_impot}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/impot')
    .then((response) => setDataImpot(response.data))
    .catch((error) => console.error(error));
      // Update the edited data in dataCode
      setDataImpot((prevData) =>
        prevData.map((data) =>
          data.id === selectedEditData.id ? selectedEditData : data
        )
      );

      setIsModalOpenModifiImpot(false);
      setSelectedEditData(null);
      console.log('Data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }}
  ></Button>
  <Button onClick={() =>  setIsModalOpenModifiImpot(false)} children="Quitter"  ></Button>
  </div>
  </Modal>
   <Modal  isOpen={isModalOpenImpot} onClose={() => setIsModalOpenImpot(false)} className="w-[600px] h-[600px]" >
  <Navbar content={NavbarModalImpot} ></Navbar>
  
  <form onSubmit={DataHandlerImpot}>
    <div className=' m-4 flex justify-between' >
<Label text=" Libellé :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={libelle}
 onChange={(e) => setLibelle(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Abreviation :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={abreviation}
 onChange={(e) => setAbreviation(e.target.value)}
></Input>
    </div>
    
    <div className=' m-4 flex justify-between'>
  <Label text="pcop :" className="mt-2" />
  <ReactSelect
    options={PCOP}
    value={PCOP.find((option) => option.value === pcop)}
    onChange={(option) => setPcop(option ? option.value : "")}
  />
</div>
<div className=' m-4 flex justify-between'>
  <Label text="Budget :" className="mt-2" />
  <ReactSelect
    options={NumeroBudget}
    value={NumeroBudget.find((option) => option.value === numero_budget)}
    onChange={(option) => setNumero_budget(option ? option.value : "")}
  />
</div>


    <div className=' m-4 flex justify-between' >
<Label text=" N° Classe :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={numero_classes}
 onChange={(e) => setNumero_classes(e.target.value)}
></Input>

</div>
<div className=' m-4 flex justify-between' >
<Label text=" Groupe impot :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={groupe_impot}
 onChange={(e) => setGroupe_impot(e.target.value)}
></Input>

</div>

<div className=' m-4 flex justify-between' >
<Label text=" Chapitre :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={chapitre}
 onChange={(e) => setChapitre(e.target.value)}
></Input>

</div>
  <div className="flex justify-between p-4">
  <Button children="Enregistrer"
  type="submit"
  ></Button>
  <Button onClick={() =>  setIsModalOpenImpot(false)} children="Quitter"  ></Button>
  </div>
 </form>
  </Modal>
  </div>
  )
}

export default PCOCPAffectation