import React from 'react'
import { LinkButton } from '../../../components/button/LinkButton'
import Layout from '../Layout'
import { useLocation } from 'react-router-dom';

function Parametres() {
  const location = useLocation(); 
  const contentChildren=(
    <div className='flex justify-center items-center '>
    <div className='flex flex-col'>
    <div className='text-white text-3xl text-center m-2'>
      Parametres
    </div>
   <div className='flex flex-col  '>
    <LinkButton to="/previsonAnnuelle" text="Prévisions Annuelles" className="mt-4" ></LinkButton>
    <LinkButton to="/PCOCPAffectation" text="PCOCP et Affectation Budgétaire"  className="mt-2"></LinkButton>
    <LinkButton to="/ChefActionTypePrevision" text="Chef d'action et Type de Prévision"  className="mt-2"></LinkButton>
    <LinkButton to="/PeriodiciteImpotParametre" text="Périodicité des Impots"  className="mt-2"></LinkButton>
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