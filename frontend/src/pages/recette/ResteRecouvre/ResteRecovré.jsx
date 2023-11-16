import React from 'react'
import Layout from '../Layout'
import { LinkButton } from '../../../components/button/LinkButton'
import { useLocation } from 'react-router-dom';

function ResteRecovré() {
  const location = useLocation(); 
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col'>
     <div className='text-white text-3xl text-center m-4 mt-40'>
       Reste à Recouvré
     </div>
    <div className='flex flex-col ml-28 '>
    
     <LinkButton to="/VisualisationResteRecouvrer" text="Visualisation de tous les restes à recouvres" className="mt-4" ></LinkButton>
    
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

export default ResteRecovré