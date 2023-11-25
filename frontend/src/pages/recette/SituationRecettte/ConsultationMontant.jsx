import React from 'react'
import { Button } from '../../../components/button/button'
import { Title2 } from '../../../components/title/title'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Navbar } from '../../../components/navbar/Navbar'
import Modal from '../../../components/modals/Modal'

function ConsultationMontant(props) {
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
  <Label text="Montant Chèque" ></Label>
  <Label text="Montant Espèce" className="mt-2"></Label>
  <Label text="Montant Virement" className="mt-2"></Label>
  <Label text="Montant Bar" className="mt-2"></Label>
  <Label text="Autre" className="mt-2"></Label>
  <Label text="Montant Annulation" className="mt-2"></Label>
  <Label text="Total" className="mt-2"></Label>
  </div>
  <div>
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
<div className='flex flex-row mt-2'>

<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>

<Title2 text="Montant" className="ml-2 font-semibold"></Title2>
</div>
  </div>
  

</div>   
 
   <div className='m-4 flex justify-between'>
   <Button children="Nouveau" ></Button>
   <Button children="Executer" ></Button>
   <Button children="Quitter" onClick={props.quitter}></Button>
   </div>
    </Modal>
</div>
)
}
export default ConsultationMontant