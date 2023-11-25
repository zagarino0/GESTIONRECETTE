import React from 'react'
import Layout from '../Layout';
import { useLocation } from 'react-router-dom';
import { LinkButton } from '../../../components/button/LinkButton';

function Fichier() {
  
  const location = useLocation(); 
    const contentChildren=(
   <div className='flex justify-center items-center '>
    <div className='flex flex-col'>
    <div className='text-white text-3xl text-center m-2'>
      Fichier
    </div>
   <div className='flex flex-col  '>
    <LinkButton to="/Saisir" text="Saisie" className="mt-4" ></LinkButton>
    <LinkButton to="/DelivrerRecipisse" text="Délivré un Récépissé"  className="mt-2"></LinkButton>
    <LinkButton to="/ExtraitJournal" text="Extrait de Journal"  className="mt-2"></LinkButton>
    
    </div> 
    </div>   
     </div>
      ) 
  return (
    <div className='bg-[#212122] flex flex-row h-screen w-screen'>
<Layout currentPath={location.pathname} children={contentChildren}></Layout>
</div>
  )
}

export default Fichier