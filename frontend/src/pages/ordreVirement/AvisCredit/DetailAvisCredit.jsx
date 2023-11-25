import React from 'react'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'
import Label from '../../../components/title/label'
import Checkbox from '../../../components/button/Checkbox'
import SearchInput from '../../../components/input/SearchInput'
import { Title2 } from '../../../components/title/title'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'
import Table from '../../../components/table/Table'


function DetailAvisCredit() {
  const headers = [  "Num","réf. Bordereau","Date Bord", "Date Valeur" , "Montant AC T ot.", "Montant AC saisi", "Montant AC rest.", "Banque"];
  // header Table components 
  const headers2 = [  "Id_ac","réf. avis crédit","réf. O.V", "RF" , "Raison social", "Montant Vir", "Montant Banque"];
  const headers3 = [  "Id_ex","réf. avis crédit", "Montant Vir","Num O.V", "Date O.V" , "Num Quit", "Date Export", "Date Valeur", "Num impôt"];
// data Table components  
const data = [
['none', 'none', 'none', 'none' , 'none', 'none', 'none', 'none', 'none'],

];
const data2 = [
['none', 'none', 'none', 'none' , 'none', 'none'],

];
const data3 = [
  ['none', 'none', 'none', 'none' , 'none', 'none', 'none', 'none', 'none'],
  
  ];
  const NavbarContent =(
    <div className='flex justify-between' >
<Label text="Visualisation des Avis de crédits" className="font-semibold"></Label>
<BackButton to="/AvisCredit"></BackButton>
    </div>
  )
  return (
    <div className='bg-[#212122]  h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='flex justify-center'>
      <div className='flex flex-col'>
      <div className='flex justify-between w-[1000px] m-4'>
         <div className='flex flex-col'>
         <Checkbox label="Ref"></Checkbox>
         <SearchInput type="text" className="mt-2"></SearchInput>
         </div>
         <div className='flex flex-col'>
         <Checkbox label="Date"></Checkbox>
         <div className='mt-2 flex flex-row'>
          <Title2 text="Du"></Title2>
          <Input type="date" className="ml-2" ></Input>
          <Title2 text="Au" className="ml-4"></Title2>
          <Input type="date" className="ml-2" ></Input>
         </div>
         
         </div>
         <div className='flex flex-col'>
         <Checkbox label="Banque"></Checkbox>
         <SearchInput type="text" className="mt-2"></SearchInput>
         </div>
         <div className=' h-10 mt-6'>
         <Button children="Chercher"></Button>
         </div>
      </div>
      
      <div className='w-[1000px] mt-4 overflow-y-auto h-28'>
      <Table headers={headers} data={data}  className=" w-[1000px] " ></Table>
      
      </div>
      <div className='mt-4'>
   <Title2 text="Détail Avis de Crédit"></Title2>
      </div>
      <div className='w-[1000px] mt-4 overflow-y-auto h-24 '>
      <Table headers={headers2} data={data2}  className=" w-[1000px] " ></Table>
      </div>
      <div className='mt-4'>
   <Title2 text="Détail des Paiements par virement "></Title2>
      </div>
      <div className='w-[1000px] mt-4 overflow-y-auto h-28 '>
      <Table headers={headers3} data={data3}  className=" w-[1000px] " ></Table>
      </div>
      <div className='flex justify-between mt-4 w-[1000px]'>
       <div className='flex flex-col'>
      <Title2 text="Antérieure non exp."></Title2>
      <Input type="text" className="mt-2"></Input>
       </div>
       <div className='flex flex-col'>
      <Title2 text="Montant saisi"></Title2>
      <Input type="text" className="mt-2"></Input>
      <Input type="text" className="mt-2"></Input>
       </div>
       <div className='flex flex-col'>
      <Title2 text="Virement Exporté"></Title2>
      <Input type="text" className="mt-2"></Input>
      <Input type="text" className="mt-2"></Input>
       </div>
       <div className='flex flex-col'>
      <Title2 text="Montant restant"></Title2>
      <Input type="text" className="mt-2"></Input>
      <Input type="text" className="mt-2"></Input>
       </div>
      </div>
      </div>
      </div>
      </div>
  )
}

export default DetailAvisCredit