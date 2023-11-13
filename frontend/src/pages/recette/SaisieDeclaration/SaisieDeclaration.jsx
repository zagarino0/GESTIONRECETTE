import React from 'react'
import { LinkButton } from '../../../components/button/LinkButton'
import Layout from '../Layout'

function SaisieDeclaration() {
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col'>
     <div className='text-white text-3xl text-center m-4 mt-10'>
       Saisie des déclaration
     </div>
    <div className='flex flex-col ml-28 '>
     <LinkButton to="/EnregistrementTitre" text="Enregistrement des déclarations" className="mt-4" ></LinkButton>
     <LinkButton to="/DelivranceDuplicataRecepisse" text="Délivrance Duplicata Récépissé"  className="mt-2"></LinkButton>
     <LinkButton to="/codeFormeJuridique" text="Visualisation de la Situation Antérieure"  className="mt-2"></LinkButton>
     </div> 
     </div>   
      </div>
       ) 
   return (
     <div className='bg-[#212122] flex flex-row h-screen w-screen'>
 <Layout children={contentChildren}></Layout>
 </div>
   )
}

export default SaisieDeclaration