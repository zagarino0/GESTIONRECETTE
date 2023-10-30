import React from 'react'
import { LinkButton } from '../../../components/button/LinkButton'
import Layout from '../Layout'

function ConsultationRecette() {
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col'>
     <div className='text-white text-3xl text-center m-4 mt-10'>
       Consultations
     </div>
    <div className='flex flex-col ml-28 '>
     <LinkButton to="/codeActivite" text="Consultation détail recette" className="mt-4" ></LinkButton>
     <LinkButton to="/codeBanque" text="Tableau récapitulatif de recette"  className="mt-2"></LinkButton>
     <LinkButton to="/codeFormeJuridique" text="Consultation du fichier mouvement"  className="mt-2"></LinkButton>
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

export default ConsultationRecette