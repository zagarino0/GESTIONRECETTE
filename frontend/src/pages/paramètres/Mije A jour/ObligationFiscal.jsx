import React from 'react'
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'

function ObligationFiscal() {
  const headers = ["Objet" ,"Numéro ","Choix ","Obligation","Périodicité","Titre","Option","Taxation ","Pénalité" ];
  const data = [['none','none','none','none','none','none','none','none','none'],];

//Navbar content
const NavbarContent = (
    <nav className=" flex items-center justify-between  ">
 <div className='text-white'>
Périodicité et Obligation fiscal
  </div>
  
<BackButton to="/miseAJourParametre"></BackButton>
    
</nav>
)
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-24 m-4' >
<Table headers={headers} data={data} ></Table>
    </div>
    <div className='mt-4 m-4'>
<Button children="Rafraichir" ></Button>
<Button children="Modifier" className="ml-4" ></Button>
    </div>
  </div>
  )
}

export default ObligationFiscal