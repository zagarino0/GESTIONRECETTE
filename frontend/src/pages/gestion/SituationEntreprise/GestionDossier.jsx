import React from 'react'
import { Layout } from './Layout'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';

function GestionDossier() {
  // header Table components 
  const headers = [  "Nom et Prénom","RF","N° CIN ", "Par Detenu" , "", ""];

  // data Table components  
 const data = [
  ['none', 'none', 'none', 'none'],
 
];
  const BodyContent = (
        <div className='m-4'>
      <div className='bg-black p-4 flex flex-row'>
     <div className='flex flex-row '>
      <Label text="Votre code :"></Label>
      <Input type="text" placeholder="Code " className="ml-4"></Input>
     </div>
     <div className='flex flex-row ml-4 '>
      <Label text="Votre Mot de passe :"></Label>
      <Input type="password" placeholder="Mot de passe" className="ml-4"></Input>
     </div>
     </div>
     <div className='p-4 bg-black mt-2 '>
       <p className='text-white text-xl text-center'>Principaux Actionnaire ou Associés</p>
     </div>
     <div className='mt-2  flex justify-center'>
     <Table headers={headers} data={data} ></Table>
     </div>
     <div className='flex justify-between'>
     
       <Button type="submit" children="Nouveau" ></Button>
       <Button type="submit" children="Enregistrer MAJ" ></Button>
     </div>
        </div>
      )
      return (
        <div  className='bg-[#212122] h-screen w-screen'>
         <Layout children={BodyContent} ></Layout>
        </div>
      )
}

export default GestionDossier