import React from 'react'
import Layout from '../Layout'
import { LinkButton } from '../../../components/button/LinkButton'

function SituationRecette() {
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col mt-3'>
     <div className='text-white text-3xl text-center m-4'>
       Situation de Recette et Pièce comptables
     </div>
    <div className='flex justify-between ml-4 mr-4'>
     <div className='flex flex-col'>
     <LinkButton to="/codeActivite" text="Situation de Recette" className="mt-2 " ></LinkButton>
     <LinkButton to="/codeBanque" text="Etat détaillé des encaissements"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Etat détaillé des encaissements par natures d'impôts"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Etat détaillé des encaissements (Avis de crédit reçu par la BCM)"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Etat détaillé des encaissements (Espèce)"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Etat détaillé des encaissements (Chèque)"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Etat détaillé des encaissements (BAR)"  className="mt-2"></LinkButton>
     </div>
    <div className='flex flex-col ml-2'>
    <LinkButton to="/codeBanque" text="Etat détaillé des encaissements (Trésor)"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Compte Rendu de Recette et Etat Récap"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Etat Récapitilatif des recette au profil des collectivités"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Versement bancaire "  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Consultation chèque\espèce  par opérateur"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Consultation montant chèque\espèce saisi"  className="mt-2"></LinkButton>
     <LinkButton to="/codeBanque" text="Interprétation de recette"  className="mt-2"></LinkButton>
    </div>
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

export default SituationRecette