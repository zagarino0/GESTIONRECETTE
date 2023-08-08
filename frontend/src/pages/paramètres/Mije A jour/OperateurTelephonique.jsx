import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import axios from 'axios';

function OperateurTelephonique() {
  const [dataCode, setDataCode] = useState([]);

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/operateurtelephonique')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const headers = ["Numéro" ,"Opérateur "];
  const formattedData = dataCode.map(item => [item.numero, item.operateur]);

//Navbar content
const NavbarContent = (
    <nav className=" flex items-center justify-between  ">
 <div className='text-white'>
Operateurs telephoniques 
  </div>
  
<BackButton to="/miseAJourParametre"></BackButton>
    
</nav>
)
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-24 m-4' >
<Table headers={headers} data={formattedData} ></Table>
    </div>

  </div>
  )
}

export default OperateurTelephonique