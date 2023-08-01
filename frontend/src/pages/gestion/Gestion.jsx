import React from 'react'
import { LinkButton } from '../../components/button/LinkButton'
import { Layout } from './Layout'
import Majunga from "../../assets/majunga01.jpg"
function Gestion() {
  const contentChildren =(
    <div className='flex p-8 justify-center items-center'>
        <div>
            <img src={Majunga} alt="majunga" className='w-[700px] h-[540px] bg-cover'/>
        </div>
        <div className='mt-16 ml-12'>
            <div className='w-96 mt-16 text-white text-3xl '>
                Situation d'un Entreprise
            </div>
        <div className='mt-12'>
            <div className='w-96'>
            <LinkButton to="/" text="Situation par Nature d'impot ou tous Impots" ></LinkButton>
            <LinkButton to="/" text="Mise à jour Régime Fiscal et Gestion de Dossier " className="mt-4"></LinkButton>
            <LinkButton to="/" text="Export en Excel des Assujetissements" className="mt-4"></LinkButton>
            </div>
        </div>
        </div>
    </div>

    )
  return (
 <div  className='bg-[#212122] h-screen w-screen'>
    <Layout children={contentChildren}></Layout>
 </div>
  )
}

export default Gestion