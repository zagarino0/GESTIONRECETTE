import React from 'react'
import BackButton from '../../../components/button/BackButton'
import { Button } from '../../../components/button/button'
import { Navbar } from '../../../components/navbar/Navbar'

function CodeCollectivite() {
 
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
    <div className='mt-24 m-4' >
     <Button children="Sauvegarder" className="m-2"></Button>
     <Button children="Modifier" className="m-2"></Button>
     <Button children="Imprimmer" className="m-2"></Button>
    </div>
  </div>
  )
}

export default CodeCollectivite