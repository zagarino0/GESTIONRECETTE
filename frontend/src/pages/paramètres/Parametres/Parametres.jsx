import React from 'react'
import { LinkButton } from '../../../components/button/LinkButton'
import Layout from '../Layout'
import { useLocation } from 'react-router-dom';

function Parametres() {
  const location = useLocation(); 
  const contentChildren=(
    <div className='flex justify-center items-center '>
    <div className='flex flex-col'>
    <div className='text-white text-4xl text-center m-10'>
      Paramètres
    </div>
   <div className='flex justify-between ml-10 mr-10 mt-10'>
   <div className='flex flex-col w-[500px] text-1xl mt-4'>
   <LinkButton to="/previsonAnnuelle" text="Prévisions Annuelles" className="mt-4" ></LinkButton>
    <LinkButton to="/PCOCPAffectation" text="PCOCP et Affectation Budgétaire"  className="mt-4"></LinkButton>
   </div>
   <div className='flex flex-col ml-20 w-[500px] text-1xl mt-4'>
   <LinkButton to="/ChefActionTypePrevision" text="Chef d'action et Type de Prévision"  className="mt-4"></LinkButton>
    <LinkButton to="/PeriodiciteImpotParametre" text="Périodicité des Impots"  className="mt-4"></LinkButton>
   </div>
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

export default Parametres