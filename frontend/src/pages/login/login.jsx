import React from 'react'
import Hotel from "../../assets/Mahajanga.png"
import { Button } from '../../components/button/button'
import Input from '../../components/input/Input'
import Label from '../../components/title/label'
function LoginPage() {
  return (
    <div className='bg-[#212122] w-screen h-screen text-white flex flex-row '>
<div>
  <img src={Hotel} alt="hotel"  className='w-[500px] h-[540px]'/>
</div>
<div className='flex justify-center  '>
  <div className='flex flex-col'>
    
<div className=' text-5xl ml-28 my-10'>Connexion</div>
<div className='m-2'>
  <div className="flex justify-between mt-4 ml-4">
    <Label text="Identification :" className="mt-4"></Label>
  <Input type="text" placeholder="votre identification" className="ml-4" ></Input>
  </div>
  <div className='flex justify-between mt-4 ml-4'>
    <Label text="Mot de passe : " className="mt-4"></Label>
  <Input type="password" placeholder="votre identification" className="ml-4"></Input>
  </div>
<Button className="mt-6 ml-4 w-96">se connecter</Button>
</div>
  </div>
</div>
    </div>
  )
}

export default LoginPage