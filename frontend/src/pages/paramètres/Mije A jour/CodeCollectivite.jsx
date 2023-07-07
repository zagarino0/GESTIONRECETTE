import React from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'

function CodeCollectivite() {
  const Header = [ "Raison social " , "NIF"]
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Niveau de Décentralisation
    </div>
    <div>
      <BackButton to="/miseAJourParametre"></BackButton>
    </div>
</div>
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='mt-24 bg-white' >
<Table header={Header}></Table>
      </div>
    </div>
  )
}

export default CodeCollectivite