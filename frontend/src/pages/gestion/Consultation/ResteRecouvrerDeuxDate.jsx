import React, { useEffect, useState } from 'react'
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';

import axios from 'axios';
import * as XLSX from 'xlsx';
import SearchInput from '../../../components/input/SearchInput';
function ResteRecouvrerDeuxDate() {
  
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format date in "dd/mm/yyyy hh:mm:ss" format
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
  };







const [recepisse, setRecepisse] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

useEffect(() => {
  // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
    .then((response) => setRecepisse(response.data))
    .catch((error) => console.error(error));
}, []);

// Filtrer les données par référence fiscale et date
const filteredData = recepisse.filter((item) =>
  item.reference_fiscal && item.reference_fiscal.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredRecepisse = filteredData.filter(item => {
  const itemDate = new Date(item.date_creation);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (!startDate || itemDate >= start) && (!endDate || itemDate <= end);
});

// Calculer le total par type de paiement
const calculateTotal = (type) => {
  return filteredRecepisse
    .filter(item => item.type_payment.trim().toLowerCase() === type.toLowerCase())
    .reduce((total, item) => total + parseFloat(item.reste_a_payer || 0), 0);
};

// Calcul du total des montants annulés
const totalMontantAnnuler = recepisse
  .filter(item => item.annulation === true)
  .reduce((total, item) => total + parseFloat(item.reste_a_payer || 0), 0);

// Calcul des différents totaux par type de paiement
const totalMontantVerserVirement = calculateTotal("virement");
const totalMontantVerserEspece = calculateTotal("espece");
const totalMontantVerserCheque = calculateTotal("cheque");
const totalMontantVerserAutre = calculateTotal("autre");
const totalMontantVerserBar = calculateTotal("bar");
const totalMontantVerserTresor = calculateTotal("trésor");
const totalMontantVerserDepot = calculateTotal("dépot");

// Calcul du total à payer
const totalMontantAPayer = totalMontantVerserVirement +
  totalMontantVerserEspece +
  totalMontantVerserCheque +
  totalMontantVerserAutre +
  totalMontantVerserBar +
  totalMontantVerserTresor +
  totalMontantVerserDepot - totalMontantAnnuler;

// Définir les en-têtes de la table
const headers = ['N° Récepissé', 'Référence Fiscal', 'année', "Période", 'P1', 'P2', "Impôt", "Nature Impôt", "montant à payer", "montant à verser", "reste à payer", "Code Banque", "Mode de payment"];

// Formater les données pour l'affichage et l'export
const formattedData = filteredRecepisse.map(item => ({
  'N° Récepissé': item.numero_recepisse,
  'Référence Fiscal': item.reference_fiscal,
  'année': item.annee,
  'Période': item.periode,
  'P1': item.periode1,
  'P2': item.periode2,
  'Impôt': item.numero_impot,
  'Nature Impôt': item.base_impot,
  'montant à payer': item.montant_a_payer,
  'montant à verser': item.montant_verser,
  'reste à payer': item.reste_a_payer,
  'Code Banque': item.code_banque,
  'Mode de payment': item.type_payment
}));

// Fonction pour exporter les données en Excel
const exportToExcel = () => {
  // Convertir le tableau d'objets en une feuille de calcul Excel
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  // Créer un nouveau classeur Excel
  const workbook = XLSX.utils.book_new();
  // Ajouter la feuille de calcul au classeur
  XLSX.utils.book_append_sheet(workbook, worksheet, "Recepisse Data");
  // Générer et télécharger le fichier Excel
  XLSX.writeFile(workbook, 'recettes_a_recouvrer.xlsx');
};


const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white'>
    Reste à recouvrer entre deux dates    
      </div>
        <div>
          <BackButton to="/ConsultationGestion"></BackButton>
        </div>
    </div>
      )
      return (
        <div  className='bg-[#212122] h-screen w-full'>
            <Navbar content={NavbarContent}></Navbar>
     <div className='m-4'>
           <div className='bg-black p-4 flex justify-between rounded'>
     
      <div className='flex flex-row'>
      <div className='flex flex-col'>
      <Label text="Du "></Label>
      <Input type="date" className="mt-2"
      
      onChange={(e)=> setStartDate(e.target.value)}
      ></Input>
      </div>
     <div className='flex flex-col ml-4'>
     <Label text="Au "></Label>
     <Input type="date"  className="mt-2"
     onChange={(e)=> setEndDate(e.target.value)}
     ></Input>
     </div>
     <div className='flex flex-col ml-4'>
    <Label text="Référence Fiscal "></Label>
    <SearchInput onChange={(e)=> setSearchTerm(e.target.value)} className={"mt-2"}></SearchInput>
  </div>
  <div className='flex flex-col ml-4'>
      <Label text="Ce programme à été lancé le "></Label>
      <p className='text-white text-lg mt-2'>{formatDate(currentDateTime)}</p>
     
     </div>
     <div className='flex flex-col ml-4 '>
      <Label text="Reste à recouvrer "></Label>
      <p className='text-white text-xl mt-2'>{totalMontantAPayer}</p>
     </div>
      </div>
  

     </div>
      <div className='bg-black p-4 mt-2 flex justify-between rounded'>
      
     
     
     </div>
     
     <div className='mt-2  flex justify-center '>
     <Table headers={headers} data={formattedData.map(item => Object.values(item))}></Table>
     </div>
     <div className='flex justify-between mt-2'>
     
       <Button children="Rafraîchir" onClick={()=> window.location.href = "/ResteRecouvrerDeuxDate"} ></Button>
       <Button  children="Vers Excel" onClick={exportToExcel} ></Button>
       <Button  children="Vers Excel tous les Données"  ></Button>
       <Button  children="Imprimer Mise en Demeure" onClick={ () => {window.location.href = "/TitrePerceptio"}} ></Button>
       <Button  children="Imprimer par nature Impot" onClick={() => {window.location.href="/ListeNatureImpot"}}></Button>
     </div>
        </div>
        </div>
      )
}

export default ResteRecouvrerDeuxDate