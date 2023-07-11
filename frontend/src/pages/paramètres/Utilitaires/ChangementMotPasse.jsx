import React from 'react'
import BackButton from '../../../components/button/BackButton'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'

function ChangementMotPasse() {
  const NavbarContent = (
    <nav className=" flex items-center justify-between  ">
 <div className='text-white'>
Changement mot de passe 
  </div>
  
<BackButton to="/utilitaireParametre"></BackButton>
    
</nav>
)
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-24 m-4 flex justify-between' >
<Label text="Entrez votre code :"></Label>
<Input type="text" placeholder="Votre code"></Input>
    </div>
    <div className='mt-4 m-4 flex justify-between' >
<Label text="Entrez l'ancien mot de passe :"></Label>
<Input type="password" placeholder="Votre ancien mot de passe "></Input>
    </div>
    <div className='mt-4 m-4 flex justify-between' >
<Label text="Entrez nouveau mot de passe :"></Label>
<Input type="password" placeholder="Votre nouveau mot de passe"></Input>
    </div>
    <div className='mt-4 m-4 '>
<Button children="Enregistrer"></Button>
    </div>
  </div>
  )
  
}

export default ChangementMotPasse