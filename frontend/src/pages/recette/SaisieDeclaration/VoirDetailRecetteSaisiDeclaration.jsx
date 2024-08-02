import React from 'react'
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';

function VoirDetailRecetteSaisiDeclaration() {
 // Contenu de la barre de navigation
 const NavbarContent = (
    <div className='flex justify-between'>
      <div className='text-white font-semibold'>
       Voir détail recette 
      </div>
      <div>
        <BackButton to="/VisualisationResteRecouvrer"></BackButton>
      </div>
    </div>
  );

  return (
<div className='bg-[#212122] h-screen w-full'>
      <Navbar content={NavbarContent}></Navbar>
      
    </div>
  )
}
export default VoirDetailRecetteSaisiDeclaration