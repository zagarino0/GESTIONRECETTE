import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/button/button'
import Input from '../../components/input/Input'
import Label from '../../components/title/label'

function LoginParametre() {
  return (
    <div className='flex items-center justify-center  fixed inset-0 bg-neutral-700  transition-opacity'>
    <div className='w-[500px] h-[500px] bg-[#212122] rounded-xl flex justify-center'>
    <div className='mt-8 flex flex-col p-4 w-[400px]'>
    <Label className="text-5xl" text="Identification"></Label>
   <div className='flex flex-col mt-8'>
    <Label text="Code"></Label>
   <Input type="text" placeholder="Votre code"></Input>
   </div>
   <div className='flex flex-col mt-4'>
    <Label text="Mot de passe"></Label>
   <Input type="password" placeholder="Votre mot de passe"></Input>
   </div>
   <Button type="submit" children="Se connecter" onClick={ () => {window.location.href = "/miseAJourParametre"}} className="mt-8"></Button>
   <div className='flex flex-row mt-2 '>
     <p className='text-white text-center '>Retourner au Menu</p>
      <Link to="/SIGRL" className='ml-2 text-red-500 hover:text-blue-500'>SIGRL</Link>
    </div>
    </div>
    
    </div>
</div>
  )
}

export default LoginParametre