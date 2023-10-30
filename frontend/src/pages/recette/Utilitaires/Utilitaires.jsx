import React from 'react'
import Layout from '../Layout'
import { LinkButton } from '../../../components/button/LinkButton'

function UtilitairesRecette() {
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col'>
     <div className='text-white text-3xl text-center m-2 mt-40'>
       Utilitaires
     </div>
    <div className='flex flex-col ml-28 '>
     <LinkButton to="/codeActivite" text="Copie du fichier impôt" className="mt-4 w-96" ></LinkButton>
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

export default UtilitairesRecette