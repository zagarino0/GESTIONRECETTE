import React from 'react'
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Label from '../../../components/title/label';

function PrevisonAnnuelle() {
  const headers = ["Année" ,"Num_imp" , "Libella", "code_Prev", "M1", "M2", "M3", "M4"];
  const data = [['none','none', 'none', 'none', 'none', 'none', 'none', 'none'],];
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour prévisions
    </div>
    <div>
      <BackButton to="/parametreParametre"></BackButton>
    </div>
</div>
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className=' m-4 '>
      <div className='flex justify-between'>
<Label text="Exercice"></Label>
<Input type="text"></Input>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Mois"></Label>
<Input type="text"></Input>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Prévision"></Label>
<Input type="text"></Input>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Code impot"></Label>
<Input type="text"></Input>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Impot synthetique"></Label>
<Input type="text"></Input>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Montant Prev. en Ar."></Label>
<Input type="text"></Input>
      </div>
    </div>
    <div className='mt-4 m-4' >
<Table headers={headers} data={data} ></Table>
    </div>
    <div className='m-4'>
<Button children="Enregistrer"></Button>
<Button children="Imprimmer" className="ml-4"></Button>

    </div>
  </div>
  )
}

export default PrevisonAnnuelle