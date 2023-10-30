import React, { useState } from 'react'
import { Layout } from '../Layout'
import Majunga from "../../../assets/majunga04.jpg"
import { Button } from '../../../components/button/button'

import { Navbar } from '../../../components/navbar/Navbar'
import Modal from '../../../components/modals/Modal'

function Defaillant() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const NavbarModal =(
        
        <div className='text-white'>
Relance des Defaillants
        </div>
        
      )
  const contentChildren =(
    <div className='flex p-8 justify-center items-center'>
        <div>
            <img src={Majunga} alt="majunga" className='w-[700px] h-[540px] bg-cover'/>
        </div>
        <div className='mt-16 ml-12'>
            <div className='w-96 mt-16 text-white text-3xl '>
               Relance des Defaillants
            </div>
        <div className='mt-12'>
            <div className='w-96'>
            <Button  children="Relance des Defaillants" isOpen={isModalOpen} onClick={() => setIsModalOpen(true)} className=" w-96" ></Button>
  
            </div>
        </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[700px] h-[250px] ">
        <Navbar content={NavbarModal} ></Navbar>
        <div className='flex justify-center items-center p-4 '>
       <div className='flex flex-col'>
       <div className='m-2 text-white'>
RELANCE DES DEFAILLANTS **IMPOT SUR LES REVENUS SALARIAUX** MENSUEL PERIODE 7 AU 7 
            </div>
            
            <div className='flex justify-between  m-2 '>
            <Button  children="OK"onClick={ () => {window.location.href = "/RelanceDefaillant"}} ></Button>
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

export default Defaillant