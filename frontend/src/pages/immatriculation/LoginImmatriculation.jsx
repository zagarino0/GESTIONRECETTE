import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/button/button';
import Input from '../../components/input/Input';
import Label from '../../components/title/label';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/input/PasswordInput';
function LoginImmatriculation() {
  const [code, setCode] = useState('');
  const [mdp, setMdp] = useState('');
  const history = useNavigate();

  const handleLogin = () => {
    // Replace with your API endpoint for user authentication
    const apiUrl = 'http://localhost:3500/auth';

    // Create a request body with user input
    const requestBody = {
      "code": code,
      "mdp": mdp,
    };

    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        const userData = response.data;

        // Check if the user is authenticated and has immatriculation_prise_charge set to true
        if (userData.login && userData.immatriculation_prise_charge) {
          // Redirect to the desired page if the condition is met
          history.push('/PriseEnCharge');
        } else {
          console.log('Invalid credentials or immatriculation_prise_charge is not set to true.');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        console.log('Login failed. Please try again.');
      });
  };

  return (
    <div className='flex items-center justify-center fixed inset-0 bg-neutral-700 transition-opacity'>
      <div className='w-[500px] h-[500px] bg-[#212122] rounded-xl flex justify-center'>
        <div className='mt-8 flex flex-col p-4 w-[400px]'>
          <Label className="text-5xl" text="Identification"></Label>
          <div className='flex flex-col mt-8'>
            <Label text="Code"></Label>
            <Input type="text" placeholder="Votre code" value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <div className='flex flex-col mt-4'>
            <Label text="Mot de passe"></Label>
            <PasswordInput value={mdp} onChange={(e)=> setMdp(e.target.value)}></PasswordInput>
          </div>
          <Button type="submit" children="Se connecter" onClick={handleLogin} className="mt-8"></Button>
          <div className='flex flex-row mt-2 '>
            <p className='text-white text-center '>Retourner au Menu</p>
            <Link to="/SIGRL" className='ml-2 text-red-500 hover:text-blue-500'>SIGRL</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginImmatriculation;
