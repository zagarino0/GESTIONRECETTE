import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import axios from 'axios';

function ChefActionTypePrevision() {
  const [dataCode, setDataCode] = useState([]);

  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/chefaction')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

    const [dataCodeContent, setDataCodeContent] = useState([]);

  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/typeprevision')
      .then((response) => setDataCodeContent(response.data))
      .catch((error) => console.error(error));
  }, []);

  
  const headers = ["Code" ,"LIBELLE " ];
  const data = dataCode.map(item => [item.code, item.libelle]);
  const headerContent = ["Type Prev." ,"LIBELLE" ];
  const dataContent = dataCodeContent.map(item => [item.type_prevision, item.libelle]);
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