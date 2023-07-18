import React from 'react'
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';

function ChefActionTypePrevision() {
  const headers = ["Code" ,"LIBELLE " ];
  const data = [['none','none'],];
  const headerContent = ["Type Prev." ,"LIBELLE" ];
  const dataContent = [['none','none'],];
  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white'>
    Chef d'Action et type de Prévision
        </div>
        <div>
          <BackButton to="/parametreParametre"></BackButton>
        </div>
    </div>
      )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>    
    <Navbar content={NavbarContent}></Navbar>
    <div className='flex items-center justify-between '>
    <div className='flex flex-col'>
    <div className='text-white m-4'>Des Chefs d'Action</div>
      <div className='flex'>
        
      <div className='mt-4 m-4' >
    <Table headers={headers} data={data} ></Table>
        </div>
      </div>
    </div>
    <div className='flex flex-col'>
    <div className='text-white m-4'>Des Types de Prévisions </div>
      <div className='flex'>
        
      <div className='mt-4 m-4' >
    <Table headers={headerContent} data={dataContent} ></Table>
        </div>
      </div>
    </div>
    </div></div>
  )
}

export default ChefActionTypePrevision