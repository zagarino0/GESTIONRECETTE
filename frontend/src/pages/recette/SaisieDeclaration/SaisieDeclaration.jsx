import React from 'react'
import { LinkButton } from '../../../components/button/LinkButton'
import Layout from '../Layout'
import { useLocation } from 'react-router-dom';

function SaisieDeclaration() {
  const location = useLocation(); 
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col'>
     <div className='text-white text-3xl text-center m-4 mt-10 ml-28'>
       Saisie des déclarations
     </div>
    <div className='flex flex-col ml-28 '>
     <LinkButton to="/EnregistrementTitre" text="Enregistrement des déclarations" className="mt-4" ></LinkButton>
     <LinkButton to="/DelivranceDuplicataRecepisse" text="Délivrance Duplicata Récépissé"  className="mt-2"></LinkButton>
     
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

export default SaisieDeclaration