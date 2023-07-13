import React, { useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Button } from '../../../components/button/button';
import Checkbox from '../../../components/button/Checkbox';
import Input from '../../../components/input/Input';
import Modal from '../../../components/modals/Modal';
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import Label from '../../../components/title/label';

function Operateur() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = ["Code" ,"Nom et Prénom" , "Fonction", "Saisie", "Modification", "Visualisation", "BQN", "Numéro 1", "Numéro 2", "Création"];
  const data = [['none','none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],];
  const NavbarContent = (
    <nav className=" flex items-center justify-between  ">
 <div className='text-white'>
Opérateurs
  </div>
  
<BackButton to="/utilitaireParametre"></BackButton>
    
</nav>
)
const NavbarModal =(
  <div>
  <div className='text-white'>
Opérateurs
  </div>
  </div>
)
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-24 m-4' >
<Table headers={headers} data={data} ></Table>
    </div>
    <div className='m-4'>
      <Button children="Mise à jour " onClick={() => setIsModalOpen(true)}></Button>
    </div>
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[1100px] h-[680px]">
  <Navbar content={NavbarModal} ></Navbar>
  
  <div className='mt-2 m-4 flex flex-row bg-black p-4'>
  <div className=' m-4 flex justify-between' >
<Label text=" Code Opérateur:" className="mt-2"></Label>
<Input type="text" placeholder="Votre code" className="ml-4"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Mot de passe:" className="mt-2"></Label>
<Input type="password" placeholder="Mot de passe" className="ml-4"></Input>
    </div>
  </div>
  <div className=' m-4 flex justify-between' >
<Label text=" Nom et Prénoms:" className="mt-2"></Label>
<Input type="text" placeholder="Votre Nom et Prénoms" className="ml-4"></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Fonction:" className="mt-2"></Label>
<Input type="text" placeholder="Votre Fonction" className="ml-4"></Input>
    </div>
    <div className='mt-2 ml-4'>
<Label text="RECETTE"></Label>
<div className='flex flex-row'>
<Checkbox label="Création" className="m-4"></Checkbox>
<Checkbox label="Modification" className="m-4"></Checkbox>
<Checkbox label="Vusialisation" className="m-4"></Checkbox>
</div>

<div className=' ml-4 mr-4 flex justify-between' >
<Label text=" Compte Administrateur :" className="mt-2"></Label>
<Input type="text" placeholder="Votre Compte Administrateur" className="ml-4"></Input>
    </div>
<div className='mt-2 ml-4'>
<Label text=" GESTION" className="mt-2"></Label>
<div className='flex justify-between mr-4'>
<div>
<Checkbox label="Par RF" className="m-4"></Checkbox>
<Checkbox label="Alpahnum" className="m-4"></Checkbox>
</div>
<div>
<div className='flex justify-between'>
<label className='text-white mt-2' >RF début :</label>
<Input type="text" placeholder="RF début"  className="ml-2"></Input>
</div>
<div className='flex justify-between mt-2'>
<label className='text-white mt-2' >Lettre début :</label>
<Input type="text" placeholder="Lettre début" className="ml-2"></Input>
</div>
</div>
<div>
<div className='flex justify-between'>
<label className='text-white mt-2' >RF fin :</label>
<Input type="text" placeholder="RF fin"  className="ml-2"></Input>
</div>
<div className='flex justify-between mt-2'>
<label className='text-white mt-2' >Lettre fin :</label>
<Input type="text" placeholder="Lettre fin" className="ml-2"></Input>
</div>
</div>
</div>
</div>
<div>

</div>
    </div>
  <div className='flex justify-between m-4'>
  
  <Button children="Nouveau Oper." ></Button>
  <Button children="Enregistrer" ></Button>
  <Button children="Mise à jour Opér."></Button>
  <Button children="Valider mise à jour"></Button>
  <Button onClick={() => setIsModalOpen(false)} children="Quitter" ></Button>
  </div>
</Modal>

  </div>
  )
}

export default Operateur