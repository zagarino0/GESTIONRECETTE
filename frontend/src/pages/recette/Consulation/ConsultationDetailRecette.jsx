import React from 'react'
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import Table from '../../../components/table/Table';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';

function ConsultationDetailRecette() {
    const headers = ['N° Récepissé', 'RF', 'Raison social', 'P1', 'P2',"Impôt","Nature Impôt"];
    const formattedData = [
  ["none","none","none","none","none","none","none"],
    ];
    const NavbarContent = (
        <div className='flex justify-between'>
        <div className='text-white font-semibold'>
        Visualisation
            </div>
            <div>
              <BackButton to="/ConsultationRecette"></BackButton>
            </div>
        </div>
          )
      return (
        <div className='bg-[#212122] h-screen w-screen'>
         <Navbar content={NavbarContent}></Navbar>
         <div className='flex justify-center items-center h-[800px]'>
<div className='flex flex-col'>
<Table headers={headers} data={formattedData} ></Table>
<div className='flex justify-between'>
<div className='flex flex-col mt-2'>
        <Label text="Date"></Label>
       <Input type="date" ></Input>
       </div>
       <div className='flex flex-col mt-2 '>
        <Label text="N° Récépissé"></Label>
       <Input type="text" placeholder="N° Récépissé..."></Input>
       </div>
       <div className='flex flex-col mt-2 '>
        <Label text="RF"></Label>
       <Input type="text" placeholder="RF..."></Input>
       </div>

</div>
<div className='flex justify-between mt-4'>
    <Button children="Afficher"></Button>
    <Button children="Grouper par RF"></Button>
    <Button children="Imprimer"></Button>
    <Button children="Rafraîchir"></Button>
</div>
</div>
</div>
        </div>
      )
    }
export default ConsultationDetailRecette