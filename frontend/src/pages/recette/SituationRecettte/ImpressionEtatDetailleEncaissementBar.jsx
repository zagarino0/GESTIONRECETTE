import React, { useEffect, useRef, useState } from 'react'
import Input from '../../../components/input/Input'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'
import { Button } from '../../../components/button/button'
import Table from '../../../components/table/Table'
import SearchInput from '../../../components/input/SearchInput'
import Label from '../../../components/title/label'
import DateFormatConverter from '../../../components/input/DateFormatConvert'
import axios from 'axios'
import ReactSelect from 'react-select';
import Images from '../../../assets/images.jpg'
function ImpressionEtatDetailleEncaissementBar() {
      // Navbar 
      const Navbarcontent = (
        <div className='flex justify-between '>
          <div className='text-white font-semibold '>
          Impression état détaille  encaissement (BAR)
         </div>
         <div>
 <BackButton to="/SituationRecette"></BackButton>
         </div>
        </div>
     )

     
  const [recepisse, setRecepisse] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userCode, setUserCode] = useState('');
   const [selectedChoice, setSelectedOption] = useState(''); // Par défaut "Décade"
   const [currentDate, setCurrentDate] = useState('');
   const [data, setData] = useState([]);
   const [totalMontantAPayer, setTotalMontantAPayer] = useState(0);
   

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
    .then((response) => {
      setData(response.data); 

     const totalMontantAPayer = calculateTotalMontantAPayer(response.data);
     setTotalMontantAPayer(totalMontantAPayer);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des données', error);
    });

  

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

  console.log(recepisse);

  const calculateTotalMontantAPayer = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].montant_a_payer;
    }
    return total.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
  };

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

{/**  const Choix = [
    "Decade",
    "Situation de recette ",
    "Extrait de recette"

  ]

    // Gestion de la sélection d'option
    const handleOptionChange = (selectedOption) => {
      setSelectedOption(selectedOption.value);
    };
 */}
     return (
      <div className='bg-[#22122] h-[1000px] w-full'>
        <Navbar content={Navbarcontent}></Navbar>
  
        <div className=" bg-[#212122] flex flex-col p-4">
        {/**  <div className='flex flex-row '>
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
             options={Choix.map(item =>({
              value: item,
              label: item
             }))}

             onChange={handleOptionChange}
             className="mt-4 w-40"
             ></ReactSelect>
            </div>
          </div>
 */}
            <div  className="flex flex-col items-center h-full  p-8">
            <div ref={printRef} className="mb-8 w-[1200px] bg-white p-6"> 
  <div className="text-center m-6">
    <h2 className="text-2xl text-center font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
            <p className='text-center'>FITIAVANA-TANINDARZANA-FANDROSOANA </p>
              <h1 className="text-3xl text-center font-bold m-6">COMMUNE URBAINE DE MAHAJANGA</h1>
  </div>
       
          <div>
            <img src={Images} alt="Logo" className="w-16 h-16 " />
            <h4>Bureau de recette : <br /> Commune Urbaaine Mahajanga </h4>
            <p className='mt-2'>Date : {new Date().toLocaleDateString('fr-FR')}</p> {/* Affichage de la date actuelle */}
          </div>

  <div className="text-center">
    <h2 className="font-bold text-2xl">ETAT DETAILLE DES AVIS DE CREDIT PAR BAR</h2>
   {/** <p className='text-center'>par</p>
    <h1 className='text-center font-bold text-xl'>
            {selectedChoice.toUpperCase()}
          </h1>
    <p className='text-center'>
            Journée du : {formatDateToFrench(startDate) || "JJ/MM/AAAA"} au {formatDateToFrench(endDate) || "JJ/MM/AAAA"}
          </p> */}
  </div>

  <table className="min-w-full bg-white border border-black mb-4 mt-4">
    <thead>
      <tr className="bg-gray-200 text-black uppercase text-sm leading-normal">
        <th className="border border-black px-4 py-2">NIF</th>
        <th className="border border-black px-4 py-2">Référence du redevable</th>
        <th className="border border-black px-4 py-2">Numéro Bar</th>
        <th className="border border-black px-4 py-2">Référence</th>
        <th className="border border-black px-4 py-2">Montant</th>
        <th className="border border-black px-4 py-2">Paiement</th>
        <th className="border border-black px-4 py-2">Quittance</th>
      </tr>
    </thead>
    <tbody>
    {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.reference_fiscal}</td>
                <td className="border px-4 py-2">{item.reference_redevable}</td>
                <td className="border px-4 py-2">{item.numero_immatriculation}</td>
                <td className="border px-4 py-2">{item.reference}</td>
                <td className="border px-4 py-2">{item.montant_a_payer} Ar</td>
                <td className="border px-4 py-2">{item.type_payment}</td>
                <td className="border px-4 py-2">{item.numero_recepisse}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">Aucun avis de crédit trouvé</td>
            </tr>
          )}
    </tbody>
  </table>

  <div className="mt-4 text-left">
    <p className="font-bold">TOTAL GENERAL = {totalMontantAPayer}</p>
  </div>

  <div className="mt-6 text-right font-semibold">
  <p>Mahajanga le, {new Date().toLocaleDateString('fr-FR')}</p> {/* Affichage de la date actuelle */}
  <br />
    <p>Le Receveur Principal,</p>
  </div>
            </div>
            </div>
          <div className='text-left'>
          <Button  children="Imprimer" onClick={downloadPDF} className="w-[120px] mt-4 m-6"></Button>
          </div>
        </div>
      </div>
    );
}
export default ImpressionEtatDetailleEncaissementBar