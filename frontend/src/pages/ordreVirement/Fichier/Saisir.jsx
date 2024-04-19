import React from 'react'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'
import BackButton from '../../../components/button/BackButton'
import Input from '../../../components/input/Input'
import { Title2 } from '../../../components/title/title'
import ReactSelect from "react-select"
import Checkbox from '../../../components/button/Checkbox'
import { Button } from '../../../components/button/button'
function Saisir() {
  const NavbarContent =(
    <div className='flex justify-between' >
<Label text="Saisie de Déclaration (VIREMENT)" className="font-semibold"></Label>
<BackButton to="/Fichier"></BackButton>
    </div>
  )
  return (
    <div className='bg-[#212122]  h-full w-full'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='flex justify-center items-center p-8'>
<div className='flex flex-col mt-2'>
<div className='flex fex-row'>
  <Input type="date" className="mt-6"></Input>
  <div className='ml-4 flex flex-col'>
<Title2 text="Numéro Récépissé"></Title2>
<Input type="text" ></Input>
  </div>
</div>
<div className='flex justify-between mt-2 w-[1200px]'>
<div className='flex flex-row'>
<div className='flex flex-col'>
<Title2 text="N° Impôt"></Title2>
<Input type="text"></Input>
<Title2 text="N° Impôt" ></Title2>
</div>
<div className='ml-4 mt-6'>
  <ReactSelect></ReactSelect>
  <Title2 text="Type d'impôt" ></Title2>
</div>
</div>
<div className='flex flex-col'>
  <Title2 text="Année concernée"></Title2>
  <ReactSelect></ReactSelect>
  </div>
<div className='flex flex-col'>
  <Title2 text="Période"></Title2>
 <div className='flex flex-row'>
 <ReactSelect></ReactSelect>
 <ReactSelect className='ml-4'></ReactSelect>
 </div>
</div>
<div className='flex flex-col'>
<div className='flex flex-row'>
<div className='flex flex-col'>
<Title2 text="Pér."></Title2>
<Input type="text"></Input>
</div>
<div className='flex flex-col ml-4'>
<Title2 text="à"></Title2>
<Input type="text"></Input>
</div>
 </div>
 <div className='mt-4'>
<Checkbox label="transporteur"></Checkbox>
 </div>
</div>
</div>
<div className='flex justify-between'>
<div className='flex flex-col'>
<Title2 text="RF" className="mt-4"></Title2>
<Title2 text="Raison social" className="mt-4"></Title2>
<Title2 text="Nom commercial" className="mt-4"></Title2>
<Title2 text="Adresse" className="mt-6"></Title2>
<Title2 text="Base Imposable" className="mt-8"></Title2>
<Title2 text="Montant à payer" className="mt-8"></Title2>

<Title2 text="Montant versé" className="mt-12"></Title2>

<Title2 text="Reste à payer" className="mt-16"></Title2>
</div>
<div className='flex flex-col w-[500px] mt-2'>
<Input type="text" placeholder="RF" className=" w-full"></Input>
<Input type="text" placeholder="Raison social" className="mt-2 w-full"></Input>
<div className='flex flex-row mt-2'>
<Input type="text" placeholder="Nom commercial" ></Input>
<Title2 text="Commune" className="ml-4 mt-2"></Title2>
<Input type="text" placeholder="Commune" className="ml-4 w-60"></Input>
</div>
<Input type="text" placeholder="Adresse" className="mt-2 w-full"></Input>
<Input type="text" placeholder="Base Imposable" className="mt-2 w-full"></Input>
<div className='flex flex-col'>
<Input type="text" placeholder="Montant à payer" className="mt-2 w-full"></Input>
<Title2 text="Montant à payer" className="mt-2"></Title2>
</div>
<div className='flex flex-col'>
<Input type="text" placeholder="Montant versé" className="mt-2 w-full"></Input>
<Title2 text="Montant versé" className="mt-2"></Title2>
</div>
<Input type="text" placeholder="Reste à payer" className="mt-2 w-full"></Input>
</div>
</div>
<div className='bg-black p-4 flex justify-center mt-2 rounded'>
<Title2 text="MODE DE REGLEMENT" className="font-semibold"></Title2>
</div>
<div className='flex flex-row mt-2'>
<Checkbox label="Virement"></Checkbox>
<Checkbox label="Autre" className="ml-4"></Checkbox>
<div className='flex flex-col ml-4'>
<Title2 text="N° Compte" className=" mt-2"></Title2>
<Input type="text" placeholder="N° Compte" className=" mt-2"></Input>
</div>
<div className='flex flex-col ml-4'>
<Title2 text="Code banque" className=" mt-2"></Title2>
<ReactSelect className=' mt-2'></ReactSelect>
</div>
<div className='flex flex-col ml-4'>
  <Title2 text="Nom de la banque" className=" mt-2"></Title2>
  <Title2 text="Nom de la banque" className=" mt-2 font-semibold"></Title2>
</div>
<div className='flex flex-col ml-4'>
  <Title2 text="Nom Commercial de la banque" className=" mt-2"></Title2>
  <Title2 text="Nom Commercial de la banque" className=" mt-2 font-semibold"></Title2>
</div>
</div>
<div className='flex justify-between mt-2'>
  <Button children="Nouveau"></Button>
  <Button children="Enregistrer"></Button>
  <Button children="Mise à jour"></Button>
  <Button children="Valider Modification"></Button>
  <Button children="Visualisation"></Button>
</div>
</div>
      </div>
    </div>
  )
}

export default Saisir