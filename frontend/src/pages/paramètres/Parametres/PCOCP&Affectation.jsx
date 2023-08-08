import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import axios from 'axios';

function PCOCPAffectation() {
  const [dataCode, setDataCode] = useState([]);

  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/numerobudget')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

    const [dataCodeContent, setDataCodeContent] = useState([]);

  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/affectationbudgetaire')
      .then((response) => setDataCodeContent(response.data))
      .catch((error) => console.error(error));
  }, []);

  const headers = ["numéro" ,"LIBELLE " ];
  const formattedData = dataCode.map(item => [item.numero, item.libelle]);
  const headerContent = ["Impot" ,"Budget" ,"Taux" ,"PCOP" ];
  const dataContent = dataCodeContent.map(item => [item.impot, item.budget , item.taux , item.pcop]);
  const headerContentTable = ["N ° Impot" ,"Libellé" ,"Abrev" ,"PCOP","N° Budget","N° Classe" ];
  const dataContentTable = [['none','none','none','none','none','none'],];
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour budgets et classe pour les impots
    </div>
    <div>
      <BackButton to="/parametreParametre"></BackButton>
    </div>
</div>
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
<div className='flex items-center justify-between '>
<div className='flex flex-col'>
<div className='text-white m-4'>NUMERO BUDGET</div>
  <div className='flex'>
    
  <div className='mt-4 m-4' >
<Table headers={headers} data={formattedData} ></Table>
    </div>
  </div>
</div>
<div className='flex flex-col'>
<div className='text-white m-4'>Affectation Budgetaire</div>
  <div className='flex'>
    
  <div className='mt-4 m-4' >
<Table headers={headerContent} data={dataContent} ></Table>
    </div>
  </div>
</div>
</div>
<div className='mt-4 m-4'>
<div className='text-white m-4'>CODE IMPOTS , BUDGETS , CLASSES</div>
<Table headers={headerContentTable} data={dataContentTable} ></Table>
</div>
  </div>
  )
}

export default PCOCPAffectation