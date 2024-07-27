import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Checkbox from '../../../components/button/Checkbox'
import Input from '../../../components/input/Input'
import Table from '../../../components/table/Table'
import SearchInput from '../../../components/input/SearchInput'
import axios from "axios"
import DateFormatConverter from '../../../components/input/DateFormatConvert'
function ConsultationImmatriculation() {

  const [Client , setClient ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 
  useEffect(() => {
   // Récupérer les données depuis le backend
   axios.get('http://localhost:3500/prisecharge/contribuable/valide')
     .then((response) => setClient(response.data))
     .catch((error) => {console.error(error);alert(`Il y a une erreur :  ${error}`)});
 }, []);

 const handleSearch = (e) => {
   setSearchTerm(e.target.value);
 };   

const filteredData = Client.filter((item) => 
 item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())
 );
 

// Header table client
const ClientHeaders = ["Ref démandé", "Raison social",  "Référence Fiscal" , "type" , " Date autorisation" , "Régime fiscal" , "Forme juridique" , "Date de création" , "RIB"];
// Data client Table
const ClientData = filteredData.map((item) =>[
 item.id , 
 item.raison_social , 
 item.reference_fiscal , 
 item.type,
 <DateFormatConverter isoDate={item.date_agrement}></DateFormatConverter> ,
 item.regime_fiscal,
 item.forme_juridique ,
<DateFormatConverter isoDate={item.date_creation}></DateFormatConverter> ,
 item.RIB
]); 


 // Nombre de données filtrées
 const dataCount = ClientData.length;

  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white font-semibold '>
      Consultation 
     </div>
     <div>
<BackButton to="/consultatioRF"></BackButton>
     </div>
    </div>
 )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
    <Navbar content={Navbarcontent}></Navbar>
    <div className="m-4">
<div className='bg-black p-4 flex justify-between'>
<div className='flex flex-col'>
<SearchInput onChange={handleSearch}></SearchInput>
</div>
</div>
<div className='flex justify-center'>
<div className='overflow-y-auto w-[1480px]  mt-4'>
<Table headers={ClientHeaders} data={ClientData} ></Table>
</div>
</div>
    </div>
    <div className='m-4'>
      <Input type="text" value={dataCount} placeholder="Nombre d'enr."></Input>
    </div>
    </div>
  )
}

export default ConsultationImmatriculation