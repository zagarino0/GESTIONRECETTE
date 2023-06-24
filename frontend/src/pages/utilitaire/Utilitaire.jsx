import React from 'react'
import { Layout } from '../immatriculation/Layout'
import { LinkButton } from '../../components/button/LinkButton'
import Majunga from "../../assets/majunga.jpg"

function Utilitaire() {
    const contentChildren =(
        <div className='flex flex-row'>
            <div>
                <img src={Majunga} alt="majunga" className='w-[500px] h-[540px] bg-cover'/>
            </div>
            <div className='mt-16 ml-12'>
            <div className='w-96 mt-16 text-white text-3xl '>
                Utilitaires
            </div>
        <div className='mt-12'>
            <div className='w-96'>
            <LinkButton to="/" text="Copie de Fichier FRP (Répertoire)" ></LinkButton>
            
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

export default Utilitaire