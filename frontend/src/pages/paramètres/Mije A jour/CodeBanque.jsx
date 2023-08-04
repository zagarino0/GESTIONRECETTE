import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import axios from 'axios';
function CodeBanque() {
  const [dataCode, setDataCode] = useState([]);

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/banque')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const headers = ["numéro", "Raison social", "Nom commercial"];

  const formattedData = dataCode.map(item => [item.id, item.Raison_Social, item.Nom_Commercial]);

  console.log(formattedData);
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour des codes banques
    </div>
    <div>
      <BackButton to="/miseAJourParametre"></BackButton>
    </div>
</div>
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-8 bg-[#212122] p-4 flex justify-center' >
      
<Table headers={headers} data={formattedData} className="w-[1000px]"></Table>
    </div>
  </div>
  )
}

export default CodeBanque