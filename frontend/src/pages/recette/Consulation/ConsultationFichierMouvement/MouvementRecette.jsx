import React from 'react'
import Layout from './Layout'
import { useLocation } from 'react-router-dom';
import Table from '../../../../components/table/Table';
import { Title2, Title3 } from '../../../../components/title/title';
import Input from '../../../../components/input/Input';
import { Button } from '../../../../components/button/button';
import Checkbox from '../../../../components/button/Checkbox';
import Label from '../../../../components/title/label';

function MouvementRecette() {
    const location = useLocation(); 
         // header Table components 
   const headers = [  "Date regl","Date maj","Heure maj", "RF" , "P1", "P2", "Nature impôt", "N°", "Ppl", "Raison social"];

   // data Table components  
  const data = [
   ['none', 'none', 'none', 'none' , 'none', 'none', 'none', 'none', 'none', 'none'],
  
 ];
    const contentChildren=(
      <div className='flex justify-center items-center '>
      <div className='flex flex-col m-4'>
        <div className='flex justify-between '>
        <div className='flex flex-col '>
        <Title3 text="Recherche"></Title3>
        <Input type="text" placeholder="Recherche..." className="mt-2"></Input>
        </div>
        <div className='flex flex-col '>
        <Title3 text="Recherche N° QUITTANCE"></Title3>
        <Input type="text" placeholder="Recherche N° QUITTANCE..." className="mt-2 w-60"></Input>
        </div>
        <div className='flex flex-col '>
        <Title3 text="Code Opérateur"></Title3>
        <Input type="text" placeholder="Code Opérateur..." className="mt-2"></Input>
        </div>
        <div className='flex flex-row mt-8'>
         <Button children="Grouper par Code Opérateur" className="h-12"></Button>
         <Button children="Rafraichir" className="ml-4 h-12"></Button>
        </div>
        </div>
    <div className='flex justify-center mt-12 '>
    <Table headers={headers} data={data} classTable="overflow-y-auto h-40" ></Table>
    </div>
    <div className='flex justify-between'>
      <div className='flex flex-col'>
        <Checkbox label="Date"></Checkbox>
        <Checkbox label="Quittance" className={'mt-4'}></Checkbox>
      </div>
      <div className='flex flex-col'>
       <Title3 text="Date début"></Title3>
       <Input type="date" className="mt-2"></Input>
      </div>
      <div className='flex flex-col'>
       <Title3 text="Date fin"></Title3>
       <Input type="date" className="mt-2"></Input>
      </div>
      <div className='flex flex-col'>
      <Title3 text="Numéro Quittance"></Title3>
       <Label text="Numéro Quittance" className='mt-4 font-semibold'></Label>
      </div>
    </div>  
    <div className='flex justify-between mt-4'>
    <Button children="Afficher"></Button>
    <Button children="Imprimer détail"></Button>
    <Button children="Vers Excel"></Button>
    </div>
    <div className='mt-4 bg-black rounded p-4 flex justify-center'>
    <Label text="RECAPITULATIF"></Label>
    </div>
    <div className='flex justify-between mt-4 '>
     <div className='flex flex-col'>
<Label text="Nature de la modification"></Label>
<Title2 text="Numéro d'identification" className="mt-2"></Title2>
<Title2 text="Montant Versé" className="mt-2"></Title2>
<Title2 text="Nature d'impôt" className="mt-2"></Title2>
<Label text="Total" className="mt-2"></Label>
     </div>
     <div className='flex flex-col'>
<Label text="Nombre"></Label>
<Title2 text="Numéro d'identification" className="mt-2"></Title2>
<Title2 text="Montant Versé" className="mt-2"></Title2>
<Title2 text="Nature d'impôt" className="mt-2"></Title2>
<Label text="Total" className="mt-2"></Label>
     </div>
     <div className='flex flex-col'>
<Label text="Montant"></Label>
<Title2 text="Numéro d'identification" className="mt-2"></Title2>
<Title2 text="Montant Versé" className="mt-2"></Title2>
<Title2 text="Nature d'impôt" className="mt-2"></Title2>
<Label text="Total" className="mt-2"></Label>
     </div>
    </div>
    <div className='flex justify-between mt-4'>
    <Button children="Imprimer récap"></Button>
    <Button children="Imprimer opérateur"></Button>
    
    </div>
    </div>  
  
        </div>
         ) 
  return (
    <div className='bg-[#212122] flex  h-screen w-screen'>
    <Layout currentPath={location.pathname} children={contentChildren}></Layout>   
    </div>
  )
}

export default MouvementRecette