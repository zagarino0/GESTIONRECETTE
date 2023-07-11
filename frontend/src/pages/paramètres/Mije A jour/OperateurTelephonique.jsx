import React from 'react'
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';

function OperateurTelephonique() {
  const headers = ["Numéro" ,"Opérateur "];
  const data = [['none','none'],];

//Navbar content
const NavbarContent = (
    <nav className=" flex items-center justify-between  ">
 <div className='text-white'>
Operateurs telephoniques 
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

  </div>
  )
}

export default OperateurTelephonique