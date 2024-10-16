import React, { useEffect, useState } from 'react'
import { LinkButton } from '../../components/button/LinkButton'
import { Layout } from './Layout'
import { Button } from '../../components/button/button'
import Input from '../../components/input/Input'
import Label from '../../components/title/label'
import { Navbar } from '../../components/navbar/Navbar'
import Modal from '../../components/modals/Modal'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import PasswordInput from '../../components/input/PasswordInput'
import { ModalError, ModalErrorServer } from '../immatriculation/Modal'
import * as XLSX from 'xlsx';

function Gestion() {

  const [ModalLogin , setModalLogin] = useState(false);
  const [mdp , setMdp] = useState('');
  const [code , setCode] = useState('');
  const [isModalError, setIsModalError] = useState(false);
  const [isModalErrorServer, setIsModalErrorServer] = useState(false);
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState('');

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
          
          setModalLogin(false);
          
          setMdp('');
          setCode('');
          
          
           // Call createWindow function here
    window.open('http://localhost:3000/PriseEnCharge' )
        } else {
          setIsModalError(true);
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
       
        setIsModalErrorServer(true);
      });
  };


  const [Client , setClient ] = useState([]); 
  useEffect(() => {
    axios.get('http://localhost:3500/prisecharge/contribuable/encharge')
      .then((response) => setClient(response.data))
      .catch((error) => console.error(error));
  }, []);

 
  
  const filteredDataByDate = Client.filter((item) => {
    const itemDate = new Date(item.date_creation); // On suppose que 'date_creation' est le champ de la date dans tes données
    const start = new Date(startDate);
    const end = new Date(endDate);

    return itemDate >= start && itemDate <= end;
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredDataByDate);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assujettissements");
    XLSX.writeFile(workbook, "assujettissements.xlsx");
  };

    const location = useLocation(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const NavbarModal =(
        
        <div className='text-white'>
      Obtention de copie du fichier IMPOT
        </div>
        
      )
  const contentChildren =(
    <div className='flex p-8 justify-center items-center'>
     
        <div className='mt-16 ml-12'>
            <div className='w-96 mt-16 text-white text-3xl '>
                Situation d'un Entreprise
            </div>
        <div className='mt-12'>
            <div className='w-96'>
            <LinkButton to="/SituationNatureImpot" text="Situation par Nature d'impot ou tous Impots" ></LinkButton>
             <Button children="Mise à jour Régime Fiscal et Gestion de Dossier" isOpen={ModalLogin} onClick={() => setModalLogin(true)} className="mt-4 p-4 w-96"></Button>
            <Button  children="Export en Excel des Assujetissements" isOpen={isModalOpen} onClick={() => setIsModalOpen(true)} className="mt-4 w-96"></Button>
            </div>
        </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[300px] ">
        <Navbar content={NavbarModal} ></Navbar>
        <div className='flex justify-center items-center p-4 '>
       <div className='flex flex-col'>
       <div className='m-2 text-white'>
Il s'agit d'avoir une copie du fichier ASSUJETISSEMENTS
            </div>
            <div className='flex justify-between m-2 '>
              <Label text="date de début :" className="mt-2" />
              <Input type="date" className="w-60" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className='flex justify-between m-2 '>
              <Label text="date de fin :" className="mt-2" />
              <Input type="date" className="w-60" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className='flex justify-between  m-2 '>
              <Button children="Executer la requête" onClick={exportToExcel} />
              <Button onClick={() => setIsModalOpen(false)} children="Quitter" />
            </div>
       </div>
        
        </div>
        </Modal>
        <Modal isOpen={ModalLogin} onClose={()=> setModalLogin(false)} className={`flex justify-center w-[500px] h-[450px]`}>
        <div className='mt-8 flex flex-col p-4 w-[400px]'>
          <Label className="text-5xl" text="Identification"></Label>
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
        </Modal>
    {/* error modal login prise en charge */}
    <ModalError isOpen={isModalError} onClose={()=> setIsModalError(false)} quitter={()=> setIsModalError(false)}></ModalError>
        <ModalErrorServer isOpen={isModalErrorServer} onClose={()=> setIsModalErrorServer(false)} quitter={()=> setIsModalErrorServer(false)}></ModalErrorServer>

    </div>

    )
  return (
 <div  className='bg-[#212122] h-screen w-screen'>
    <Layout currentPath={location.pathname} children={contentChildren}></Layout>
 </div>
  )
}

export default Gestion