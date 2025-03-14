import React from 'react'
import Layout from '../Layout'
import { LinkButton } from '../../../components/button/LinkButton'
import { useLocation } from 'react-router-dom';
import { Button } from '../../../components/button/button';

function NIFRecette() {
  const location = useLocation();
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col'>
     <div className='text-white text-3xl text-center m-4 mt-10'>
       Référence Fiscal
     </div>
    <div className='flex flex-col ml-28 '>
     <Button  children="Visualisation RF" onClick={() => {  window.open('http://localhost:3000/PriseEnCharge' )}} className="mt-4 w-96" ></Button>
     <LinkButton to="/ConsultationRegisseur" text="Consultation des paiments des RF REGISSEURS"  className="mt-2 w-96"></LinkButton>
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

export default NIFRecette