import React from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'

function CodeGeographique() {
  const headers = ["Code géographique", "Libellé " ];
  const data = [['none','none'],];

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
    <div className='mt-24 m-4' >
<Table headers={headers} data={data} ></Table>
    </div>
  </div>
  )
}

export default CodeGeographique