import React from 'react'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import { Navbar } from '../../../components/navbar/Navbar'
import Modal from '../../../components/modals/Modal'
import Checkbox from '../../../components/button/Checkbox'

function Situation(props) {
  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white font-semibold'>
      Impression
        </div>
        <div>
          
        </div>
    </div>
      )
return (
<div>
    <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
    <Navbar content={NavbarContent}></Navbar>
    <div className='bg-black p-4 m-4'>
 <Label text="Option" className="font-seminold"></Label>
 <Checkbox label="Situation" className="mt-4"></Checkbox>
 <Checkbox label="Etat Récapitulatif" className="mt-4"></Checkbox>
    </div>
    <div className='bg-black p-4 m-4'>
 <Label text="Date" className="font-seminold"></Label>
 <Checkbox label="Journalière" className="mt-4"></Checkbox>
 <Checkbox label="Entre de Deux Dates" className="mt-4"></Checkbox>
    </div>
    <div className='flex justify-between m-4 '>
<div className='flex flex-col '>
    <Label text="Du"></Label>
   <Input type="date" className="mt-1" ></Input>
   </div>
   <div className='flex flex-col  '>
    <Label text="Au"></Label>
   <Input type="date" className="mt-1"></Input>
   </div>
   
</div>
  
<div className='flex justify-between   m-4'>
<Button children="Afficher"></Button>
<Button children="Quitter" onClick={props.quitter}></Button>
</div>
    </Modal>
</div>
)
}

export default Situation