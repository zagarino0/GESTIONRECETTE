import React, { useEffect, useRef, useState } from 'react';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Table from '../../../components/table/Table';
import SearchInput from '../../../components/input/SearchInput';
import Label from '../../../components/title/label';
import DateFormatConverter from '../../../components/input/DateFormatConvert';
import axios from 'axios';
import ReactSelect from 'react-select';
import Images from '../../../assets/images.jpg';

function ImpressionSituationDeRecette() {

  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white font-semibold'>
        Impression situation de la recette
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
  const [selectedChoice, setSelectedChoice] = useState('journalière'); // Par défaut "Décade"
  const [currentDate, setCurrentDate] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());


  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
      .then((response) => setRecepisse(response.data))
      .catch((error) => console.error(error));
    
    // Mettre à jour la date actuelle au format "dd/mm/yyyy"
    const date = new Date();
    const formattedDate = date.toLocaleDateString('fr-FR');
    setCurrentDate(formattedDate);
  }, []);

  const filteredData = recepisse.filter((item) => {
    const itemDate = new Date(item.date_creation);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      item.numero_recepisse &&
      item.numero_recepisse.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!startDate || itemDate >= start) &&
      (!endDate || itemDate <= end)
    );
  });
   // Calcul des totaux par nature d'impôt
   function calculerTotalParBaseImpot(data) {
    const totals = {};

    data.forEach(entry => {
        const baseImpot = entry.base_impot;
        const montantAPayer = parseFloat(entry.montant_a_payer) || 0;

        if (baseImpot) {
            if (!totals[baseImpot]) {
                totals[baseImpot] = 0;
            }
            totals[baseImpot] += montantAPayer;
        }
    });

    return totals;
}
useEffect(() => {
  const interval = setInterval(() => {
      setCurrentDateTime(new Date());
  }, 1000);

  return () => clearInterval(interval);
}, []);

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
};

const totalParBaseImpot = calculerTotalParBaseImpot(filteredData);


  const headers = ['N° Récepissé', 'Référence Fiscal', 'année', "Période", 'P1', 'P2', "Impôt", "Nature Impôt", "montant à payer", "montant à verser", "reste à payer", "Code Banque", "Mode de payment", "Date de creation"];
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
    item.type_payment,
    <DateFormatConverter isoDate={item.date_creation}></DateFormatConverter>
  ]);

  const formatDateToFrench = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' });
  };

  const printRef = useRef(null);

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

  const Choix = [
    "Journalière",
    "Décadaire",
    "Mensieul",
    "Entre deux dates"
  ];

  return (
    <div className='bg-[#212122]'>
      <div className="flex justify-between items-center"></div>
      <Navbar content={Navbarcontent}></Navbar>
      <div className="flex flex-col p-4">
       {/** <div className='flex flex-row'>
          <SearchInput value={searchTerm} placeholder={"Numéro récepissé"} className={`mt-8`} onChange={(e) => setSearchTerm(e.target.value)}></SearchInput>
          <div className='text-back flex flex-col ml-2'>
            <Label text="Du"></Label>
            <Input type='date' className="mt-4 font-semibold" value={startDate} onChange={(e) => setStartDate(e.target.value)}></Input>
          </div>
          <div className='flex flex-col ml-2'>
            <Label text="Au"></Label>
            <Input type='date' className="mt-4 font-semibold" value={endDate} onChange={(e) => setEndDate(e.target.value)}></Input>
          </div>
          <div className='flex flex-col ml-2'>
            <Label text="Choix"></Label>
            <ReactSelect
              options={Choix.map(item => ({
                value: item,
                label: item
              }))}
              className="mt-4 w-40"
              onChange={(e) => setSelectedChoice(e.value)}
            ></ReactSelect>
          </div>
        </div> */}
        <div ref={printRef} className='bg-white p-8 m-4'>
          <div className='flex justify-between items-start'>
            <div className="text-center m-6">
              <h2 className="text-2xl text-center font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
              <p className='text-center'>FITIAVANA-TANINDARZANA-FANDROSOANA </p>
              <h1 className="text-3xl text-center font-bold m-6">COMMUNE URBAINE DE MAHAJANGA</h1>
            </div>
            <div className='flex flex-col'>   
               <img src={Images} alt="Logo" className="w-16 h-16" />
              <h4>Bureau de recette : Commune Urbaine Mahajanga A</h4>
            </div>
        
            <div>
              <p>Date : {currentDate}</p> {/* Affichage de la date actuelle */}
            </div>
          </div>

          <h1 className='text-center font-bold text-xl mt-4'>
            {selectedChoice.toUpperCase()}
          </h1>

          <p className='text-center '>
            Journée du : {formatDateToFrench(startDate) || "JJ/MM/AAAA"} au  { formatDateToFrench(endDate) || "JJ/MM/AAAA"}
          </p>

          <table className='min-w-full mt-4'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-2 px-4 border'>Nature de l'impôt</th>
                <th className='py-2 px-4 border'>Total cumulé (en Ariary)</th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(totalParBaseImpot).map(([baseImpot, total]) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={baseImpot}>
                                        <td className="py-3 px-6 text-left">{baseImpot}</td>
                                        <td className="py-3 px-6 text-left">{total}</td>

                                    </tr>
                                ))}
              <tr className='font-bold'>
                <td className='py-2 px-4 text-left text-3xl' colSpan='4'>TOTAL GENERAL = {Object.values(totalParBaseImpot).reduce((acc, curr) => acc + curr, 0)}</td>
              </tr>
            </tbody>
          </table>

          <div className=' mt-8'>
            <p className='text-right'>A Mahajanga, le {currentDate}</p> {/* Affichage de la date actuelle */}
            <p className='text-right'>Le Receveur Principal des Impôts</p>
          </div>
        </div>
        <Button children="Imprimer" onClick={downloadPDF} className="w-[100px] mt-4" />
      </div>
    </div>
  );
}

export default ImpressionSituationDeRecette;
