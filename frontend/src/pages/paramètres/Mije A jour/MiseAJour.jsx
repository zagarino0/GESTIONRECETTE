import React from 'react'
import { LinkButton } from '../../../components/button/LinkButton'
import Layout from '../Layout'

function MiseAJour() {
    const contentChildren=(
   <div className='flex justify-center items-center lg:w-screen lg:h-screen'>
    <div className='flex flex-col'>
    <div className='text-white text-3xl text-center m-2'>
      Mise à jour
    </div>
   <div className='flex flex-col ml-28 '>
    <LinkButton to="/codeActivite" text="Code Activites" className="mt-4" ></LinkButton>
    <LinkButton to="/codeBanque" text="Code Banque"  className="mt-2"></LinkButton>
    <LinkButton to="/codeGeographique" text="Code Géographique"  className="mt-2"></LinkButton>
    <LinkButton to="/codeFormeJuridique" text="Code Forme Juridique"  className="mt-2"></LinkButton>
    <LinkButton to="/codeCollectivite" text="Code Collectivités"  className="mt-2"></LinkButton>
    <LinkButton to="/periodiciteImpot" text="Périodicité Impot"  className="mt-2"></LinkButton>
    <LinkButton to="/obligationFiscal" text="Obligatoire Fiscale"  className="mt-2"></LinkButton>
    <LinkButton to="/typeProceVerbaux" text="Type de Procés Verbaux "  className="mt-2"></LinkButton>
    <LinkButton to="/operateurTelephonique" text="Les opérateurs telephoniques"  className="mt-2"></LinkButton>
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

export default MiseAJour