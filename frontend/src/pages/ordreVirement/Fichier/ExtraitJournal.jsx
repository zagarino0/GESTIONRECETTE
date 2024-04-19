import React from 'react'
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import Label from '../../../components/title/label';
import { Title2 } from '../../../components/title/title';
import Input from '../../../components/input/Input';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';

function ExtraitJournal() {
      // header Table components 
      const headers = [  "Date de Regl.","Nature Impôt","Nature Amande", "Montant à payer" , "Total versé"];

      // data Table components  
     const data = [
      ['none', 'none', 'none', 'none' , 'none'],
     
    ];
const NavbarContent =(
  <div className='flex justify-between' >
<Label text="Liste des Déclarations Déposées" className="font-semibold"></Label>
<BackButton to="/Fichier"></BackButton>
  </div>
)
return (
  <div className='bg-[#212122]  h-full w-full'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='flex justify-center p-8 '>
    <div className='flex flex-col'>
    <div className='flex justify-between w-[500px]'>
     <div className='flex flex-col'>
 <Title2 text="Année de Recouvrement"></Title2>
 <Input type="text" className="mt-2"></Input>
    </div>
    <div className='flex flex-col'>
 <Title2 text="Référence Fiscal"></Title2>
 <Input type="text" className="mt-2"></Input>
    </div>
     </div>
     <div className='bg-black mt-4 p-4 rounded w-[1000px]'>
<Label text="Situation Actuelle" className="font-semibold"></Label>
<div className='flex justify-between'>
<div className='flex flex-col'>
<Title2 text="Raison Social" className="mt-2"></Title2>
<Title2 text="Nom Commercial" className="mt-4"></Title2>
<Title2 text="Adresse"className="mt-8"></Title2>
<Title2 text="N° Impôt"className="mt-8"></Title2>
</div>
<div className='flex flex-col w-[500px]'>
  <Input type="text" placeholder="Raison Social" className="w-full mt-2"></Input>
  <Input type="text" placeholder="Nom Commercial" className="w-full mt-2"></Input>
  <Input type="text" placeholder="Adresse" className="w-full mt-2"></Input>
  <div className='flex justify-between mt-2'>
  <Input type="text" ></Input>
  <Input type="text" className="ml-2" ></Input>
  <Input type="text" className="ml-2"></Input>
  </div>
</div>
</div>
     </div>
     <div className='flex flex-col mt-2'>
 <Label text="Détails"></Label>
 <Table headers={headers} data={data} className="w-[1000px] mt-2" ></Table>
     </div>
     <div className='flex justify-between mt-2'>
  <Button children="Visualisation par Nature Impôt"></Button>
  <Button children="Visualisation de tous impôts"></Button>
  <Button children="Imprimer"></Button>
  <Button children="Vers Excel"></Button>
     </div>
    </div>
    </div>
    </div>
  )
}

export default ExtraitJournal