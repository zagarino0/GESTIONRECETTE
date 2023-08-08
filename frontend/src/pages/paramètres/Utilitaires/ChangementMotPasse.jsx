import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'
import axios from 'axios'

function ChangementMotPasse() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [OldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3500/user/updatepassword/', {
        code,
        OldPassword ,
        newPassword,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    setMessage('');
  }, [code ,OldPassword , newPassword, confirmPassword]);

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
<Input type="text" placeholder="Votre code"
value={code}
onChange={(e) => setCode(e.target.value)}
></Input>
    </div>
    <div className='mt-4 m-4 flex justify-between' >
<Label text="Entrez l'ancien mot de passe :"></Label>
<Input type="password" placeholder="Votre ancien mot de passe "
   value={OldPassword}
   onChange={(e) => setOldPassword(e.target.value)}
></Input>
    </div>
    <div className='mt-4 m-4 flex justify-between' >
<Label text="Entrez le nouveau mot de passe :"></Label>
<Input type="password" placeholder="Votre nouveau mot de passe "
   value={newPassword}
   onChange={(e) => setNewPassword(e.target.value)}
></Input>
    </div>
    <div className='mt-4 m-4 flex justify-between' >
<Label text=" Confirmer votre mot de passe :"></Label>
<Input type="password" placeholder="Confirmer le nouveau mot de passe"

   value={confirmPassword}
   onChange={(e) => setConfirmPassword(e.target.value)}
></Input>
    </div>
    <div className='mt-4 m-4 '>
<Button children="Enregistrer"   onClick={handleChangePassword}></Button>
    </div>
    {message && <p className="text-red-500 mt-2">{message}</p>}
  </div>
  )
  
}

export default ChangementMotPasse