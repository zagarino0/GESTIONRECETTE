import React, { useEffect, useState } from 'react';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';
import BackButton from '../../../components/button/BackButton';
import axios from 'axios';
import SearchInput from '../../../components/input/SearchInput';
import { LinkButton } from '../../../components/button/LinkButton';
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import * as XLSX from 'xlsx';

function VisualisationResteRecouvrer() {
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

  // Contenu de la barre de navigation
  const NavbarContent = (
    <div className='flex justify-between'>
      <div className='text-white font-semibold'>
        Visualisation et Exportation des Recettes à Recouvres
      </div>
      <div>
        <BackButton to="/ResteRecovreRecette"></BackButton>
      </div>
    </div>
  );

  return (
    <div className='bg-[#212122] h-screen w-full'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='ml-4 mt-4 flex flex-row'>
        <SearchInput onChange={(e) => setSearchTerm(e.target.value)} className={"mt-8"}></SearchInput>
        <div className='flex flex-col ml-4'>
          <Label text="Du"></Label>
          <Input type="date" className='mt-4' onChange={(e) => setStartDate(e.target.value)}></Input>
        </div>
        <div className='flex flex-col ml-4'>
          <Label text="Au"></Label>
          <Input type="date" className="mt-4" onChange={(e) => setEndDate(e.target.value)}></Input>
        </div>
        <div className='flex flex-col ml-8'>
          <Label text='Reste à recouvrer' ></Label>
          <Label text={totalMontantAPayer.toFixed(2)} className='mt-8' ></Label>
        </div>
      </div>
      <div className='flex justify-center mt-4 p-4'>
        <Table headers={headers} data={formattedData.map(item => Object.values(item))}></Table>
      </div>
      <div className='bg-[#212122] flex justify-between m-4'>
        <LinkButton to="/EnregistrementTitre" text="En Caisser"></LinkButton>    
        <Button onClick={exportToExcel} children="Vers Excel"></Button>
        <Button children="Voir en détail"></Button>
        <Button children="Lettre de Relance"></Button>
      </div>
    </div>
  )
}

export default VisualisationResteRecouvrer;
