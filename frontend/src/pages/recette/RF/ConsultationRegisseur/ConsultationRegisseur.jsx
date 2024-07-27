import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../../../components/button/button'
import Table from '../../../../components/table/Table'
import SearchInput from '../../../../components/input/SearchInput'
import { Navbar } from '../../../../components/navbar/Navbar'
import BackButton from '../../../../components/button/BackButton'
import axios from 'axios'

function ConsultationRegisseur() {
  const [recepisse , setRecepisse] = useState([]);
  const [searchTerm , setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getAllEnregistrementDeclarationNonPeriodique')
      .then((response) => setRecepisse(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredData = recepisse.filter((item) => {
    const dateCreation = new Date(item.date_creation);
    const isWithinDateRange = startDate && endDate
      ? dateCreation >= new Date(startDate) && dateCreation <= new Date(endDate)
      : true;
    const matchesSearchTerm = item.raison_social && item.raison_social.toLowerCase().includes(searchTerm.toLowerCase());
    return isWithinDateRange && matchesSearchTerm;
  });

  const headers = ['N° Récepissé', 'RF regisseur',  'année', "Période", 'P1', 'P2',"Impôt","Nature Impôt" , "montant à payer" , "montant à verser" , "reste à payer" , "Code Banque" , "Mode de payment"];
  const formattedData =  filteredData.map(item => [
    item.numero_recepisse, 
    item.nif_regisseur, 
    item.annee, 
    item.periode, 
    item.periode1, 
    item.periode2, 
    item.numero_impot,
    item.base_impot ,
    item.montant_a_payer ,
    item.montant_verser , 
    item.reste_a_payer ,
    item.code_banque ,
    item.type_payment   
  ]);

  const printRef = useRef(null);
  // Impression
  const downloadPDF = () => {
    if (printRef.current) {
      const content = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      const printStyle = document.createElement('style');
      printStyle.innerHTML =
        '@media print { body { visibility: hidden; } .print-content { visibility: visible; } }';
      document.head.appendChild(printStyle);

      document.body.innerHTML = `<div class="print-content">${content}</div>`;

      window.print();

      document.head.removeChild(printStyle);
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const NavbarContent = (
    <div className='flex justify-between'>
      <div className='text-white font-semibold'>
        Visualisation des Paiments par RF REGISSEUR
      </div>
      <div>
        <BackButton to="/NIFRecette"></BackButton>
      </div>
    </div>
  );

  return (
    <div className='bg-[#212122] h-screen w-full'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='flex flex-col p-4'>
        <div className="flex flex-row space-x-4 mb-4">
          <SearchInput onChange={(e) => setSearchTerm(e.target.value)}></SearchInput>
          <input 
            type="date" 
            className="p-2 rounded bg-white text-black" 
            onChange={(e) => setStartDate(e.target.value)} 
            placeholder="Date de début"
          />
          <input 
            type="date" 
            className="p-2 rounded bg-white text-black text-white" 
            onChange={(e) => setEndDate(e.target.value)} 
            placeholder="Date de fin"
          />
        </div>
        <div className='flex justify-center'>
          <div ref={printRef} className='flex flex-col mt-14 overflow-y-auto w-[1600px]'>
            <Table headers={headers} data={formattedData}></Table>
          </div>
        </div>
        <div className='flex justify-between mt-4'>
          <Button children="Imprimer" onClick={downloadPDF}></Button>
          <Button children="Rafraîchir" onClick={() => window.location.reload()}></Button>
        </div>
      </div>
    </div>
  )
}

export default ConsultationRegisseur;
