import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';
import axios from 'axios';
import SearchInput from '../../../components/input/SearchInput';
import Input from '../../../components/input/Input';

function Bar() {
  
  // Navbar
  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white '>
      Etat Detaille  Encaissements (BAR)
      </div>
      <div>
        <BackButton to="/SituationRecette"></BackButton>
      </div>
    </div>
  );

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

  const filteredData = recepisse.filter((item) => {
    const numeroRecepisse = item.numero_recepisse && item.numero_recepisse.toLowerCase().includes(searchTerm.toLowerCase());
    const itemDate = new Date(item.date_creation);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      numeroRecepisse &&
      item.type_payment === "BAR" &&
      (!startDate || itemDate >= start) &&
      (!endDate || itemDate <= end)
    );
  });

  console.log(recepisse);

  const headers = ['N° Récepissé', 'Référence Fiscal', 'année', "Période", 'P1', 'P2', "Impôt", "Nature Impôt", "montant à payer", "montant à verser", "reste à payer", "Code Banque", "Mode de payment"];
  const formattedData = filteredData.map(item => [
    item.numero_recepisse,
    item.reference_fiscal,
    item.annee,
    item.periode,
    item.periode1,
    item.periode2,
    item.numero_impot,
    item.base_impot,
    item.montant_a_payer,
    item.montant_verser,
    item.reste_a_payer,
    item.code_banque,
    item.type_payment
  ]);

  // impression 
  const printRef = useRef(null);

  const downloadPDF = () => {
    // Use querySelector to get the table element
    if (printRef.current) {
      const content = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      // Ajoutez une feuille de style pour l'impression
      const printStyle = document.createElement('style');
      printStyle.innerHTML =
        '@media print { body { visibility: hidden; } .print-content { visibility: visible; } }';
      document.head.appendChild(printStyle);

      document.body.innerHTML = `<div class="print-content">${content}</div>`;

      window.print();

      // Supprimez la feuille de style après l'impression
      document.head.removeChild(printStyle);

      // Restaurez le contenu original après l'impression
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={Navbarcontent}></Navbar>

      <div className="flex flex-col p-4">
        <div className='flex flex-row'>
          <SearchInput value={searchTerm} className={"mt-8"} placeholder={"Numéro récepisse"} onChange={(e) => setSearchTerm(e.target.value)}></SearchInput>
          <div className='flex flex-col ml-2'>
            <label className='text-white '>Du</label>
            <Input type='date' className="mt-4" value={startDate} onChange={(e) => setStartDate(e.target.value)}></Input>
          </div>
          <div className='flex flex-col ml-2'>
            <label className='text-white '>Au</label>
            <Input type='date' className="mt-4" value={endDate} onChange={(e) => setEndDate(e.target.value)}></Input>
          </div>
        </div>
        <div ref={printRef} className="h-[400px] p-4">
          <div className="mb-8">
            <h2 className="text-xl text-center text-white font-bold">COMMUNE URBAINE DE MAHAJANGA</h2>
            <div className="mt-4 ml-8">
              <p className='text-white'>Mahajanga le, </p>
              <p className='text-white'> Voici une description ou une introduction pour le tableau ci-dessous.</p>
            </div>
          </div>
          <div className='flex justify-center'>
            <Table
              headers={headers}
              data={formattedData}
              classTable={"h-[300px]"}
            ></Table>
          </div>
          <Button children="Imprimer" onClick={downloadPDF} className="mt-4"></Button>
        </div>
      </div>
    </div>
  );
}

export default Bar;
