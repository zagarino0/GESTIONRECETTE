import React from 'react'
import Modal from '../../../components/modals/Modal'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'

function ReleveCheque(props) {
  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white font-semibold'>
      Relevé de Chèque
        </div>
        <div>
          
        </div>
    </div>
      )
return (
<div>
    <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
    <Navbar content={NavbarContent}></Navbar>
    <div className='flex justify-between mt-4 p-8'>
<div className='flex flex-col '>
    <Label text="Date du"></Label>
   <Input type="date" className="mt-1" ></Input>
   </div>
   <div className='flex flex-col  '>
    <Label text="Au"></Label>
   <Input type="date" className="mt-1"></Input>
   </div>
   
</div>
  
<div className='flex justify-between   p-8'>
<Button children="Imprimer"></Button>
<Button children="Quitter" onClick={props.quitter}></Button>
</div>
    </Modal>
</div>
)
}

export default ReleveCheque