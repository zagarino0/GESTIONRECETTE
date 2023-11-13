import React, { useState } from 'react'
import Layout from '../Layout'
import { LinkButton } from '../../../components/button/LinkButton'
import { Button } from '../../../components/button/button';
import SituationdeRecette from './SituationdeRecette';
import CompteRendu from './CompteRendu';
import ReleveCheque from './ReleveCheque';
import InterpretationRecette from './InterpretationRecette';
import EtatRecapitulatifRecette from './EtatRecapitulatifRecette';

function SituationRecette() {
  const [isModalSituationRecette, setIsModalSituationRecette] = useState(false);
  const [isModalCompteRendue, setIsModalCompteRendu] = useState(false);
  const [isModalReleveCheque, setIsModalReleveCheque] = useState(false);
  const [isModalInterpretationRecette, setIsModalInterpretationRecette] = useState(false);
  const [isModalEtatRecapitulatifRecette, setIsModalEtatRecapitulatifRecette] = useState(false);
  const contentChildren=(
    <div className='flex justify-center items-center '>
     <div className='flex flex-col mt-3'>
     <div className='text-white text-3xl text-center m-4'>
       Situation de Recette et Pièce comptables
     </div>
    <div className='flex justify-between ml-4 mr-4'>
     <div className='flex flex-col'>
     <Button  children="Situation de Recette" className="mt-2 " onClick={()=>setIsModalSituationRecette(true)}></Button>
     <LinkButton to="/EtatDetailleEncaissement" text="Etat détaillé des encaissements"  className="mt-2"></LinkButton>
     <LinkButton to="/" text="Etat détaillé des encaissements par natures d'impôts"  className="mt-2"></LinkButton>
     <LinkButton to="/" text="Etat détaillé des encaissements (Avis de crédit reçu par la BCM)"  className="mt-2"></LinkButton>
     <LinkButton to="/" text="Etat détaillé des encaissements (Espèce)"  className="mt-2"></LinkButton>
     <LinkButton to="/" text="Etat détaillé des encaissements (Chèque)"  className="mt-2"></LinkButton>
     <LinkButton to="/" text="Etat détaillé des encaissements (BAR)"  className="mt-2"></LinkButton>
     </div>
    <div className='flex flex-col ml-2'>
    <LinkButton to="/" text="Etat détaillé des encaissements (Trésor)"  className="mt-2"></LinkButton>
     <Button children="Compte Rendu de Recette et Etat Récap" onClick={()=>setIsModalCompteRendu(true)} className="mt-2"></Button>
     <Button  children="Etat Récapitilatif des recette au profil des collectivités"  onClick={()=>setIsModalEtatRecapitulatifRecette(true)}  className="mt-2"></Button>
     <Button  children="Versement bancaire " onClick={()=>setIsModalReleveCheque(true)}  className="mt-2"></Button>
     <LinkButton to="/" text="Consultation chèque\espèce  par opérateur"  className="mt-2"></LinkButton>
     <LinkButton to="/" text="Consultation montant chèque\espèce saisi"  className="mt-2"></LinkButton>
     <Button children="Interprétation de recette" onClick={()=>setIsModalInterpretationRecette(true)}  className="mt-2"></Button>
    </div>
     </div> 
     </div>   
      </div>
       ) 
   return (
     <div className='bg-[#212122] flex flex-row h-screen w-screen'>
 <Layout children={contentChildren}></Layout>
 <ReleveCheque isOpen={isModalReleveCheque} onClose={()=> setIsModalReleveCheque(false)} quitter={()=> setIsModalReleveCheque(false)} className="w-[500px] h-[300px]"></ReleveCheque>
 <CompteRendu isOpen={isModalCompteRendue} onClose={()=> setIsModalCompteRendu(false)} quitter={()=> setIsModalCompteRendu(false)} className="w-[500px] h-[700px]"></CompteRendu>
 <SituationdeRecette isOpen={isModalSituationRecette} onClose={()=>setIsModalSituationRecette(false)} quitter={()=>setIsModalSituationRecette(false)} className="w-[500px] h-[700px]"></SituationdeRecette>
 <InterpretationRecette isOpen={isModalInterpretationRecette} onClose={()=>setIsModalInterpretationRecette(false)} quitter={()=>setIsModalInterpretationRecette(false)} className="w-[500px] h-[620px]"></InterpretationRecette>
 <EtatRecapitulatifRecette isOpen={isModalEtatRecapitulatifRecette} onClose={()=>setIsModalEtatRecapitulatifRecette(false)} quitter={()=>setIsModalEtatRecapitulatifRecette(false)} className="w-[800px] h-[620px]"></EtatRecapitulatifRecette>
 </div>
   )
}

export default SituationRecette