import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import axios from 'axios';


function CodeActivite() {
  const [dataCode, setDataCode] = useState([]);

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/codeactivite')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);


  const headers = ['Code activité', 'Libellé activité', 'Nature (Tableau )'];
  const formattedData = dataCode.map(item => [item.code, item.libelle, item.nature]);
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour code d'activité
    </div>
    <div>
      <BackButton to="/miseAJourParametre"></BackButton>
    </div>
</div>
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='mt-24 bg-[#212122] flex  justify-center p-4' >
<Table headers={headers} data={formattedData } ></Table>
      </div>
    </div>
  )
}

export default CodeActivite