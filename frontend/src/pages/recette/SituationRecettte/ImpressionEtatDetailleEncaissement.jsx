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

function ImpressionEtatDetailleEncaissement() {
  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white font-semibold '>
        Impression état en detaille d'encaissement
      </div>
      <div>
        <BackButton to="/SituationRecette"></BackButton>
      </div>
    </div>
  );
  const [data, setData] = useState([]);
  const [recepisse, setRecepisse] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userCode, setUserCode] = useState('');
  const [selectedOption, setSelectedOption] = useState('Décade'); // État pour l'option sélectionnée

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
      .then((response) => {
        setData(response.data); 
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }, [("")]);
  console.log(data)

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


  console.log(recepisse);

  function calculerTotalParModePaiement(data) {
    // Initialisation des totaux pour chaque type de paiement
    let totalEspece = 0;
    let totalCheque = 0;
    let totalVirement = 0;
  
    // Parcourir les données et additionner les montants en fonction du mode de paiement
    data.forEach(item => {
      const montant = parseFloat(item.montant_verser) || 0; // Vérification de la validité du montant
      const modePaiement = item.type_payment?.toLowerCase(); // S'assurer que le mode de paiement est en minuscule pour éviter des problèmes de casse
  
      if (modePaiement === 'espece') {
        totalEspece += montant;
      } else if (modePaiement === 'cheque') {
        totalCheque += montant;
      } else if (modePaiement === 'virement') {
        totalVirement += montant;
      }
    });
  
    // Retourne un objet avec les totaux
    return {
      totalEspece,
      totalCheque,
      totalVirement,
    };
  }
  
  const totals = calculerTotalParModePaiement(data);
  const headers = ['N° Récepissé', 'Référence Fiscal', 'année', "Période", 'P1', 'P2', "Impôt", "Nature Impôt", "montant à payer", "montant à verser", "reste à payer", "Code Banque", "Mode de payment", "Date de creation"];
  const formattedData = filteredData.map(item => [
    item.numero_recepisse,
    item.nom_prenom,
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

  // Impression 
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
    "Decade",
    "Situation de recette ",
    "Extrait de recette"

  ];
  // Gestion de la sélection d'option
  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
  };
  return (
    <div className='bg-[#222122] h-[1000px] w-full'>
      <div className="flex justify-between items-center"></div>
      <Navbar content={Navbarcontent}></Navbar>
      <div className="flex flex-col p-4">
       {/** <div className='flex flex-row '>
          <SearchInput value={searchTerm} placeholder={"Numéro récepisse"} className={`mt-8`} onChange={(e) => setSearchTerm(e.target.value)}></SearchInput>
          <div className='text-back flex flex-col ml-2'>
            <Label text="Du"></Label>
            <Input type='date' className="mt-4" value={startDate} onChange={(e) => setStartDate(e.target.value)}></Input>
          </div>
          <div className='flex flex-col ml-2'>
            <Label text="Au"></Label>
            <Input type='date' className="mt-4" value={endDate} onChange={(e) => setEndDate(e.target.value)}></Input>
          </div>
          <div className='flex flex-col ml-2'>
            <Label text="Choix"></Label>
            <ReactSelect
              options={Choix.map(item => ({
                value: item,
                label: item
              }))}
              onChange={handleOptionChange}
              className="mt-4 w-40"
            ></ReactSelect>
          </div>
        </div> */}
        <div ref={printRef} className='bg-white p-8 mt-4'>
          <div className='flex justify-between items-start'>
            <div className="text-center m-6">
              <h2 className="text-2xl text-center font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
              <p className='text-center'>FITIAVANA-TANINDARZANA-FANDROSOANA </p>
              <h1 className="text-3xl text-center font-bold m-6">COMMUNE URBAINE DE MAHAJANGA</h1>
            </div> 
            <div>
              <img src={Images} alt="Logo" className="w-16 h-16 ml-80" />
              <h4 className='ml-80 font-semibold'>Bureau de recette : <br />Commune Urbaine Mahajanga </h4>
              <p className='ml-80 mt-2'>Date : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
          
          <h1 className='text-center font-bold text-xl mt-4'>ETAT DETAILLE DES ENCAISSEMENTS</h1>
         {/** <p className='text-center'>par</p>
            // Titre dynamique selon l'option sélectionnée 
            <h1 className='text-center font-bold text-xl'>{selectedOption.toUpperCase()}</h1>
          <p className='text-center mt-2'>du {new Date(startDate).toLocaleDateString('fr-FR')} au {new Date(endDate).toLocaleDateString('fr-FR')}</p>
           */}
          
          
          <table className='min-w-full mt-4'>
            <thead className='bg-gray-200 text-center'>
              <tr>
                <th className='py-2 px-4 border text-center'>N° Récepissé</th>
                <th className='py-2 px-4 border text-center'>Nom et Prénom (ou Raison social)</th>
                <th className='py-2 px-4 border text-center'>Montant (en Ariary)</th>
                <th className='py-2 px-4 border text-center'>Date Regl.</th>
                <th className='py-2 px-4 border text-center'>Mode de Paiement</th>
                <th className='py-2 px-4 border text-center'>Opérateur</th>
              </tr>
            </thead>
            {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.numero_recepisse}</td>
                <td className="border px-4 py-2">{item.raison_social}</td>
                <td className="border px-4 py-2">{item.montant_verser} Ar</td>
                <td className="border px-4 py-2">{item.annee}</td>
                <td className="border px-4 py-2">{item.type_payment}</td>
                <td className="border px-4 py-2">{item.reference_fiscal}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">Aucun avis de crédit trouvé</td>
            </tr>
          )}
          </table>
          
          <div className='flex justify-between items-start mt-8'>
          <p>Total Espèce: {totals.totalEspece.toLocaleString()} Ar</p>
          <p>Total Chèque: {totals.totalCheque.toLocaleString()} Ar</p>
          <p>Total Virement: {totals.totalVirement.toLocaleString()} Ar</p>
          </div>
          
        </div>
        <div className='mt-4'>
          <Button onClick={downloadPDF}>Imprimer</Button>
        </div>
      </div>
    </div>
  );
}

export default ImpressionEtatDetailleEncaissement;
