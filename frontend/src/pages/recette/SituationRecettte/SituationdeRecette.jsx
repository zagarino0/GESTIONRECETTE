import React from 'react'
import Modal from '../../../components/modals/Modal'
import { Navbar } from '../../../components/navbar/Navbar'
import { Title3 } from '../../../components/title/title'
import Checkbox from '../../../components/button/Checkbox'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'

function SituationdeRecette(props) {
    const NavbarContent = (
        <div className='flex justify-between'>
        <div className='text-white font-semibold'>
          Situation de Recette Fiscal
            </div>
            <div>
              
            </div>
        </div>
          )
  return (
    <div>
        <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
        <Navbar content={NavbarContent}></Navbar>
            <div className='flex justify-center items-center p-2'>
               <div className='bg-black w-[400px] h-[200px] p-2 '>
                 <Title3 text="Option"className="font-semibold ml-4"></Title3>
                 <Checkbox label="Situation de Recette" className="mt-2"></Checkbox>
                 <Checkbox label="Decade" className="mt-2"></Checkbox>
                 <Checkbox label="Bordeaux de transfert de Recette" className="mt-2"></Checkbox>
                 <Checkbox label="Extrait de Recette" className="mt-2"></Checkbox>
               </div>
            </div>
            <div className='flex justify-center items-center mt-4 p-2'>
               <div className='bg-black w-[400px] h-[120px] p-2 '>
                 <Title3 text="Date"className="font-semibold ml-4"></Title3>
                 <Checkbox label="Journalière" className="mt-2"></Checkbox>
                 <Checkbox label="Entre deux Date" className="mt-2"></Checkbox>
                
               </div>
            </div>
            <div className='flex justify-between mt-4 p-8'>
<div className='flex flex-col '>
        <Label text="Du"></Label>
       <Input type="date" className="mt-1" ></Input>
       </div>
       <div className='flex flex-col  '>
        <Label text="Au"></Label>
       <Input type="date" className="mt-1"></Input>
       </div>
       
</div>
<div className='flex justify-between   p-8'>
    <Button children="Imprimer" onClick={() => {window.location.href = "/SituationRecetteImpression"}}></Button>
    <Button children="Quitter" onClick={props.quitter}></Button>
</div>
        </Modal>
    </div>
  )
}

export default SituationdeRecette