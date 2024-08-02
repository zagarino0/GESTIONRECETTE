import React from 'react'
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';

function VoirDetailRecetteResteRecouvrer() {
      // Contenu de la barre de navigation
  const NavbarContent = (
    <div className='flex justify-between'>
      <div className='text-white font-semibold'>
       Voir détail recette Reste à Recouvrer
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

export default VoirDetailRecetteResteRecouvrer