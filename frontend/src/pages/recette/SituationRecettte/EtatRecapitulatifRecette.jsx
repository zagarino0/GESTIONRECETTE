import React from 'react'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import Checkbox from '../../../components/button/Checkbox'
import { Title3 } from '../../../components/title/title'
import { Navbar } from '../../../components/navbar/Navbar'
import Modal from '../../../components/modals/Modal'
import ReactSelect from 'react-select'
function EtatRecapitulatifRecette(props) {
  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white font-semibold'>
     Etat Récapitulatif des Recettes au Profil des Collectivités
        </div>
        <div>
          
        </div>
    </div>
      )
return (
<div>
    <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
    <Navbar content={NavbarContent}></Navbar>
   <div className='flex justify-between'>
   <div className='w-[400px]'>
   <div className='flex justify-between   p-8'>
<div className='flex flex-col '>
    <Label text="Du"></Label>
   <Input type="date" className="mt-1" ></Input>
   </div>
   <div className='flex flex-col  '>
    <Label text="Au"></Label>
   <Input type="date" className="mt-1"></Input>
   </div>
   
</div>
        
           <div className='bg-black w-[400px] ml-4 h-[200px] rounded p-4'>
             <Title3 text="Selection en un Option"className="font-semibold ml-4"></Title3>
             <Checkbox label="Tout impôt" className="mt-2"></Checkbox>
             <Checkbox label="Impôt spécifique" className="mt-2"></Checkbox>
             <ReactSelect className='w-60 mt-2'></ReactSelect>
           </div>
            
        <div className='bg-black w-[400px] h-[200px] ml-4 mt-4 rounded p-4 '>
             <Title3 text="Selection en un Option"className="font-semibold ml-4"></Title3>
             <Checkbox label="Tout Commune" className="mt-2"></Checkbox>
             <Checkbox label="Commune spécifique" className="mt-2"></Checkbox>
             <ReactSelect className='w-60 mt-2'></ReactSelect>
           </div>
<div className='flex justify-between   p-8'>
<Button children="Visualiser"></Button>
<Button children="Quitter" onClick={props.quitter}></Button>
</div>
   </div>
   <div className='w-[400px] '>
    <div className='flex flex-col mt-8 '>
      <Label text="Province"></Label>
    <ReactSelect className='w-60 mt-2'></ReactSelect>
    </div>
    <div className='flex flex-col mt-2'>
      <Label text="Région"></Label>
    <ReactSelect className='w-60 mt-2'></ReactSelect>
    </div>
    <div className='flex flex-col mt-2'>
      <Label text="District"></Label>
    <ReactSelect className='w-60 mt-2'></ReactSelect>
    </div>
    <div className='flex flex-col mt-2'>
      <Label text="Commune"></Label>
    <ReactSelect className='w-60 mt-2'></ReactSelect>
    </div>
   </div>
   </div>
    </Modal>
</div>
)
}
export default EtatRecapitulatifRecette