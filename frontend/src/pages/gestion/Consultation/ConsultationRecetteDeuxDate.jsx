import React from 'react'
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Checkbox from '../../../components/button/Checkbox';
import ReactSelect from 'react-select';
function ConsultationRecetteDeuxDate() {
   // header Table components 
   const headers = [  "Nature de l'impôt","Ppl"," RF ", "Raison social" ];

   // data Table components  
  const data = [
   ['none', 'none', 'none', 'none' ],
  
 ];
 const NavbarContent = (
     <div className='flex justify-between'>
     <div className='text-white'>
     Consultation recette entre deux dates    
       </div>
         <div>
           <BackButton to="/ConsultationGestion"></BackButton>
         </div>
     </div>
       )
       return (
         <div  className='bg-[#212122] h-screen w-screen'>
             <Navbar content={NavbarContent}></Navbar>
      <div className='m-4'>
            <div className='bg-black p-4 flex justify-center'>
             <Label text="Du :"></Label>
       <Input type="date" className="ml-4"></Input>
       <Label text="Au :" className="ml-4"></Label>
       <Input type="date"  className="ml-4"></Input>
      </div>
       <div className='bg-black p-4 mt-2 flex  flex-row'>
       <div className='flex flex-row '>
       <Label text="Numéro impôt :"></Label>
       <ReactSelect className='ml-4'></ReactSelect>
      </div>
      <div className='flex flex-row ml-2 '>
    <Button type="submit" children="Tous impôt"></Button>
    <Button type="submit" children="Code N° impôt" className="ml-2"></Button>
    <Button type="submit" children="Par nature d'impôt" className="ml-2"></Button>
      </div>
      <div className='flex flex-row ml-4 '>
       <Label text="Montant :"></Label>
       <Input type="text" placeholder="Montant" className="ml-4"></Input>
      </div>
      </div>
      <div className='p-4 bg-black mt-2  flex flex-row'>
  
     <Checkbox label="Classement par date de dépôt"className="ml-4"></Checkbox>
     <Checkbox label="Classement par ordre croissant [Montant Versé]"className="ml-4"></Checkbox>
     <Checkbox label="Classement par ordre décroissant [Montant Versé]"className="ml-4"></Checkbox>
        
      </div>
      <div className='mt-2  flex justify-center'>
      <Table headers={headers} data={data} classTable="overflow-y-auto h-80" ></Table>
      </div>
      <div className='flex justify-between'>
        <Button type="submit" children="Imprimer " onClick={ () => {window.location.href = "/MontantNatureImpot"}} ></Button>
        <Button type="submit" children="Quitter" onClick={() => {window.location.href="/ConsultationGestion"}}></Button>
      </div>
         </div>
         </div>
       )
}

export default ConsultationRecetteDeuxDate