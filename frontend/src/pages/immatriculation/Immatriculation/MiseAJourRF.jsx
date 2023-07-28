import React from 'react'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import Checkbox from '../../../components/button/Checkbox'
import Table from '../../../components/table/Table'
import { Button } from '../../../components/button/button'

function MiseAJourRF() {
  const headers = ['NIF', 'Raison social', 'P1', 'P2', 'Année', 'Reste à recouvrer', 'Nature'];
  const data = [
    ['none', 'none', 'none', 'none', 'none', 'none', 'none'],
   
  ];
    const Navbarcontent = (
       <div className='flex justify-between '>
         <div className='text-white '>
        Mise à jour RF
        </div>
        <div>
<BackButton to="/immatriculation"></BackButton>
        </div>
       </div>
    )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
        <Navbar content={Navbarcontent}></Navbar>
       <div className='flex justify-center items-center bg-black mt-8 m-4 p-4'>
       <div className='flex flex-row'>
          <div className='flex justify-between'>
            <Label text="Du :" className="mt-2"></Label>
            <Input type="date" className="ml-4"></Input>
          </div>
          <div className='flex justify-between ml-4'>
            <Label text="Au :" className="mt-2"></Label>
            <Input type="date" className="ml-4"></Input>
          </div>
        </div>
       </div>
       <div className='m-4 mt-12'>
        <div className='flex flex-row'>
          <Label text="Ce programme a été lancé le :"></Label>
          <p className='text-white ml-4 mt-1'>Date</p>
          <Label text="à :" className="ml-4"></Label>
          <p className='ml-4 text-white mt-1'>Heure</p>
          <div className='flex justify-between ml-10 '>
            <Label text="RF :" ></Label>
            <Input type="text" className="ml-4"></Input>
          </div>
          <div className='flex justify-between ml-4 '>
            <Label text="Reste à recouvrer :" ></Label>
            <Input type="text" className="ml-4"></Input>
          </div>
        </div>
        <div className='mt-12 bg-black p-4'>
<Label text="Impression regroupé par RF "></Label>
<div className='flex flex-row mt-4'>
<Checkbox label="Total"></Checkbox>
<Checkbox label="Par RF" className="ml-4"></Checkbox>
</div>
        </div>
        <div className=' mt-8' >
<Table headers={headers} data={data} ></Table>
      </div>
      <div className='flex justify-between mt-8'>
        <Button children="Executer"></Button>
        <Button children="Rafraîchir"></Button>
        <Button children="Vers Excel"></Button>
        <Button children="Impression Mise en demeure"></Button>
        <Button children="Impression par Nature d'împot"></Button>
      </div>
       </div>
    </div>
  )
}

export default MiseAJourRF