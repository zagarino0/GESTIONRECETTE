import React, { useState } from 'react'
import { Layout } from '../Layout'
import Majunga from "../../../assets/majunga03.jpg"
import { Button } from '../../../components/button/button'
import Modal from '../../../components/modals/Modal';
import { Navbar } from '../../../components/navbar/Navbar';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';

function Utilitaire() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const NavbarModal =(
        
        <div className='text-white'>
      Obtention de copie du fichier immatriculation
        </div>
        
      )
    const contentChildren =(
        <div className='flex p-8 justify-center items-center'>
            <div>
                <img src={Majunga} alt="majunga" className='w-[700px] h-[540px] bg-cover'/>
            </div>
            <div className='mt-16 ml-12'>
            <div className='w-96 mt-16 text-white text-3xl '>
                Utilitaires
            </div>
        <div className='mt-12'>
            <div className='w-96'>
            <Button  children="Copie de Fichier FRP (Répertoire)" className="" isOpen={isModalOpen} onClick={() => setIsModalOpen(true)} ></Button>
            
            </div>
        </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[700px] h-[400px] ">
        <Navbar content={NavbarModal} ></Navbar>
        <div className='flex justify-center items-center p-4 '>
       <div className='flex flex-col'>
       <div className='m-2 text-white'>
Il s'agit d'avoir une copie du fichier Immatriculation dans votre ordinateur
            </div>
            <div className='flex justify-between m-2 '>
             <Label text="Du :"></Label>
            <Input type="date"></Input>
            </div>
            <div className='flex justify-between  m-2 '>
             <Label text="Au :"></Label>
            <Input type="date"></Input>
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

export default Utilitaire