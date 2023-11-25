import React from 'react'
import Layout from './Layout'
import { useLocation } from 'react-router-dom';
import { Button } from '../../../../components/button/button';
import Input from '../../../../components/input/Input';
import Label from '../../../../components/title/label';
import Table from '../../../../components/table/Table';

function MouvementHistorique() {
    const location = useLocation(); 
               // header Table components 
   const headers = [  "Modif","RF","RSOC", "N_COM" , "N_CIN1", "ADRESS", "ACT_PLL"];

   // data Table components  
  const data = [
   ['none', 'none', 'none', 'none' , 'none', 'none', 'none'],
  
 ];
    const contentChildren=(
      <div className='flex justify-center items-center '>
   <div className='flex flex-col'>
    <div className='flex flex-row'>
    <div className='flex flex-col'>
      <Label text="Date de début"></Label>
      <Input type="date" className="mt-2"></Input>
     </div>
     <div className='mt-8 ml-8'>
     <Button children="Afficher par RF"></Button>  
     </div>
    </div>
   <div className='flex justify-center mt-12 '>
    <Table headers={headers} data={data} classTable="overflow-y-auto " ></Table>
    </div>
    <div className='flex flex-row mt-4'>
     <div className='flex flex-col'>
      <Label text="Date de début"></Label>
      <Input type="date" className="mt-2"></Input>
     </div>
     <div className='flex flex-col ml-4'>
      <Label text="Date fin"></Label>
      <Input type="date" className="mt-2"></Input>
     </div>
    </div>
    <div className='flex justify-between mt-4'>
    <Button children="Afficher"></Button>
    <Button children="Imprimer"></Button>
    </div>
   </div>
        </div>
         )
  return (
    <div className='bg-[#212122]  h-screen w-screen'>
 <Layout currentPath={location.pathname} children={contentChildren}></Layout>
 </div>
  )
}

export default MouvementHistorique