import React, { useState } from 'react'
import { LinkButton } from '../../../components/button/LinkButton'
import Layout from '../Layout'
import TableauRecapitulatifRecette from './TableauRecapitulatifRecette'
import { Button } from '../../../components/button/button'
import { useLocation } from 'react-router-dom'

function ConsultationRecette() {
  const location = useLocation(); 
  const [isModal, setIsModal] = useState(false);
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col'>
     <div className='text-white text-3xl text-center m-4 mt-10'>
       Consultations
     </div>
    <div className='flex flex-col ml-28 '>
     <LinkButton to="/ConsultationDetailRecette" text="Consultation détail recette" className="mt-4" ></LinkButton>
     <Button children="Tableau récapitulatif de recette"  className="mt-2" onClick={()=>setIsModal(true)}></Button>
     <LinkButton to="/MouvementRecette" text="Consultation du fichier mouvement"  className="mt-2"></LinkButton>
     </div> 
     </div>   
      </div>
       ) 
   return (
     <div className='bg-[#212122] flex flex-row h-screen w-screen'>
 <Layout children={contentChildren} currentPath={location.pathname}></Layout>
 <TableauRecapitulatifRecette isOpen={isModal} onClose={()=> setIsModal(false)} quitter={()=> setIsModal(false)} className="w-[500px] h-[420px]"></TableauRecapitulatifRecette>
 </div>
   )
}

export default ConsultationRecette