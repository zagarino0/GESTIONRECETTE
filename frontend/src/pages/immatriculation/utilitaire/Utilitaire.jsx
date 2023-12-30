import React, { useState } from 'react'
import { Layout } from '../Layout'
import { Button } from '../../../components/button/button'
import Modal from '../../../components/modals/Modal';
import { Navbar } from '../../../components/navbar/Navbar';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import * as  XLSX from 'xlsx';
import axios from 'axios'; 
import Loader from '../../../components/loading/loading';
import { Title4 } from '../../../components/title/title';
import { useLocation, useNavigate } from "react-router-dom";
import { ModalError, ModalErrorServer } from '../Modal';
import PasswordInput from '../../../components/input/PasswordInput';

function Utilitaire() {
  const location = useLocation(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [date_debut_exe_init, setDate_debut_exe_init] = useState('');
  const [date_fin_exe_fin, setDate_fin_exe_fin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const downloadExcel = async () => {
    setIsLoading(true); // Démarrez l'indicateur de chargement
  
    try {
      const response = await axios.post('http://localhost:3500/immatriculation/utilitaire', {
        params: {
          date_debut_exe_init,
          date_fin_exe_fin,
        },
      });
      const data = response.data;
      console.log(data);
      // Ici, vous avez récupéré les résultats de la recherche depuis le backend.
  
      // Maintenant, vous pouvez utiliser une bibliothèque comme xlsx pour convertir les résultats en un fichier Excel.
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Données');
      
      // Générez un fichier Excel
      XLSX.writeFile(wb, 'donnees.xlsx');
      setIsModalOpen(false)
    } catch (error) {
      setIsModal(true);
      console.error('Une erreur s\'est produite :', error);
    } finally {
      setIsLoading(false); // Arrêtez l'indicateur de chargement, que l'opération ait réussi ou non.
    }
  };
  


  //Login fonction 
  const [code, setCode] = useState('');
  const [mdp, setMdp] = useState('');
  
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
          setIsModalOpen(true);
          setCode('');
          setMdp('');
        } else {
          setIsModalError(true);
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
       
        setIsModalErrorServer(true);
      });
  };
    const NavbarModal =(
        
        <div className='text-white'>
      Obtention de copie du fichier immatriculation
        </div>
        
      )
    const contentChildren =(
        <div >
            
            <div className='flex  justify-center  mt-14 '>
        <div className='w-[500px] h-[500px] bg-[#212122] rounded-xl flex justify-center'>
          <div className='mt-8 flex flex-col p-4 w-[400px]'>
            <Label className="text-5xl" text="Utilitaire"></Label>
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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[700px] h-[420px] ">
        <Navbar content={NavbarModal} ></Navbar>
        <div className='flex justify-center items-center p-4 '>
       <div className='flex flex-col'>
       <div className='m-2 text-white'>
Il s'agit d'avoir une copie du fichier Immatriculation dans votre ordinateur
            </div>
            <div className='flex justify-between m-2 '>
             <Label text="Du :"></Label>
             <Input type="date" value={date_debut_exe_init} onChange={(e) => setDate_debut_exe_init(e.target.value)}></Input>
            </div>
            <div className='flex justify-between  m-2 '>
             <Label text="Au :"></Label>
             <Input type="date" value={date_fin_exe_fin} onChange={(e) => setDate_fin_exe_fin(e.target.value)}></Input>
            </div>
            <div className='flex justify-between  m-2 '>
            <Button  children="Executer la requête"  onClick={downloadExcel} ></Button>
            <Button onClick={() => setIsModalOpen(false)} children="Quitter" ></Button>
            </div>
       </div>
       
        </div>
        {isLoading ? <Loader></Loader> : null}
        </Modal>
        <Modal isOpen={isModal} onClose={() => setIsModal(false)} className="w-[400px] h-[200px] ">
       <div className='flex justify-center item-center p-4'>
       <div className='flex flex-col mt-8'>
       <Title4 text="Aucune donnée trouver"></Title4>
        <Button onClick={() => setIsModal(false)} children="OK" className="mt-4" ></Button>
       
       </div>
       </div>
        </Modal>
        </div>
    
        )
        return (
          <div  className='inset-0 bg-neutral-700 transition-opacity h-screen' >
             <Layout currentPath={location.pathname} children={contentChildren}></Layout>
          </div>
           )
     }

export default Utilitaire