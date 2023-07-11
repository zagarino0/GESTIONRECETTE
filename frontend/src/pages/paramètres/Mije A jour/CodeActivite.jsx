import React from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'

function CodeActivite() {
  const headers = ['Code activité', 'Libellé activité', 'Nature (Tableau )'];
  const data = [
    ['none', 'none', 'none'],
   
  ];
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
      <div className='mt-24 m-4' >
<Table headers={headers} data={data} ></Table>
      </div>
    </div>
  )
}

export default CodeActivite