import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import axios from 'axios';
function CodeGeographique() {
  const [dataCode, setDataCode] = useState([]);

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/geographique')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const headers = ["id","Code géographique", "Libellé " ];
  const formattedData = dataCode.map(item => [item.id, item.code, item.libelle]);

  

  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour  code géographique
    </div>
    <div>
      <BackButton to="/miseAJourParametre"></BackButton>
    </div>
</div>
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-24 m-4 flex justify-center' >
<Table headers={headers} data={formattedData} ></Table>
    </div>
  </div>
  )
}

export default CodeGeographique