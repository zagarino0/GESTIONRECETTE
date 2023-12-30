import React from 'react'
import Layout from '../Layout'
import { LinkButton } from '../../../components/button/LinkButton'
import { useLocation } from 'react-router-dom';

function UtilitairesRecette() {
  const location = useLocation(); 
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col'>
     <div className='text-white text-3xl text-center m-2 mt-40'>
       Utilitaires
     </div>
    <div className='flex flex-col ml-28 '>
     <LinkButton to="#" text="Copie du fichier impôt" className="mt-4 w-96" ></LinkButton>
     </div> 
     </div>   
      </div>
       ) 
   return (
     <div className='bg-[#212122]  h-screen w-screen'>
 <Layout currentPath={location.pathname} children={contentChildren}></Layout>
 </div>
   )
}

export default UtilitairesRecette