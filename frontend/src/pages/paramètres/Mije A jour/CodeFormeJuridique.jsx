import React from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'

function CodeFormeJuridique() {
  const headers = [ "code " , "Abréviation" , "Libellé"];
  const data = [['none','none', 'none'],];
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour code forme juridique
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

export default CodeFormeJuridique