import React, { useEffect, useState } from 'react';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import Label from '../../../components/title/label';
import axios from 'axios';

function ChangementMotPasse() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.'); // Corrected the error message.
      return;
    }

    try {
      const response = await axios.put('http://localhost:3500/user/updatepassword/', {
        code,
        password,
        newPassword,
      });
      
      if (response.data.hasOwnProperty("success")) {
          console.log("Mot de passe modifié");
          setMessage(response.data.success);
      } else {
          console.log("Mot de passe incorrect");
          setMessage(response.data.message);
      }
      
      
    } catch (error) {
      setMessage('Une erreur s\'est produite. Veuillez réessayer.'); // Corrected the error message.
    }
  };

  useEffect(() => {
    setMessage('');
  }, [code, password, newPassword, confirmPassword]); // Added confirmPassword to the dependencies array.

  const NavbarContent = (
    <nav className="flex items-center justify-between">
      <div className='text-white'>
        Changement mot de passe
      </div>

      <BackButton to="/utilitaireParametre"></BackButton>
    </nav>
  );

  return (
    <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
   <div className='border border-2 m-6 mt-8 mb-8'>
   <div className='mt-24 mr-40 ml-40 flex justify-between' >
        <Label  className='text-3xl' text="Entrez votre code :"></Label>
        <Input type="text" placeholder="Votre code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></Input>
      </div>
      <div className='mt-4 mr-40 ml-40 flex justify-between' >
        <Label className='text-3xl' text="Entrez l'ancien mot de passe :"></Label>
        <Input type="password" placeholder="Votre ancien mot de passe " // Changed type to "password" for security.
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
      </div>
      <div className='mt-4 mr-40 ml-40 flex justify-between' >
        <Label className='text-3xl' text="Entrez le nouveau mot de passe :"></Label>
        <Input type="password" placeholder="Votre nouveau mot de passe " // Changed type to "password" for security.
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        ></Input>
      </div>
      <div className='mt-4 mr-40 ml-40 mb-20 flex justify-between' >
        <Label className='text-3xl'  text=" Confirmer votre mot de passe :"></Label>
        <Input type="password" placeholder="Confirmer le nouveau mot de passe" // Changed type to "password" for security.
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Input>
      </div>
   </div>
      <div className='mt-4 mr-10 ml-60 '>
        <Button children="Enregistrer" onClick={handleChangePassword}></Button>
      </div>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
}

export default ChangementMotPasse;
