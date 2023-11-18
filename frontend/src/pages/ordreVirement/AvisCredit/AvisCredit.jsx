import React from 'react'
import Layout from '../Layout';
import { LinkButton } from '../../../components/button/LinkButton';
import { useLocation } from 'react-router-dom';

function AvisCredit() {
    const location = useLocation(); 
    const contentChildren=(
   <div className='flex justify-center items-center '>
    <div className='flex flex-col'>
    <div className='text-white text-3xl text-center m-2'>
     Avis de Crédit 
    </div>
   <div className='flex flex-col  '>
    <LinkButton to="/codeActivite" text="Saisie des avis de crédits" className="mt-4" ></LinkButton>
    <LinkButton to="/codeBanque" text="Détail des Avis de Crédits"  className="mt-2"></LinkButton>
    <LinkButton to="/codeBanque" text="Visualisation des Avis de Crédits"  className="mt-2"></LinkButton>    
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

export default AvisCredit