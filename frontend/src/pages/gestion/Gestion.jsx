import React, { useState } from 'react'
import { LinkButton } from '../../components/button/LinkButton'
import { Layout } from './Layout'
import Majunga from "../../assets/majunga01.jpg"
import { Button } from '../../components/button/button'
import Input from '../../components/input/Input'
import Label from '../../components/title/label'
import { Navbar } from '../../components/navbar/Navbar'
import Modal from '../../components/modals/Modal'
function Gestion() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const NavbarModal =(
        
        <div className='text-white'>
      Obtention de copie du fichier IMPOT
        </div>
        
      )
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
            <LinkButton to="/SituationNatureImpot" text="Situation par Nature d'impot ou tous Impots" ></LinkButton>
            <LinkButton to="/MJRRegimeFiscalETGestionDossier" text="Mise à jour Régime Fiscal et Gestion de Dossier " className="mt-4"></LinkButton>
            <Button  children="Export en Excel des Assujetissements" isOpen={isModalOpen} onClick={() => setIsModalOpen(true)} className="mt-4 w-96"></Button>
            </div>
        </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[700px] h-[250px] ">
        <Navbar content={NavbarModal} ></Navbar>
        <div className='flex justify-center items-center p-4 '>
       <div className='flex flex-col'>
       <div className='m-2 text-white'>
Il s'agit d'avoir une copie du fichier ASSUJETISSEMENTS
            </div>
            <div className='flex justify-between m-2 '>
             <Label text="Année :"></Label>
            <Input type="texr"></Input>
            </div>
            
            <div className='flex justify-between  m-2 '>
            <Button  children="Executer la requête" ></Button>
            <Button onClick={() => setIsModalOpen(false)} children="Quitter" ></Button>
            </div>
       </div>
        
        </div>
        </Modal>
    </div>

    )
  return (
 <div  className='bg-[#212122] h-screen w-screen'>
    <Layout children={contentChildren}></Layout>
 </div>
  )
}

export default Gestion