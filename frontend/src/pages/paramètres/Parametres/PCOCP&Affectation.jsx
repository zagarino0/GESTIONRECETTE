import React from 'react'
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';

function PCOCPAffectation() {
  const headers = ["numéro" ,"LIBELLE " ];
  const data = [['none','none'],];
  const headerContent = ["Impot" ,"Budget" ,"Taux" ,"PCOP" ];
  const dataContent = [['none','none','none','none'],];
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
<Table headers={headers} data={data} ></Table>
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