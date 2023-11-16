import React from 'react'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import Checkbox from '../../../components/button/Checkbox'
import { Title3 } from '../../../components/title/title'
import { Navbar } from '../../../components/navbar/Navbar'
import Modal from '../../../components/modals/Modal'
import ReactSelect from 'react-select';
function InterpretationRecette(props) {
  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white font-semibold'>
      Interprétation de Recette 
        </div>
        <div>
          
        </div>
    </div>
      )
return (
<div>
    <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
    <Navbar content={NavbarContent}></Navbar>
    <div className='flex justify-between mt-4 pl-8 pr-8 mt-4'>
<div className='flex flex-col '>
    <Label text="Du"></Label>
   <Input type="date" className="mt-1" ></Input>
   </div>
   <div className='flex flex-col  '>
    <Label text="Au"></Label>
   <Input type="date" className="mt-1"></Input>
   </div>
   
</div>
        <div className='flex justify-center items-center p-2 mt-4'>
           <div className='bg-black w-[400px] h-[200px] p-2 '>
             <Title3 text="Option"className="font-semibold ml-4"></Title3>
             <Checkbox label="Ecart Réalisation % Prévisions" className="mt-2"></Checkbox>
             <Checkbox label="Article - Chapitre" className="mt-2"></Checkbox>
             <Checkbox label="Situation Decadaire" className="mt-2"></Checkbox>
      
           </div>
        </div>
        <div className='flex justify-center items-center mt-4 p-2'>
           <div className='bg-black w-[400px] h-[120px] p-4 '>
             <Title3 text="Par rapport à la Prévision"className="font-semibold "></Title3>
            <ReactSelect className='mt-2'></ReactSelect>
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

export default InterpretationRecette