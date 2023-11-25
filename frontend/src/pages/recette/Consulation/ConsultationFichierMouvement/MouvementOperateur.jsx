import React from 'react'
import Layout from './Layout'
import { useLocation } from 'react-router-dom';
import Table from '../../../../components/table/Table';
import Label from '../../../../components/title/label';
import Input from '../../../../components/input/Input';
import { Button } from '../../../../components/button/button';

function MouvementOperateur() {
    const location = useLocation(); 
            // header Table components 
   const headers = [  "Original","Date de maj","Heure de0 maj", "Opérateur" , "Nom et Prénoms", "Fonction", "Saisie", "Modification"];

   // data Table components  
  const data = [
   ['none', 'none', 'none', 'none' , 'none', 'none', 'none', 'none'],
  
 ];
    const contentChildren=(
      <div className='flex justify-center items-center '>
   <div className='flex flex-col'>
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

export default MouvementOperateur