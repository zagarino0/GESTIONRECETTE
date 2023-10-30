import React from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'
import Checkbox from '../../../components/button/Checkbox'
import Input from '../../../components/input/Input'
import Table from '../../../components/table/Table'

function ConsultationImmatriculation() {
  const headers = ['Raison social', 'Nom commercial', 'CIN', 'Adresse', 'RF',"",""];
  const formattedData = [
["none","none","none","none","none"],
  ];

  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white '>
      Consultation 
     </div>
     <div>
<BackButton to="/immatriculation"></BackButton>
     </div>
    </div>
 )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
    <Navbar content={Navbarcontent}></Navbar>
    <div className="m-4">
<div className='bg-black p-4 flex justify-between'>
<div className='flex flex-col'>
<Label text="Choix par" ></Label>
<Checkbox label="Raison social"></Checkbox>
<Checkbox label="Nom commercial"></Checkbox>
<Checkbox label="Adresse"></Checkbox>
<Checkbox label="CIN"></Checkbox>
<Checkbox label="RF"></Checkbox>
</div>
<div className='flex flex-col'>
<Input type="text" placeholder="Entrez le texte"></Input>
</div>
</div>
<div className='mt-4'>
<Table headers={headers} data={formattedData} ></Table>
</div>
    </div>
    <div className='m-4'>
      <Input type="text" placeholder="Nombre d'enr."></Input>
    </div>
    </div>
  )
}

export default ConsultationImmatriculation