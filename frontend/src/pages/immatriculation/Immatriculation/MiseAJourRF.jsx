import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import axios from 'axios'
import Table from '../../../components/table/Table'
import DateFormatConverter from '../../../components/input/DateFormatConvert'
import SearchInput from '../../../components/input/SearchInput'

function MiseAJourRF() {
   const [Client , setClient ] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
  
   useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/prisecharge/contribuable/encharge')
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
  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white font-semibold'>
      Mise à jour 
     </div>
     <div>
<BackButton to="/immatriculation"></BackButton>
     </div>
    </div>
 )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
         <Navbar content={Navbarcontent}></Navbar>
       <div className='p-4'>
    
     <div className='p-4 bg-black mt-2 rounded '>
       <p className='text-white text-xl text-center font-semibold'>RENSEIGNEMENTS GENERAUX</p>
     </div>

     <div>
      <SearchInput onChange={handleSearch}></SearchInput>
     </div>
     <div className='mt-2 flex justify-between'>
      <div className='overflow-y-auto w-[1400px]'>
        <Table headers={ClientHeaders} data={ClientData}></Table>
      </div>
     </div>
     <div className='flex justify-between mt-2'>

    </div>
    </div>
    </div>
  )
}


export default MiseAJourRF