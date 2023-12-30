import React, { useState } from 'react'
import { Layout } from '../Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ModalError, ModalErrorServer } from '../Modal';
import { Button } from '../../../components/button/button';
import PasswordInput from '../../../components/input/PasswordInput';
import Label from '../../../components/title/label';

import axios from 'axios';
import Input from '../../../components/input/Input';
function ConsultationRF() {
    const location = useLocation(); 
    const [code, setCode] = useState('');
    const [mdp, setMdp] = useState('');
    let navigate = useNavigate();
    const [isModalError, setIsModalError] = useState(false);
    const [isModalErrorServer, setIsModalErrorServer] = useState(false);
    
    const handleLogin = () => {
      // Replace with your API endpoint for user authentication
      const apiUrl = 'http://localhost:3500/user/auth';
  
      // Create a request body with user input
      const requestBody = {
        "code": code,
        "mdp": mdp,
      };
  
      axios
        .post(apiUrl, requestBody)
        .then((response) => {
          const userData = response.data;
          console.log(userData)
          // Check if the user is authenticated and has immatriculation_prise_charge set to true
          if (userData.login && userData.immatriculation_prise_charge) {
            // Redirect to the desired page if the condition is met
            navigate('/ConsultationImmatriculation');
          } else {
            setIsModalError(true);
          }
        })
        .catch((error) => {
          console.error('Login error:', error);
         
          setIsModalErrorServer(true);
        });
    };
  
    const contentChildren =(
        <div className='flex  justify-center  mt-14 '>
        <div className='w-[500px] h-[500px] bg-[#212122] rounded-xl flex justify-center'>
          <div className='mt-8 flex flex-col p-4 w-[400px]'>
            <Label className="text-5xl" text="Consulation"></Label>
            <div className='flex flex-col mt-8'>
              <Label text="Code"></Label>
              <Input type="text" placeholder="Votre code" value={code} onChange={(e) => setCode(e.target.value)} className="w-full"/>
            </div>
            <div className='flex flex-col mt-4'>
              <Label text="Mot de passe"></Label>
              <PasswordInput value={mdp} onChange={(e)=> setMdp(e.target.value)}></PasswordInput>
            </div>
            <Button type="submit" children="Se connecter" onClick={handleLogin} className="mt-8"></Button>
          
          </div>
        </div>
        <ModalError isOpen={isModalError} onClose={()=> setIsModalError(false)} quitter={()=> setIsModalError(false)}></ModalError>
        <ModalErrorServer isOpen={isModalErrorServer} onClose={()=> setIsModalErrorServer(false)} quitter={()=> setIsModalErrorServer(false)}></ModalErrorServer>
      </div>

    )
      return (
     <div  className='inset-0 bg-neutral-700 transition-opacity h-screen' >
        <Layout currentPath={location.pathname} children={contentChildren}></Layout>
     </div>
      )
}

export default ConsultationRF