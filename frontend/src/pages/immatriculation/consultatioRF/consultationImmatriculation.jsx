import React, { useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'
import Checkbox from '../../../components/button/Checkbox'
import Input from '../../../components/input/Input'
import Table from '../../../components/table/Table'
import SearchInput from '../../../components/input/SearchInput'
import axios from "axios"
function ConsultationImmatriculation() {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    raisonSociale: false,
    nomCommercial: false,
    adresse: false,
    cin: false,
    nif: false,
  });

  const [searchInput, setSearchInput] = useState('');
 const [ data , setData] = useState([])
  const handleSearch = async () => {
    const baseUrl = 'http://localhost:3500/consultation';
  
    if (selectedCheckboxes.nif === true){

    try{

const reponse = await axios.post(`${baseUrl}/nif` , searchInput )
const value = reponse.data
console.log(reponse);
setData(value);
setSelectedCheckboxes({
  raisonSociale: false,
  nomCommercial: false,
  adresse: false,
  cin: false,
  nif: false,
});


       }

     catch (error){

  console.error('Error fetching data:', error);
                  }}


   if (selectedCheckboxes.adresse === true){

   try{
    
  const reponse = await axios.post(`${baseUrl}/adresse` , searchInput)
  const value = reponse.data
console.log(reponse);
setData(value);
  setSelectedCheckboxes({
    raisonSociale: false,
    nomCommercial: false,
    adresse: false,
    cin: false,
    nif: false,
  });
      }
  catch (error){
    console.error('Error fetching data:', error);
  }
  }

  if (selectedCheckboxes.cin === true){

    try{
      
    const reponse = await axios.post(`${baseUrl}/cin` , searchInput)
    const value = reponse.data
console.log(reponse);
setData(value);
    setSelectedCheckboxes({
      raisonSociale: false,
      nomCommercial: false,
      adresse: false,
      cin: false,
      nif: false,

    });
    }
    catch (error){
      console.error('Error fetching data:', error);
    }
    }

    if (selectedCheckboxes.nomCommercial === true){

      try{
        
      const reponse = await axios.post(`${baseUrl}/nomcommercial` , searchInput)
      const value = reponse.data
console.log(reponse);
setData(value);
      setSelectedCheckboxes({
        raisonSociale: false,
        nomCommercial: false,
        adresse: false,
        cin: false,
        nif: false,
      });
      }
      catch (error){
        console.error('Error fetching data:', error);
      }
      }
  };

  const headers = ['Raison social', 'Nom commercial', 'CIN', 'Adresse', 'RF',"",""];
  const formattedData = Array.isArray(data) ? data.map(item => [item.raisonsociale, item.nomcommercial, item.cin, item.adresse, item.nif]) : [];

  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white '>
      Consultation 
     </div>
     <div>
<BackButton to="/immatriculation"></BackButton>
     </div>
    </div>
 )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
    <Navbar content={Navbarcontent}></Navbar>
    <div className="m-4">
<div className='bg-black p-4 flex justify-between'>
<div className='flex flex-col'>
<Label text="Choix par" ></Label>
<Checkbox label="Raison social"
 value={selectedCheckboxes.raisonSociale}
 onChange={() =>
   setSelectedCheckboxes((prev) => ({
     ...prev,
     raisonSociale: !prev.raisonSociale,
   }))
 }
></Checkbox>
<Checkbox label="Nom commercial"
value={selectedCheckboxes.nomCommercial}
 onChange={() =>
   setSelectedCheckboxes((prev) => ({
     ...prev,
     nomCommercial: !prev.nomCommercial,
   }))
 }
></Checkbox>
<Checkbox label="Adresse"
value={selectedCheckboxes.adresse}
onChange={() =>
  setSelectedCheckboxes((prev) => ({
    ...prev,
    adresse: !prev.adresse,
  }))
}
></Checkbox>
<Checkbox label="CIN"
value={selectedCheckboxes.cin}
onChange={() =>
  setSelectedCheckboxes((prev) => ({
    ...prev,
    cin: !prev.cin,
  }))
}
></Checkbox>
<Checkbox label="RF"
value={selectedCheckboxes.nif}
onChange={() =>
  setSelectedCheckboxes((prev) => ({
    ...prev,
    nif: !prev.rf,
  }))
}
></Checkbox>
</div>
<div className='flex flex-col'>
<SearchInput type="text" placeholder="Recherche"
value={searchInput}
onChange={(e)=> setSearchInput(e.target.value)}
 onSearch={handleSearch}
></SearchInput>
</div>
</div>
<div className='mt-4'>
<Table headers={headers} data={formattedData} ></Table>
</div>
    </div>
    <div className='m-4'>
      <Input type="text" placeholder="Nombre d'enr."></Input>
    </div>
    </div>
  )
}

export default ConsultationImmatriculation