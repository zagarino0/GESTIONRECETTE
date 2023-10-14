import React, { useState } from 'react'
import { Layout } from '../Layout'
import Majunga from "../../../assets/majunga02.jpg"
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import { Navbar } from '../../../components/navbar/Navbar'
import Modal from '../../../components/modals/Modal'
import { LinkButton } from '../../../components/button/LinkButton'

function ConsultationGestion() {
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
               Consultation
            </div>
        <div className='mt-12'>
            <div className='w-96'>
            <Button  children="Obtention de copie du fichier IMPOT" isOpen={isModalOpen} onClick={() => setIsModalOpen(true)} className=" w-96" ></Button>
            <LinkButton to="/ResteRecouvrerDeuxDate" text="Reste à recouvrer entre deux dates" className="mt-2"></LinkButton>
            <LinkButton to="/ConsultationRecetteDeuxDate" text="Consultation Recette entre deux dates" className="mt-2"></LinkButton>
            
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
            <Button  children="Executer la requête"onClick={ () => {window.location.href = "/ResteRecouvreGlobal"}} ></Button>
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

export default ConsultationGestion