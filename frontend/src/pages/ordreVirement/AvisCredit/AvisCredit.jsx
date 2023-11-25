import React, { useState } from 'react'
import Layout from '../Layout';
import { LinkButton } from '../../../components/button/LinkButton';
import { useLocation } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import VisualisationAvisCredit from './VisualisationAvisCredit';

function AvisCredit() {
    const location = useLocation(); 
    const  [IsModal , setIsModal] = useState(false)
    const contentChildren=(
   <div className='flex justify-center items-center '>
    <div className='flex flex-col'>
    <div className='text-white text-3xl text-center m-2'>
     Avis de Crédit 
    </div>
   <div className='flex flex-col  '>
    <LinkButton to="/SaisiAvisCredit" text="Saisie des avis de crédits" className="mt-4" ></LinkButton>
    <LinkButton to="/DetailAvisCredit" text="Détail des Avis de Crédits"  className="mt-2"></LinkButton>
    <Button onClick={()=> setIsModal(true)} children="Visualisation des Avis de Crédits"  className="mt-2"></Button>    
    </div> 
    </div>   
     </div>
      ) 
  return (
    <div className='bg-[#212122] flex flex-row h-screen w-screen'>
  <Layout currentPath={location.pathname} children={contentChildren}></Layout>
  <VisualisationAvisCredit isOpen={IsModal} onClose={()=>setIsModal(false)} quitter={()=>setIsModal(false)} className="w-[500px] h-[450px]" ></VisualisationAvisCredit>
  </div>
  )
  }

export default AvisCredit