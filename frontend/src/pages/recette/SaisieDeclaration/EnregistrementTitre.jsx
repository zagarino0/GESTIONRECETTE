import React from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import ReactSelect from 'react-select';
import Checkbox from '../../../components/button/Checkbox'
function EnregistrementTitre() {
  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white font-semibold'>
    Enregistrement des titres de recette ou des déclarations
        </div>
        <div>
          <BackButton to="/saisiDeclarationRecette"></BackButton>
        </div>
    </div>
      )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
     <Navbar content={NavbarContent}></Navbar>
     <div className='p-2 flex justify-between'>
      <div className='flex flex-row'>
      <Button children="Prise en charge"></Button>
      <Button children="N° impot" className="ml-2"></Button>
      <Button children="Attribution ou Mise à jour RF" className="ml-2"></Button>
      <Input type="text" placeholder="Recherche RF..." className="ml-2"></Input>
      </div>
      <div className='flex flex-row'>
       <Label text="Numéro"></Label>
       <ReactSelect className='ml-2'></ReactSelect>
      </div>
     </div>
     <div className='p-2 flex justify-between'>
       <div className="flex flex-row">
      <Label text="N° impot"></Label>
      <Input type="text" className="w-40 h-10 ml-2" placeholder="N° impot..."></Input>
      <ReactSelect className='ml-2'></ReactSelect>
       </div>
       <div className="flex flex-row">
       <Input type="text" className="w-40 h-10 " placeholder="Année..."></Input>
      <Label text="Année concerné" className="ml-2"></Label>
      <ReactSelect className='ml-2'></ReactSelect>
      <Label text="Période" className="ml-2"></Label>
      <ReactSelect className='ml-2'></ReactSelect>
      <ReactSelect className='ml-2'></ReactSelect>
       </div>
     </div>
     <div className="p-2 flex justify-between">
     <div className='flex flex-row'>
      <Label text="Numéro impot"></Label>
      <Label text="type impot" className="ml-8"></Label>
     </div>
     <div className='flex flex-row'>
      <Label text="Transporteur"></Label>
      <Checkbox className="ml-2"></Checkbox>
      <Input type="text" className="ml-2 h-10" placeholder="IM vehicule..."></Input>
     </div>
     </div>
     <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="RF"></Label>
    <Input type="text" placeholder="Référence fiscal..." className="ml-2 h-10"></Input>
     </div>
    <Input type="text" className="h-10"></Input>
     </div>
      <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Raison social"></Label>
    <Input type="text" placeholder="Raison social..." className="ml-2 h-10"></Input>
     </div>
     </div>
      <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Nom commercial"></Label>
    <Input type="text" placeholder="Nom commercial..." className="ml-2 h-10"></Input>
   
     </div>
    <div className="flex justify-between w-[500px]">
    <Label text="Commune" className="ml-2"></Label>
    <Input type="text" className="h-10 ml-2" placeholder="Commune..."></Input>
    </div>
     </div>
       <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Adresse"></Label>
    <Input type="text" placeholder="Adresse..." className="ml-2 h-10"></Input>
     </div>
       <div className='flex justify-between w-[500px]'>
    <Label text="Montant versé"></Label>
    <Input type="text" placeholder="Montant versé..." className="ml-2 h-10"></Input>
     </div>
     </div>
       <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Base Impossable"></Label>
    <Input type="text" placeholder="Base impossable..." className="ml-2 h-10"></Input>
     </div>
       <div className='flex justify-between w-[500px]'>
    <Label text="Montant à Payer"></Label>
    <Input type="text" placeholder="Montant à Payer..." className="ml-2 h-10"></Input>
     </div>
     </div>
       <div className="p-2 bg-black flex justify-center m ">
   <Label text="Mode de Règlement" className="text-center font-semibold"></Label>
     </div>
     
    </div>
  )
}

export default EnregistrementTitre