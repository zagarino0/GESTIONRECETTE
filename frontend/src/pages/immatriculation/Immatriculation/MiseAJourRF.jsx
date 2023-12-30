import React, { useEffect, useState } from 'react'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import Checkbox from '../../../components/button/Checkbox'
import { Button } from '../../../components/button/button'
import Select from 'react-select'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import axios from 'axios'
import Table from '../../../components/table/Table'

function MiseAJourRF() {
   const [Client , setClient ] = useState([]);

  
   useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/client')
      .then((response) =>{  
        setClient(response.data)
        console.log(Client)
      })
      .catch((error) => console.error(error));
  }, []);
// Header table client
const ClientHeaders =[ "Référence fiscal", "Raison sociale", "Nom commerciale" , "Type", "adresse", "activité","capital" , "commune", "Date accord" , "Date acte", "Date agrement" , "Date attribution RF" , "Date début exe" , "Date cloture exe" , "Date création" , "Date "]
// Data client Table
const ClientData = Client.map((item)=>[item.nif , item.raison_sociale, item.nom_commerciale , item.type , item.adresse , item.activite , item.capital , item.commune , item.date_accord , item.date_acte , item.date_agrement, item.date_attribution_nif , item.date_debut_exe , item.date_cloture_exe , item.date_creation]) 
  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white font-semibold'>
      Mise à jour 
     </div>
     <div>
<BackButton to="/immatriculation"></BackButton>
     </div>
    </div>
 )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
         <Navbar content={Navbarcontent}></Navbar>
       <div className='p-4'>
    
     <div className='p-4 bg-black mt-2 rounded '>
       <p className='text-white text-xl text-center font-semibold'>RENSEIGNEMENTS GENERAUX</p>
     </div>
     <div className='mt-2 flex justify-between'>
      <div className='overflow-y-auto w-[1400px]'>
        <Table headers={ClientHeaders} data={ClientData}></Table>
      </div>
{/* <div className=' w-[500px]  h-[400px] p-2'>
<div className='flex justify-between'>
<Label text="Raison social:" className="text-[15px]  "></Label>
<Input type="text" placeholder="Raison social" className="w-36 h-10"></Input>
<Label text="RF:" className="text-[15px]"></Label>
<Input type="text"  className="w-10 h-10"></Input>
</div>
<div className='flex justify-between mt-1'>
<Label text="Nom commercial:" className="text-[15px]"></Label>
<Input type="text" placeholder="Nom commercial"  className="w-36 h-10"></Input>
<Label text="Code type" className="text-[15px] "></Label>
<Select
 className="w-14"
/>
</div>
<div className='flex justify-between mt-1'>
<Label text="N° CIN / Passport [Pers. Physique]:" className="text-[15px]"></Label>
<div className='flex flex-col'>
<Input type="text" className="h-10 mt-2"></Input>
<Input type="text" className="h-10 mt-2" ></Input>
<Checkbox label="RCS/Auto" className="mt-2"></Checkbox>
<Input type="text" className="h-10 mt-2" ></Input>
</div>
</div>
<div className='flex justify-between mt-1'>
<Label text="Siège social [Adresse] et B.P:" className="text-[15px]"></Label>
<Input type="text" placeholder="Siège social [Adresse] et B.P" className="h-10"></Input>
</div>
<div className='flex justify-between mt-1'>
<Label text="Activité principal:" className="text-[15px]"></Label>
<Input type="text" placeholder="Activité principal" className="h-10"></Input>
</div>
</div>
<div className=' w-[500px] h-[400px] p-2'>

<div className='flex justify-between mt-2'>
<Label text="Activité secondaire 1 :" className="text-[15px]" ></Label>
<Input type="text" placeholder="Activité secondaire 1" className="h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Activité secondaire 2 :"  className="text-[15px]"></Label>
<Input type="text" placeholder="Activité secondaire 2" className="h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Activité secondaire 3 :"  className="text-[15px]"></Label>
<Input type="text" placeholder="Activité secondaire 3" className="h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Activité secondaire 4 :"  className="text-[15px]"></Label>
<Input type="text" placeholder="Activité secondaire 4" className="h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Forme juridique:"  className="text-[15px]"></Label>
<Input type="text" placeholder="Forme juridique" className="h-10"></Input>
</div>

<div className='flex justify-between mt-2'>
<Label text="N° téléphone:" className="text-[15px]"></Label>
<Input type="text" placeholder="N° téléphone" className="h-10"></Input>
</div>

<div className='flex justify-between mt-2'>
<Label text="Capital:" className="text-[15px]"></Label>
<Input type="text" placeholder="Capital" className="h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Date cloture exercice:" className="text-[15px]"></Label>
<Select
/>
</div>
</div>
<div className='w-[500px]  h-[400px] p-2'>
<div className='flex justify-between mt-2'>
<Label text="Code activité ppl:" className="text-[15px]"></Label>
<Input type="text"  className="w-20 h-10"></Input>
<Input type="text" placeholder="statistique"  className="w-36 h-10"></Input>
<Input type="date"  className="w-20 h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Code activité S1:" className="text-[15px]"></Label>
<Input type="text"  className="w-20 h-10"></Input>
<Input type="text" placeholder="statistique"  className="w-36 h-10"></Input>
<Input type="date"  className="w-20 h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Code activité S2:" className="text-[15px]"></Label>
<Input type="text"  className="w-20 h-10"></Input>
<Input type="text" placeholder="statistique"  className="w-36 h-10"></Input>
<Input type="date"  className="w-20 h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Code activité S3:" className="text-[15px]"></Label>
<Input type="text"  className="w-20 h-10"></Input>
<Input type="text" placeholder="statistique"  className="w-36 h-10"></Input>
<Input type="date"  className="w-20 h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Code activité S4:" className="text-[15px]"></Label>
<Input type="text"  className="w-20 h-10"></Input>
<Input type="text" placeholder="statistique"  className="w-36 h-10"></Input>
<Input type="date"  className="w-20 h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Code forme juridique:" className="text-[15px]"></Label>
<Input type="text" placeholder="Code forme juridique" className="h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Nombre salaire:" className="text-[15px]"></Label>
<Input type="text" placeholder="Nombre salaire" className="h-10"></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Nombre établ. secondaire:" className="text-[15px]"></Label>
<Input type="text" placeholder="Nombre établissement secondaire" className="h-10"></Input>
</div>
</div> */}
     </div>
     <div className='flex justify-between mt-2'>
{/*        
 <div className='flex justify-between'>
<Label text="N° Autorisation:" className="text-[15px]"></Label>
<Input type="text"  className="w-20 h-10 ml-2"></Input>
</div>
<div className='flex justify-between'>
<Checkbox label="Cessation"></Checkbox>
<Checkbox label="Bloqué" className="ml-2"></Checkbox>
<Input type="date"  className="w-20 h-10 ml-2"></Input>
<Select
className='ml-2'
/>
</div>


       <div className='flex flex-row '>
        <Label text="date début" className="text-[15px]"></Label>
        <Input type="date"  className="w-20 h-10 ml-2"></Input>
       </div>
       <div className='flex flex-row'>
        <Label text="date fin" className="text-[15px]"></Label>
        <Input type="date"  className="w-20 h-10 ml-2"></Input>
       </div>
       <Button type="submit" children="Prise en charge"></Button>
       <Button type="submit" children="Nouveau" ></Button>
       <Button type="submit" children="Enregistrer MAJ" ></Button>
     </div> */}
    </div>
    </div>
    </div>
  )
}


export default MiseAJourRF