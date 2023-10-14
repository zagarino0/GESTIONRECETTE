import React from 'react'
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Checkbox from '../../../components/button/Checkbox';

function ResteRecouvrerDeuxDate() {
  // header Table components 
  const headers = [  "NIF","Raison social"," P1 ", "P2" , "Année", "Reste à recouvrer"];

  // data Table components  
 const data = [
  ['none', 'none', 'none', 'none' , 'none', 'none'],
 
];
const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white'>
    Reste à recouvrer entre deux dates    
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
      <Label text="Ce programme à été lancé le :"></Label>
      <p className='text-white text-xl ml-2'>Date</p>
      <Label text="à :" className="ml-2"></Label>
      <p className='text-white text-xl ml-2'>Heure</p>
     </div>
     <div className='flex flex-row ml-2 '>
      <Label text="RF :"></Label>
      <Input type="text" placeholder="Code " className="ml-4"></Input>
     </div>
     <div className='flex flex-row ml-4 '>
      <Label text="Reste à recouvrer :"></Label>
      <Input type="text" placeholder="Mot de passe" className="ml-4"></Input>
     </div>
     </div>
     <div className='p-4 bg-black mt-2 '>
       <p className='text-white text-xl '>Impréssion régroupé par RF</p>
       <div className="mt-2">
    <Checkbox label="Total"></Checkbox>
    <Checkbox label="Par RF"></Checkbox>
       </div>
     </div>
     <div className='mt-2  flex justify-center'>
     <Table headers={headers} data={data} classTable="overflow-y-auto h-60" ></Table>
     </div>
     <div className='flex justify-between'>
     
       <Button type="submit" children="Executer" ></Button>
       <Button type="submit" children="Rafraîchir" ></Button>
       <Button type="submit" children="Vers Excel" ></Button>
       <Button type="submit" children="Imprimer Mise en Demeure" onClick={ () => {window.location.href = "/TitrePerceptio"}} ></Button>
       <Button type="submit" children="Imprimer par nature Impot" onClick={() => {window.location.href="/ListeNatureImpot"}}></Button>
     </div>
        </div>
        </div>
      )
}

export default ResteRecouvrerDeuxDate