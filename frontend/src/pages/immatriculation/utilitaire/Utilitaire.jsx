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
import { useLocation } from "react-router-dom";

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
  
    const NavbarModal =(
        
        <div className='text-white'>
      Obtention de copie du fichier immatriculation
        </div>
        
      )
    const contentChildren =(
        <div className='flex p-8 justify-center items-center'>
            
            <div className='mt-16 ml-12'>
            <div className='w-96 mt-16 text-white text-3xl '>
                Utilitaires
            </div>
        <div className='mt-12'>
            <div className='w-96'>
            <Button  children="Copie de Fichier FRP (Répertoire)" className="" isOpen={isModalOpen} onClick={() => setIsModalOpen(true)} ></Button>
            
            </div>
        </div>
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
     <div  className='bg-[#212122] h-screen w-screen'>
        <Layout  currentPath={location.pathname} children={contentChildren}></Layout>
     </div>
      )
    }

export default Utilitaire