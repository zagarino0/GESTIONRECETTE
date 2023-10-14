import React from 'react'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import Checkbox from '../../../components/button/Checkbox'
import { Button } from '../../../components/button/button'
import Table from '../../../components/table/Table'

function ReleveRF() {
  const headers = ['RF', 'Raison social', 'Nom commercial', 'Gest.'];
  const data = [
    ['none', 'none', 'none', 'none'],
   
  ];
  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white '>
      RF Délivrée
     </div>
     <div>
<BackButton to="/immatriculation"></BackButton>
     </div>
    </div>
 )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
      <Navbar content={Navbarcontent}></Navbar>
      <div className='flex justify-between bg-black mr-4 ml-4 mt-2 p-4'>
<div className='flex justify-between '>
<Label text="Du :"></Label>
<Input type="date" className="ml-4"></Input>
</div>
<div className='flex justify-between  ml-4'>
<Label text="Au :"></Label>
<Input type="date"  className="ml-4"></Input>
</div>
<div className='flex justify-between'>
  <Label text="Multicritère :" className="mt-2"></Label>
  <Checkbox label="Oui" className="ml-4"></Checkbox>
  <Checkbox label="Non" className="ml-4"></Checkbox>
</div>

      </div>
      <div className='m-4'>
    <div className='flex justify-between mt-2'>
      <Label text="Classement Personne Morale et Personne Physique :"></Label>
      <Input type="text" className="ml-4 h-10"></Input>
    </div> 
    <div className='flex justify-between mt-2'>
      <Label text="Classement par Forme juridique :"></Label>
      <Input type="text" className="ml-4 h-10"></Input>
    </div>   
    <div className='flex justify-between mt-2'>
      <Label text="Classement par Code Activité :"></Label>
      <Input type="text" className="ml-4 h-10"></Input>
    </div> 
    <div className='flex justify-between mt-2'>
      <Label text="Classement par Nature d'activité :"></Label>
      <Input type="text" className="ml-4 h-10"></Input>
      
    </div>
    <div className='mt-2'>
    <Button children="Détails"></Button>
    </div>
    <div className='flex justify-between mt-4'>
    <Button children="Ajouter [ET]"></Button>
    <Button children="Ajouter [OU]"></Button>
    <Button children="Effacer"></Button>
    <Button children="Afficher les résultats"></Button>
    <Button children="Nouveau"></Button>
    </div>  
    <div className=' mt-4' >
<Table headers={headers} data={data} classTable="overflow-y-auto h-36"  ></Table>
      </div> 

</div> 
<div className='flex flex-row m-4'>
<div className='flex justify-between'>
<Label text="Nombre:"></Label>
<Input type="text" className="ml-4 h-10"></Input>
  </div>
  <div className='flex flex-row'>
    <Button children="Imprimer" className="ml-4 h-14"></Button>
    <Button children="Executer la requête" className="ml-4 w-36 "></Button>
  </div>
<div className='flex flex-row ml-4'>
<Label text="Tapez 'R' si classement par RF ou 'A' si classement par alpha. :"></Label>
<Input type="text" className="ml-4 h-10"></Input>
</div>
</div>     
    </div>
  )
}

export default ReleveRF