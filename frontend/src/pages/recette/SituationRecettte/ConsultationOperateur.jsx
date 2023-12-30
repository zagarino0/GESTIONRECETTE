import React from 'react'
import Modal from '../../../components/modals/Modal'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'
 import ReactSelect from "react-select"
import { Title2, Title3 } from '../../../components/title/title'
function ConsultationOperateur(props) {
  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white font-semibold'>
     CHEQUE/ESPECE
        </div>
        <div>
          
        </div>
    </div>
      )
return (
<div>
    <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
    <Navbar content={NavbarContent}></Navbar>
   <div className='flex justify-between m-4'>
   <div className='flex flex-col'>
   <Label text="Code Opérateur"></Label>
   <ReactSelect className='mt-1'></ReactSelect>
   <Title3 text="Type d'impôt" className="mt-2"></Title3>
   </div>
   <div className='flex justify-between '>
<div className='flex flex-col '>
    <Label text="Du"></Label>
   <Input type="date" className="mt-1" ></Input>
   </div>
   <div className='flex flex-col ml-4  '>
    <Label text="Au"></Label>
   <Input type="date" className="mt-1"></Input>
   </div>
   
   </div>
   </div>     
         
<div className='flex justify-between m-4 '>
  <div className='flex flex-col'>
  <Label text="Chèque" ></Label>
  <Label text="Espèce" className="mt-2"></Label>
  <Label text="Virement" className="mt-2"></Label>
  <Label text="Bar" className="mt-2"></Label>
  <Label text="Autre" className="mt-2"></Label>
  </div>
  <div>
  <div className='flex flex-row mt-2'>
<Title2 text="Montant"></Title2>
<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Montant"></Title2>
<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Montant"></Title2>
<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Montant"></Title2>
<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Montant"></Title2>
<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
  </div>
  <div>
  <div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
  </div>
  

</div>   
 <div className=' p-4 rounded flex justify-center p-4 bg-black '>
 <Label text="Recette" className="font-bold"></Label>
 </div>
 <div className='flex justify-between m-4 '>
  <div className='flex flex-col'>
  <Label text="Montant total Chèque" className="mt-4" ></Label>
  <Label text="Montant total Espèce" className="mt-4"></Label>
  <Label text="Montant total Virement" className="mt-4"></Label>
  <Label text="Montant total Bar" className="mt-4"></Label>
  <Label text="Montant total Autre" className="mt-4"></Label>
  <Label text="Montant total Annulation" className="mt-4"></Label>
  </div>
  <div>
  <div className='flex flex-row mt-4'>

<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>

<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>

<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>

<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>

<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>

<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
  </div>
  <div>
  <div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>

<div className='flex flex-row mt-2'>
<Title2 text="Nombre"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>


  </div>
  </div>
<div className='flex justify-between m-4'>
  <div>
  
   <Button children="Quitter" onClick={props.quitter}></Button>
  
  </div>
<div className='flex flex-row '>
<Title2 text="Depot sans paiment"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
</div>
<div className='flex justify-between m-4 mb-8'>
<div>
</div>
<div className='flex flex-row'>
<Title2 text="Total"></Title2>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
<div>
<Title2 text="Nombre" className="ml-2 font-semibold"></Title2>
</div>
</div>
   
    </Modal>
</div>
)
}

export default ConsultationOperateur